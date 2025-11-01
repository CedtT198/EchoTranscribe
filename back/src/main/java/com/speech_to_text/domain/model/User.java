package com.speech_to_text.domain.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "user")
public class User {
    @Id
    String id;
    @NotBlank(message = "Name required.")
    String name;

    @NotBlank(message = "First name required.")
    String first_name;

    LocalDate birthday;

    @Email(message = "Invalid email.")
    @NotBlank(message = "Email required.")
    String mail;

    @NotBlank(message = "Password required.")
    @Size(min = 8, message = "Password has to be at least 8 characters.")
    String password;

    LocalDate creation_date;

    LocalDate last_upDate;

    String role;
    

    public User() {}
    public User(String id, String name, String first_name, LocalDate birthday, String mail, String password,
            LocalDate creation_date, LocalDate last_upDate, String role) {
        this.id = id;
        this.name = name;
        this.first_name = first_name;
        this.birthday = birthday;
        this.mail = mail;
        this.password = password;
        this.creation_date = creation_date;
        this.last_upDate = last_upDate;
        this.role = role;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
    public LocalDate getBirthday() {
        return birthday;
    }
    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }
    public String getMail() {
        return mail;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public LocalDate getCreation_date() {
        return creation_date;
    }
    public void setCreation_date(LocalDate creation_date) {
        this.creation_date = creation_date;
    }
    public LocalDate getLast_upDate() {
        return last_upDate;
    }
    public void setLast_upDate(LocalDate last_upDate) {
        this.last_upDate = last_upDate;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    
}
