package com.example.androidapp.ui.login;

/**
 * Class exposing authenticated user details to the UI.
 */
public class RegisteredUserView {
    private final String displayName;
    private final String userName;
    private final boolean exists;


    public RegisteredUserView(String displayName, String userName) {
        this.displayName = displayName;
        this.userName = userName;
        exists=true;
    }


    public RegisteredUserView(RegisteredUserView ruv){
        displayName= ruv.displayName;
        userName = ruv.userName;
        exists =ruv.exists;
    }

    public String getDisplayName() {
        return displayName;
    }
    public String getUsername() {
        return userName;
    }
    public boolean isExists() {
        return exists;
    }
}