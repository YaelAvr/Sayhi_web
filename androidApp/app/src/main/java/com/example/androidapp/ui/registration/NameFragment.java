package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import com.example.androidapp.data.Result;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.ui.registration.RegistrationViewModel;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

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

        viewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);
        viewModel.initRepo(requireContext());

        editTextFirstName = view.findViewById(R.id.editTextFirstName);
        editTextLastName = view.findViewById(R.id.editTextLastName);
        buttonNext = view.findViewById(R.id.buttonNext);

        buttonNext.setOnClickListener(v -> {
            String firstName = editTextFirstName.getText().toString().trim();
            String lastName = editTextLastName.getText().toString().trim();

            if (TextUtils.isEmpty(firstName)) {
                editTextFirstName.setError("First name is required");
                return;
            }

            viewModel.setFirstName(firstName);
            viewModel.setLastName(lastName);
            viewModel.validateDisplayName();
        });

        viewModel.getDisplayNameResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                NavController navController = NavHostFragment.findNavController(NameFragment.this);
                navController.navigate(R.id.action_nameFragment_to_dateAndGenderFragment);
            } else if (result instanceof Result.Error) {
                Toast.makeText(getContext(),
                        ((Result.Error) result).getError().getMessage(),
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

}