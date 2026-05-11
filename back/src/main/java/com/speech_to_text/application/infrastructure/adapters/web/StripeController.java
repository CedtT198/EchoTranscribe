package com.speech_to_text.application.infrastructure.adapters.web;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.Invoice;
import com.stripe.model.Price;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.stripe.model.SubscriptionItem;
import com.stripe.model.checkout.Session;
import com.stripe.net.ApiResource;
import com.stripe.net.Webhook;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("")
public class StripeController {

    private final SubscriptionUseCase subUseCase;
    
    @PostMapping("/webhook/stripe")
    public ResponseEntity<?> handleStripeWebhook(HttpServletRequest request, @RequestHeader("Stripe-Signature") String sigHeader) {
        System.out.println("webhook stripe called");
        String endpointSecret = "whsec_4009c72c58e4401a592043a5bbe3efa47095a17c9966e13f259dca23af4225ec";

        String payload;
        try {
            payload = request.getReader().lines().collect(Collectors.joining("\n"));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Cannot read payload");
        }
        
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            System.out.println("EVENT TYPE = " + event.getType());

            if (event.getType().equals("checkout.session.completed")) {
                // String customerId = "";
                
                Session session = getSession(event);
                com.stripe.model.Subscription subscription = com.stripe.model.Subscription.retrieve(session.getSubscription());
                String subscriptionId = subscription.getId();

                SubscriptionItem item = subscription.getItems().getData().get(0);
                Price price = item.getPrice();

                double pricePerMonth = price.getUnitAmount() / 100.0;
                // String currency = price.getCurrency();
                // String interval = price.getRecurring().getInterval();

                // Product product = Product.retrieve(price.getProduct());

                String auth0Id = session.getClientReferenceId();
                String email = session.getMetadata().get("email");
                String plan = session.getMetadata().get("plan");
                String status = "ACTIVE";

                String invitationCode = UUID.randomUUID().toString().replace("-", "");
                if (plan.toLowerCase().equals("pro")) {
                    invitationCode = null;
                }

                Integer credit = subUseCase.getCreditByPlan(plan);
                Subscription sub = new Subscription(
                    subscriptionId,
                    credit,
                    credit,
                    LocalDate.now(),
                    auth0Id,
                    email,
                    plan,
                    status,
                    LocalDate.now(),
                    null,
                    invitationCode,
                    auth0Id,
                    pricePerMonth
                ); 
                subUseCase.save(sub);
            }
            
            if (event.getType().equals("customer.subscription.updated")) {
                EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                com.stripe.model.Subscription subscription = getSubscription(deserializer);

                if (Boolean.TRUE.equals(subscription.getCancelAtPeriodEnd())) {
                    Long endTimestamp = subscription.getCancelAt();

                    if (endTimestamp == null) {
                        endTimestamp = subscription.getCurrentPeriodEnd();
                    }

                    if (endTimestamp == null) {
                        endTimestamp = subscription.getBillingCycleAnchor();
                    }

                    LocalDate endDate = Instant
                        .ofEpochSecond(endTimestamp)
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate();
                    subUseCase.cancelAtPeriodEnd(subscription.getId(), endDate);
                }
            }
            
            if (event.getType().equals("customer.subscription.deleted")) {
                EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                com.stripe.model.Subscription subscription = getSubscription(deserializer);

                subUseCase.canceled(subscription.getId());
            }
            
            if (event.getType().equals("invoice.payment_succeeded")) {
                EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                Invoice invoice = (Invoice) deserializer.deserializeUnsafe();

                String subscriptionId = invoice.getSubscription();
                String billingReason = invoice.getBillingReason();

                if ("subscription_cycle".equals(billingReason)) {
                    Subscription sub = subUseCase.findById(subscriptionId);
                    if (sub != null) {
                        int creditToAdd = subUseCase.getCreditByPlan(sub.getSubscriptionType());
                        subUseCase.addCredit(sub.getAuth0Id(), creditToAdd);
                    }
                }
            }

            return ResponseEntity.ok("Payment done successfuly");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error: "+e.getMessage());
        }
    }

    private final com.stripe.model.Subscription getSubscription(EventDataObjectDeserializer deserializer) {
        if (deserializer.getObject().isPresent()) {
            return (com.stripe.model.Subscription) deserializer.getObject().get();
        }
        else {
            String rawJson = deserializer.getRawJson();

            return com.stripe.model.Subscription.GSON.fromJson(
                rawJson,
                com.stripe.model.Subscription.class
            );
        }
    }

    private final Session getSession(Event event) {
        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
        if (deserializer.getObject().isPresent()) {
           return (Session) deserializer.getObject().get();
        }
        else {
            String rawJson = deserializer.getRawJson();
            return ApiResource.GSON.fromJson(rawJson, Session.class);
        }
    }
}
