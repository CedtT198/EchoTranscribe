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
    String first_name;
    LocalDate birthday;
    String mail;
    String address;
    String country;
    String city;    
    String zip;
    String password;
    String confirm_password;
    LocalDate creation_date;
    LocalDate last_update;
    String role;
}
