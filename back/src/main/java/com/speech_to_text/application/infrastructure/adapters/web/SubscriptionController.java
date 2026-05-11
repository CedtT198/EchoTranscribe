package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.DTO.InvitationCodeDTO;
import com.speech_to_text.application.domain.model.DTO.SubscriptionFilterDto;
import com.speech_to_text.application.domain.model.subscription.Subscription;
import com.speech_to_text.application.domain.port.in.SubscriptionTypeUseCase;
import com.speech_to_text.application.domain.port.in.SubscriptionUseCase;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/subscription")
public class SubscriptionController {

    private final SubscriptionTypeUseCase subTypeUseCase;
    private final SubscriptionUseCase subUseCase;
    
    @PostMapping("/findByFilters")
    public ResponseEntity<?> findByFilters(
        @RequestParam(required=false, defaultValue = "0") int page,
        @RequestParam(required=false, defaultValue = "10") int size,
        @RequestParam(required=false, defaultValue = "purchaseDate,desc") String sort,
        @RequestBody SubscriptionFilterDto filter)
    {
        String[] parts = sort.split(",");

        if (parts.length != 2) {
            return ResponseEntity.badRequest().body("Invalid sort format. Missing value.");
        }

        if (!parts[1].equals("desc") && !parts[1].equals("asc")) {
            return ResponseEntity.badRequest().body("Invalid sort format. Incorrect direction.");
        }

        Sort.Direction direction = Sort.Direction.fromString(sort.split(",")[1]);
        String sortProperty = sort.split(",")[0];
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));
        
        Page<Subscription> subscriptionPage = subUseCase.findByFilters(filter, pageable);
        return ResponseEntity.ok(subscriptionPage);
    }

    @GetMapping("/findAllByAuth0Id/{auth0id}")
    public ResponseEntity<?> findAllByAuth0Id(@PathVariable String auth0id) {
        return ResponseEntity.ok(subUseCase.findAllByAuth0Id(auth0id));
    }

    @PostMapping("/invitationcode")
    public ResponseEntity<?> useInvicationCode(@RequestBody InvitationCodeDTO invitation) {
        Map<String, String> res = new HashMap<>();
        try {
            String auth0id = invitation.getAuth0id();
            String mail = invitation.getMail();
            String code = invitation.getCode();
            subUseCase.useInvicationCode(auth0id, mail, code);

            res.put("success", "You subscribed successfuly to plan.");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }

    @PostMapping("/findActual/{auth0id}")
    public ResponseEntity<?> findActualSub(@PathVariable String auth0id) {
        return ResponseEntity.ok(subUseCase.findActualSub(auth0id));
    }

    @GetMapping("/type/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(subTypeUseCase.findAll());
    }

}
