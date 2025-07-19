package com.example.androidapp.ui.login;

import androidx.annotation.Nullable;

import com.example.androidapp.data.model.User;

/**
 * Authentication result : success (user details) or error message.
 */
public class LoginResult {
    @Nullable
    private User success;
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

    public LoginResult(@Nullable User success) {
        this.success = success;
    }

    @Nullable
    User getSuccess() {
        return success;
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