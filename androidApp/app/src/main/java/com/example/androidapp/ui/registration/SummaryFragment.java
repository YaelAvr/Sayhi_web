package com.example.androidapp.ui.registration;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;


import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.bumptech.glide.Glide;
import com.example.androidapp.R;
import com.example.androidapp.data.model.NewUserRequest;
import com.example.androidapp.data.Result;
import com.example.androidapp.ui.login.LoginActivity;

import java.io.File;

public class SummaryFragment extends Fragment {

    private RegistrationViewModel viewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_summary, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);

        // קישור לרכיבי ה־XML
        ImageView imageView = view.findViewById(R.id.imageViewProfile);
        TextView textViewName = view.findViewById(R.id.textViewDisplayName);
        TextView textViewEmail = view.findViewById(R.id.textViewEmail);
        Button buttonRestart = view.findViewById(R.id.buttonRestart);
        Button buttonConfirm = view.findViewById(R.id.buttonConfirm);

        // הגדרת תמונת פרופיל
        File profileFile = viewModel.getProfilePictureFile();
        if (profileFile != null) {
            Uri imageUri = Uri.fromFile(profileFile);
            Glide.with(this).load(imageUri).into(imageView);
        }

        // הגדרת שם ואימייל
        String name = viewModel.getFirstName().getValue();
        String email = viewModel.getUsername() + "@sayhi.com";

        textViewName.setText(name);
        textViewEmail.setText(email);
        // מאזין לתוצאה מה-API
        viewModel.getCreateUserResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                Intent intent = new Intent(requireContext(), LoginActivity.class);
                startActivity(intent);
                requireActivity().finish();
            } else if (result instanceof Result.Error) {
                String error = ((Result.Error) result).getError().getMessage();
            }
        });

        // כפתור התחלה מחדש
        buttonRestart.setOnClickListener(v -> {
            viewModel.clearAll();  // פונקציה שתנקה את כל הערכים
            Navigation.findNavController(view).navigate(R.id.action_summaryFragment_to_nameFragment);
        });

        // כפתור סיום הרשמה
        buttonConfirm.setOnClickListener(v -> {
            String username = viewModel.getUsername();
            String displayName = viewModel.getFirstName().getValue();
            String password = viewModel.getPassword();
            String picture = viewModel.getProfilePictureUrl();  // זה אמור להיות URL מהשרת
            String gender = viewModel.getGender().getValue();
            String birthday = viewModel.getFormattedBirthdayWithMonthName();

            // יצירת אובייקט בקשת משתמש חדש
            NewUserRequest newUserRequest = new NewUserRequest(
                    username, displayName, password, picture, gender, birthday
            );

            viewModel.createUser(newUserRequest);  // קריאה ל־API
            viewModel.clearAll();
            Intent intent = new Intent(requireContext(), LoginActivity.class);
            startActivity(intent);
            requireActivity().finish();        });
    }
}