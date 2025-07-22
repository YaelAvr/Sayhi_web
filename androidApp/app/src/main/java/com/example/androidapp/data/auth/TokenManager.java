package com.example.androidapp.data.auth;

import android.content.Context;
import android.content.SharedPreferences;

public class TokenManager {
    private static final String PREFS_NAME = "auth_prefs";
    private static final String TOKEN_KEY = "auth_token";

    private SharedPreferences prefs;
    public TokenManager(Context context) {
        prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public void saveToken(String token) {
        prefs.edit().putString(TOKEN_KEY, token).apply();


    }

    public String getToken() {
        return prefs.getString(TOKEN_KEY, null);
    }

    public void deleteToken() {
        prefs.edit().remove(TOKEN_KEY).apply();


    }
}