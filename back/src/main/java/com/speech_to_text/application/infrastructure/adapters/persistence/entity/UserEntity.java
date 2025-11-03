package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "user")
public class UserEntity {
    @Id
    String id;
    @NotBlank(message = "Name required.")
    String name;

    @NotBlank(message = "First name required.")
    String first_name;

    @Past(message = "Birthday must be in the past")
    LocalDate birthday;

    @Email(message = "Invalid email.")
    @NotBlank(message = "Email required.")
    String mail;

    @NotBlank(message = "Password required.")
    @Size(min = 8, message = "Password has to be at least 8 characters.")
    String password;

    @NotBlank(message = "Confirm password required.")
    String confirm_password;

    LocalDate creation_date;
    LocalDate last_upDate;
    String role;
}
