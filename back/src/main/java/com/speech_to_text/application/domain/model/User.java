package com.speech_to_text.application.domain.model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    String id;
    String name;
    String firstName;
    LocalDate birthday;
    String mail;
    String address;
    String country;
    String city;    
    String zip;
    String password;
    String creationDate;
    String role;
}
 