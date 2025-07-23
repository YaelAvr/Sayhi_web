package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;
import com.example.androidapp.R;
import com.example.androidapp.data.Result;
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
        registrationViewModel.initRepo(requireContext());

        EditText editTextUsername = view.findViewById(R.id.editTextUsername);
        Button buttonNext = view.findViewById(R.id.buttonNext);

        buttonNext.setOnClickListener(v -> {
            String username = editTextUsername.getText().toString().trim();

            if (username.isEmpty()) {
                editTextUsername.setError("Username cannot be empty");
                return;
            }

            registrationViewModel.setUsername(username);
            registrationViewModel.validateUsername();  // בדיקה מול ה־API
        });

        registrationViewModel.getUsernameResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                NavController navController = NavHostFragment.findNavController(this);
                navController.navigate(R.id.action_usernameFragment_to_passwordFragment);
            } else if (result instanceof Result.Error) {
                String errorMsg = ((Result.Error) result).getError().getMessage();
                editTextUsername.setError(errorMsg);
                Toast.makeText(getContext(), errorMsg, Toast.LENGTH_SHORT).show();
            }
        });
    }
}