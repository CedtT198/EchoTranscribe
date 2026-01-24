package com.speech_to_text.application.infrastructure.adapters.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.speech_to_text.application.domain.model.DTO.UserFilterDto;
import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.in.UserUseCase;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    @Autowired
    // private PasswordEncoder passwordEncoder;
    private UserUseCase userUseCase;
  
    @PostMapping("/findByFilters")
    public ResponseEntity<?> findByFilters(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "creationDate,desc") String sort,
        @RequestBody UserFilterDto filter)
    {
        Sort.Direction direction = Sort.Direction.fromString(sort.split(",")[1]);
        String sortProperty = sort.split(",")[0];
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));
        
        Page<User> userPage = userUseCase.findByFilters(filter, pageable);
        return ResponseEntity.ok(userPage);
    }

    @GetMapping("/getOrCreate")
    public ResponseEntity<?> getOrCreateUser(JwtAuthenticationToken auth) {
        Map<String, Object> res = new HashMap<>();

        Jwt jwt = auth.getToken();

        String auth0Id = jwt.getSubject();
        String email = jwt.getClaim("email");
        
        // System.out.println("Auth0 ID: " + auth0Id);
        // System.out.println("Email: " + email);
        
        User user = userUseCase.getOrCreate(auth0Id, email);
        
        // System.out.println("\nVOHANTSO\n");
        res.put("user", user);
        return ResponseEntity.status(200).body(res);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.ok(userUseCase.findAll());
    }
    
    @GetMapping("/me")
    public ResponseEntity<User> me(JwtAuthenticationToken auth) {
        return ResponseEntity.ok(userUseCase.findByAuth0Id(auth.getToken().getSubject()));
    }

    @GetMapping("/findByAuth0Id/{auth0Id}")
    public ResponseEntity<User> findByAuth0Id(@PathVariable String auth0Id) {
        return ResponseEntity.ok(userUseCase.findByAuth0Id(auth0Id));
    }
    
    @DeleteMapping("/delete/{auth0Id}")
    public ResponseEntity<Boolean> delete(@PathVariable String auth0Id) {
        System.err.println("delete vohantso");
        return ResponseEntity.ok(userUseCase.delete(auth0Id));
    }
    
    @PostMapping("/block/{auth0Id}")
    public ResponseEntity<Boolean> block(@PathVariable String auth0Id) {
        System.err.println("block vohantso");
        return ResponseEntity.ok(userUseCase.block(auth0Id));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user) {
        Map<String, String> res = new HashMap<>();
        try {
            userUseCase.update(user);

            res.put("success", "Your account has been updated successfuly.");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("error", e.getMessage());
            return ResponseEntity.status(401).body(res);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody User user) {
        Map<String, String> res = new HashMap<>();
        
        // String passEncoded = passwordEncoder.encode(user.getPassword());
        // user.setPassword(passEncoded);

        userUseCase.save(user);
        System.out.println(user.getMail()+" created an account.");
        
        res.put("success", "Your account has been created, sign in now.");
        return ResponseEntity.status(200).body(res);
    }
}
