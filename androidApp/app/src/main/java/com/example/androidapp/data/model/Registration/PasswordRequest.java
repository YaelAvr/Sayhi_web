package com.example.androidapp.data.model.Registration;

public class PasswordRequest {
    private String password;
    private String confirm;

    public PasswordRequest(String password, String confirm) {
        this.password = password;
        this.confirm = confirm;
    }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirm() { return confirm; }
    public void setConfirm(String confirm) { this.confirm = confirm; }
}