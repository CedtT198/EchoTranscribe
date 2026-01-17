package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.port.in.PaymentUseCase;
import com.stripe.model.Event;
import com.stripe.model.Invoice;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/payment")
public class PaymentController {
    
    PaymentUseCase paymentUseCase;

    @PostMapping("/checkout")
    public Map<String, String> createCheckout(@RequestParam String plan) throws Exception {
        return paymentUseCase.createCheckout(plan);
    }

    @PostMapping("/subscription/cancel")
    public ResponseEntity<?> cancelSubscription(@RequestParam String subscriptionId) throws Exception {
        Map<String, String> res = new HashMap<>();
        try {
            paymentUseCase.cancelSubscription(subscriptionId);
            res.put("success", "Your subscription has been canceled successfuly");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }

    @PostMapping("/webhook/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        System.out.println("\nwebhook stripe called\n");
        String endpointSecret = "whsec_4009c72c58e4401a592043a5bbe3efa47095a17c9966e13f259dca23af4225ec";

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer()
                        .getObject()
                        .orElseThrow();

                String customerId = session.getCustomer();
                String subscriptionId = session.getSubscription();
                
                String invoiceId = session.getInvoice();
                Invoice invoice = Invoice.retrieve(invoiceId);

                PaymentIntent pi = PaymentIntent.retrieve(invoice.getPaymentIntent());
                PaymentMethod pm = PaymentMethod.retrieve(pi.getPaymentMethod());

                String paymentType = pm.getType();
                
                System.out.println("stripe called");
                System.out.println(customerId);
                System.out.println(subscriptionId);
                System.out.println(paymentType+"\n");

                // 👉 ICI ta logique métier
                // - activer l’abonnement
                // - enregistrer en base
                // - lier user ↔ subscriptionId
            }

            return ResponseEntity.ok("ok");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error");
        }
    }

}
