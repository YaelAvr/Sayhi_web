package com.example.androidapp.ui.login;

import androidx.annotation.Nullable;

import com.google.gson.annotations.SerializedName;

/**
 * Authentication result : success (user details) or error message.
 */
public class LoginResult {
    @Nullable
    private String success;
    @SerializedName("token")
    private String token;
    @Nullable
    private Integer error;
    @Nullable
    private  String errorMessage;

    public LoginResult(@Nullable Integer error, @Nullable String errorMessage) {

        this.error = error;
        this.errorMessage=errorMessage;
    }
    public LoginResult(@Nullable Integer error) {
        this.error = error;
    }

    public LoginResult(@Nullable String token) {
        this.token = token;
    }

    @Nullable
    String getToken() {
        return token;
    }

    @Nullable
    Integer getError() {
        return error;
    }

    @Nullable
    public String getErrorMessage() {
        return errorMessage;
    }
}