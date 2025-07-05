package com.example.androidapp;

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
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(TOKEN_KEY, token);
        editor.apply();
    }

    // פונקציה לקריאת הטוקן
    public String getToken() {
        return prefs.getString(TOKEN_KEY, null); // יחזיר null אם אין טוקן
    }

    // פונקציה למחיקת הטוקן (שימושי ב-Logout)
    public void deleteToken() {
        SharedPreferences.Editor editor = prefs.edit();
        editor.remove(TOKEN_KEY);
        editor.apply();
    }
}