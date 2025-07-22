package com.example.androidapp;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.ui.landingPage.LandingPageActivity;

public class MainActivity extends AppCompatActivity {
    private TokenManager tokenManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Instantiate your TokenManager
        tokenManager = new TokenManager(this);

        Intent intent;
        // Check if a token exists
        if (tokenManager.getToken() == null) {
            intent = new Intent(this, LandingPageActivity.class);

        } else {
            intent = new Intent(this, InboxActivity.class);
        }


        // מעבר אוטומטי ל-MainActivity2
//        Intent intent = new Intent(this, InboxActivity.class);
        Intent intent = new Intent(this, LoginActivity.class);


        startActivity(intent);

        finish();
    }
}