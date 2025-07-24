package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.text.InputType;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import com.example.androidapp.R;
import com.example.androidapp.data.Result;

import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

public class PasswordFragment extends Fragment {

    private RegistrationViewModel registrationViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_password, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view,
                              @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        registrationViewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);
        registrationViewModel.initRepo(requireContext());


        EditText editTextPassword = view.findViewById(R.id.editTextPassword);
        EditText editTextConfirmPassword = view.findViewById(R.id.editTextConfirmPassword);
        Button buttonNext = view.findViewById(R.id.buttonNext);
        CheckBox checkboxShowPassword = view.findViewById(R.id.checkboxShowPassword); // ✅ חדש

        //  לוגיקה להצגת/הסתרת סיסמה
        checkboxShowPassword.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked) {
                editTextPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
                editTextConfirmPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
            } else {
                editTextPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                editTextConfirmPassword.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
            }

            // שמירת הקורסור בסוף
            editTextPassword.setSelection(editTextPassword.length());
            editTextConfirmPassword.setSelection(editTextConfirmPassword.length());
        });

        buttonNext.setOnClickListener(v -> {
            String password = editTextPassword.getText().toString().trim();
            String confirmPassword = editTextConfirmPassword.getText().toString().trim();

            registrationViewModel.validatePassword(password, confirmPassword);
        });
        registrationViewModel.getPasswordResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                registrationViewModel.setPassword(((Result.Success<String>) result).getData());
                NavController navController = NavHostFragment.findNavController(this);
                navController.navigate(R.id.action_passwordFragment_to_profilePictureFragment);
            } else if (result instanceof Result.Error) {
                String errorMsg = ((Result.Error) result).getError().getMessage();
                editTextPassword.setError(errorMsg);
                Toast.makeText(getContext(), errorMsg, Toast.LENGTH_SHORT).show();
            }
        });

    }
}