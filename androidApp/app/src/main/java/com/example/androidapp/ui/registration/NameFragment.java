package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.ui.registration.RegistrationViewModel;

public class NameFragment extends Fragment {

    private EditText editTextFirstName;  // שדה לשם פרטי
    private EditText editTextLastName;   // שדה לשם משפחה
    private Button buttonNext;           // כפתור "Next"
    private RegistrationViewModel viewModel;  // ה־ViewModel המשותף

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_name, container, false);  // טוען את ה־XML ששלחנו קודם
    }

    @Override
    public void onViewCreated(@NonNull View view,
                              @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // איתחול ViewModel משותף לכל שלבי ההרשמה
        viewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);

        // קישור ל־EditText וכפתור
        editTextFirstName = view.findViewById(R.id.editTextFirstName);
        editTextLastName = view.findViewById(R.id.editTextLastName);
        buttonNext = view.findViewById(R.id.buttonNext);

        // לחיצה על כפתור Next
        buttonNext.setOnClickListener(v -> {
            String firstName = editTextFirstName.getText().toString().trim();
            String lastName = editTextLastName.getText().toString().trim();

            // ולידציה: חובה שם פרטי
            if (TextUtils.isEmpty(firstName)) {
                editTextFirstName.setError("First name is required");
                return;
            }

            // שמירת השם ב־ViewModel
            viewModel.setFirstName(firstName);
            viewModel.setLastName(lastName);

        });
    }
}