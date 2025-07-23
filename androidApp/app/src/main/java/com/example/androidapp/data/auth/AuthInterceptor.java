package com.example.androidapp.data.auth;

import java.io.IOException;
import android.util.Log; // <-- הוסף import

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

public class AuthInterceptor implements Interceptor {
    private final TokenManager tokenManager;

    public AuthInterceptor(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        String token = tokenManager.getToken();

        // ================== הוספנו הדפסה לבדיקה ==================
        if (token != null) {
            Log.d("AuthInterceptor", "Token found, adding to header: Bearer " + token.substring(0, Math.min(token.length(), 10)) + "...");
        } else {
            Log.d("AuthInterceptor", "Token is NULL. Sending request without Authorization header.");
        }
        // =========================================================

        Request request = chain.request();
        if (token != null) {
            request = request.newBuilder()
                    .addHeader("Authorization", "Bearer " + token)
                    .build();
        }

        return chain.proceed(request);
    }
}

