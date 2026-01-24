package com.speech_to_text.application.domain.model.user;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
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
    LocalDate creationDate;
    LocalDate lastUpdate;
    Set<String> roles = new HashSet<>();
}
 