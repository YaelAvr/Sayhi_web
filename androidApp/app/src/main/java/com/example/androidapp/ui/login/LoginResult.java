package com.example.androidapp.ui.login;

import androidx.annotation.Nullable;

/**
 * Authentication result : success (user details) or error message.
 */
public class LoginResult {
    @Nullable
    private RegisteredUserView success;
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

    public LoginResult(@Nullable RegisteredUserView success) {
        this.success = success;
    }

    @Nullable
    RegisteredUserView getSuccess() {
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