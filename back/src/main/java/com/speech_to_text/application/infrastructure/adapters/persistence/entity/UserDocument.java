package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
public class UserDocument {
    @Id
    String id;

    @NotBlank(message = "Name required.")
    String name;

    @NotBlank(message = "First name required.")
    String firstName;

    @Past(message = "Birthday must be in the past")
    LocalDate birthday;

    @Email(message = "Invalid email.")
    @NotBlank(message = "Email required.")
    String mail;

    @NotBlank(message = "Address required.")
    String address;

    @NotBlank(message = "Address required.")
    String country;
    
    @NotBlank(message = "City required.")
    String city;
    
    @NotBlank(message = "Zip code required.")
    String zip;

    @NotBlank(message = "Password required.")
    @Size(min = 8, message = "Password has to be at least 8 characters.")
    String password;

    @NotBlank(message = "Confirm password required.")
    String confirmPassword;
    
    String creationDate;

    Set<String> roles = new HashSet<>();

    // public UserDocument(User user) {
    //     this.id = user.getId();
    //     this.name = user.getName();
    //     this.first_name = user.getFirst_name();
    //     this.birthday = user.getBirthday();
    //     this.mail = user.getMail();
    //     this.address = user.getAddress();
    //     this.country = user.getCountry();
    //     this.city = user.getCity();
    //     this.zip = user.getZip();
    //     this.password = user.getPassword();
    //     this.confirm_password = user.getConfirm_password();
    //     this.creation_date = user.getCreation_date();
    //     this.last_update = user.getLast_update();
    //     this.role = user.getRole();
    // }
}
