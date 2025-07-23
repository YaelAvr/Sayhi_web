package com.example.androidapp.data.model.Registration;

public class UsernameRequest {
    private String username;

    public UsernameRequest(String username) {
        this.username = username;
    }

    // getter & setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}