package com.speech_to_text.application.domain.service.withDependance;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.speech_to_text.application.domain.model.auth.TokenResponse;
import com.speech_to_text.application.domain.model.config.Auth0Properties;
import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.in.UserUseCase;
import com.speech_to_text.application.domain.port.out.UserRepository;

import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class UserService implements UserUseCase {
    private final Auth0Properties auth0;
    private final WebClient webClient;
    private final UserRepository userRepo;

    public String getManagementApiToken() {
        return webClient.post()
            .uri("https://" + auth0.getDomain() + "/oauth/token")
            .bodyValue(Map.of(
                "client_id", auth0.getClientId(),
                "client_secret", auth0.getClientSecret(),
                "audience", auth0.getAudience(),
                "grant_type", "client_credentials"
            ))
            .retrieve()
            .bodyToMono(TokenResponse.class)
            .block().getAccessToken();
    }

    
    @Override
    public boolean block(String auth0Id) {
        String token = getManagementApiToken();

        webClient.patch()
            .uri("https://" + auth0.getDomain() + "/api/v2/users/{id}", auth0Id)
            .header("Authorization", "Bearer " + token)
            .bodyValue(Map.of("blocked", true))
            .retrieve()
            .bodyToMono(Void.class)
            .block();
            
        return userRepo.delete(auth0Id);
    }


    @Override
    public boolean delete(String auth0Id) {
        String token = getManagementApiToken();

        webClient.delete()
            .uri("https://" + auth0.getDomain() + "/api/v2/users/{id}", auth0Id)
            .header("Authorization", "Bearer " + token)
            .retrieve()
            .bodyToMono(Void.class)
            .block();
            
        return userRepo.delete(auth0Id);
    }



    @Override
    public User getOrCreate(String auth0Id, String email) {
        User user = userRepo.findByAuth0Id(auth0Id);
        if (user != null) {
            return user;
        }
        
        user = new User();
        user.setAuth0Id(auth0Id);
        user.setMail(email);
        user.getRoles().add("USER");
        return userRepo.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepo.findAll();
    }

    @Override
    public List<User> findByAbonnements(LocalDate date1, LocalDate date2, String typeAbonnement) {
        return userRepo.findByAbonnements(date1, date2, typeAbonnement);
    }

    @Override
    public User findByAuth0Id(String auth0Id) {
        System.out.println("Vohantso le findByAuth0");
        return  userRepo.findByAuth0Id(auth0Id);
    }

    @Override
    public User findByMail(String mail) {
        return userRepo.findByMail(mail);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public User update(User user) {
        return userRepo.update(user);
    }
}
