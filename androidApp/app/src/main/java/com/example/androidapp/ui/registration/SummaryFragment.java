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

import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.bumptech.glide.Glide;
import com.example.androidapp.R;
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

        // כפתור התחלה מחדש
        buttonRestart.setOnClickListener(v -> {
            viewModel.clearAll();  // פונקציה שתנקה את כל הערכים
            Navigation.findNavController(view).navigate(R.id.action_summaryFragment_to_nameFragment);
        });

        // כפתור סיום הרשמה
        buttonConfirm.setOnClickListener(v -> {
            // TODO: שמירת המשתמש בפועל תתבצע דרך הרפוזיטורי + DAO בהמשך
            viewModel.clearAll();
            Intent intent = new Intent(requireContext(), LoginActivity.class);
            startActivity(intent);
            requireActivity().finish();        });
    }
}