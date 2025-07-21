package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;
import com.example.androidapp.R;
import com.example.androidapp.ui.registration.RegistrationViewModel;

public class UsernameFragment extends Fragment {

    private RegistrationViewModel registrationViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_username, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view,
                              @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // קישור ל-ViewModel
        registrationViewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);

        EditText editTextUsername = view.findViewById(R.id.editTextUsername);
        Button buttonNext = view.findViewById(R.id.buttonNext);

        buttonNext.setOnClickListener(v -> {
            String username = editTextUsername.getText().toString().trim();

            // בהמשך נבדוק מול API אם הוא תקין
            if (!username.isEmpty()) {
                registrationViewModel.setUsername(username);

            //להוסיף הפניה לעמוד הבא
            } else {
                editTextUsername.setError("Username cannot be empty");
            }
        });
    }
}