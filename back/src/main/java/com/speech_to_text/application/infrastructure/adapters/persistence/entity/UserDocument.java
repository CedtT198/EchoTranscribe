package com.speech_to_text.application.infrastructure.adapters.persistence.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
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
    String auth0Id;
    String name;
    String firstName;
    LocalDate birthday;
    String mail;
    String address;
    String country;
    String city;
    String zip;
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
