package com.example.androidapp.data.auth;

// This is a custom exception to clearly identify when a token is invalid.
public class SessionExpiredException extends Exception {
    public SessionExpiredException() {
        super("Your session has expired. Please log in again.");
    }
}
