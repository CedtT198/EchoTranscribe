package com.speech_to_text;

import com.speech_to_text.application.domain.model.auth.TokenResponse;
import com.speech_to_text.application.domain.model.config.Auth0Properties;
import com.speech_to_text.application.domain.model.user.User;
import com.speech_to_text.application.domain.port.out.UserRepository;
import com.speech_to_text.application.domain.service.withDependance.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import java.time.LocalDate;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepo;

    @Mock
    private Auth0Properties auth0;

    @Mock
    private WebClient webClient;

    // Mocks pour la chaîne fluente WebClient (post/patch/delete)
    @Mock
    private WebClient.RequestBodyUriSpec requestBodyUriSpec;

    @Mock
    private WebClient.RequestBodySpec requestBodySpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @Mock
    private WebClient.RequestHeadersUriSpec<?> requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec<?> requestHeadersSpec;

    @InjectMocks
    private UserService userService;

    // =========================================================
    // Helpers : configure le WebClient pour simuler Auth0
    // =========================================================

    // =========================================================
    // Tests : getOrCreate()
    // =========================================================

    @Test
    @DisplayName("getOrCreate - utilisateur existant : doit retourner l'utilisateur sans appeler save()")
    void getOrCreate_shouldReturnExistingUser_whenUserAlreadyExists() {
        User existingUser = new User();
        existingUser.setAuth0Id("auth0|123");
        existingUser.setMail("alice@email.com");
        when(userRepo.findByAuth0Id("auth0|123")).thenReturn(existingUser);

        User result = userService.getOrCreate("auth0|123", "alice@email.com");

        assertThat(result).isEqualTo(existingUser);
        verify(userRepo, never()).save(any());
    }

    @Test
    @DisplayName("getOrCreate - utilisateur inexistant : doit créer un nouvel utilisateur avec les bons champs")
    void getOrCreate_shouldCreateNewUser_whenUserDoesNotExist() {
        when(userRepo.findByAuth0Id("auth0|456")).thenReturn(null);
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.getOrCreate("auth0|456", "bob@email.com");

        assertThat(result.getAuth0Id()).isEqualTo("auth0|456");
        assertThat(result.getMail()).isEqualTo("bob@email.com");
        assertThat(result.getCreationDate()).isEqualTo(LocalDate.now());
        assertThat(result.getRoles()).contains("USER");
        verify(userRepo, times(1)).save(any(User.class));
    }

    // =========================================================
    // Tests : update()
    // =========================================================

    @Test
    @DisplayName("update - tous les champs remplis : doit appeler userRepo.update()")
    void update_shouldCallRepoUpdate_whenAllFieldsAreValid() throws Exception {
        User user = new User();
        user.setName("Dupont");
        user.setFirstName("Jean");
        user.setBirthday(LocalDate.of(1990, 1, 1));
        user.setZip("75001");
        user.setAddress("1 rue de la Paix");
        user.setCity("Paris");
        when(userRepo.update(user)).thenReturn(user);

        User result = userService.update(user);

        assertThat(result).isEqualTo(user);
        verify(userRepo, times(1)).update(user);
    }

    @Test
    @DisplayName("update - un champ null : doit lancer une Exception")
    void update_shouldThrowException_whenAFieldIsNull() {
        User user = new User();
        user.setName("Dupont");
        user.setFirstName(null); // champ manquant
        user.setBirthday(LocalDate.of(1990, 1, 1));
        user.setZip("75001");
        user.setAddress("1 rue de la Paix");
        user.setCity("Paris");

        assertThatThrownBy(() -> userService.update(user))
                .isInstanceOf(Exception.class)
                .hasMessage("Every field must be filled.");
        verify(userRepo, never()).update(any());
    }

    @Test
    @DisplayName("update - city vide ou espaces : doit lancer une Exception")
    void update_shouldThrowException_whenCityIsBlank() {
        User user = new User();
        user.setName("Dupont");
        user.setFirstName("Jean");
        user.setBirthday(LocalDate.of(1990, 1, 1));
        user.setZip("75001");
        user.setAddress("1 rue de la Paix");
        user.setCity("   "); // vide après trim

        assertThatThrownBy(() -> userService.update(user))
                .isInstanceOf(Exception.class)
                .hasMessage("Every field must be filled.");
        verify(userRepo, never()).update(any());
    }
}
