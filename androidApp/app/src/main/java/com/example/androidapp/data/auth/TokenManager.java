package com.example.androidapp.data.auth;

import android.content.Context;
import android.content.SharedPreferences;

public class TokenManager {

    private static final String PREFS_NAME = "auth_prefs";
    private static final String TOKEN_KEY = "auth_token";

    private SharedPreferences prefs;

    // Constructor שמקבל את ה-Context של האפליקציה
    public TokenManager(Context context) {
        prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    // פונקציה לשמירת הטוקן
    public void saveToken(String token) {
        prefs.edit().putString(TOKEN_KEY, token).apply();
    }

    // פונקציה לקריאת הטוקן
    public String getToken() {
        return prefs.getString(TOKEN_KEY, null); // יחזיר null אם אין טוקן
    }

    // פונקציה למחיקת הטוקן (שימושי ב-Logout)
    public void deleteToken() {
        prefs.edit().remove(TOKEN_KEY).apply();
    }
}