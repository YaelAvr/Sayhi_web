package com.example.androidapp.ui.landingPage;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.example.androidapp.databinding.ActivityLandingPageBinding;
import com.example.androidapp.ui.login.LoginActivity;

public class LandingPageActivity extends AppCompatActivity {
    private ActivityLandingPageBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityLandingPageBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        Button nextBtn = binding.landingPageBtn;

        nextBtn.setOnClickListener(v -> {
            Intent intent = new Intent(this, LoginActivity.class);
            startActivity(intent);
        });

    }


}