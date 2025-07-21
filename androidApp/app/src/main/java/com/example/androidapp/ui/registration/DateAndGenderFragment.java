package com.example.androidapp.ui.registration;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

import java.util.Calendar;
import java.time.LocalDate;

import com.example.androidapp.R;
import com.example.androidapp.ui.registration.RegistrationViewModel;

public class DateAndGenderFragment extends Fragment {

    private EditText dayEditText, yearEditText;
    private Spinner monthSpinner, genderSpinner;
    private Button nextButton;

    private RegistrationViewModel viewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // טוען את ה־XML
        return inflater.inflate(R.layout.fragment_date_and_gender, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);

        // מציאת רכיבי ה-UI מה-XML
        dayEditText = view.findViewById(R.id.dayEditText);
        yearEditText = view.findViewById(R.id.yearEditText);
        monthSpinner = view.findViewById(R.id.monthSpinner);
        genderSpinner = view.findViewById(R.id.genderSpinner);
        nextButton = view.findViewById(R.id.nextButton);

        setupMonthSpinner();
        setupGenderSpinner();

        nextButton.setOnClickListener(v -> {
            String dayStr = dayEditText.getText().toString().trim();
            String yearStr = yearEditText.getText().toString().trim();

            int day = tryParseInt(dayStr);
            int month = monthSpinner.getSelectedItemPosition(); // 0-based
            int year = tryParseInt(yearStr);
            String gender = genderSpinner.getSelectedItem().toString();

            if (!isValidDate(day, month, year)) {
                Toast.makeText(getContext(), "Invalid birth date", Toast.LENGTH_SHORT).show();
                return;
            }

            if (gender.equals("Gender")) {
                Toast.makeText(getContext(), "Please select your gender", Toast.LENGTH_SHORT).show();
                return;
            }

            viewModel.setBirthDate(day, month, year);
            viewModel.setGender(gender);

            NavController navController = NavHostFragment.findNavController(this);
            navController.navigate(R.id.action_dateAndGenderFragment_to_usernameFragment);
        });
    }

    private void setupMonthSpinner() {
        String[] months = {"January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(),
                android.R.layout.simple_spinner_item, months);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        monthSpinner.setAdapter(adapter);
    }

    private void setupGenderSpinner() {
        String[] genders = {"Other", "Female", "Male"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(requireContext(),
                android.R.layout.simple_spinner_item, genders);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        genderSpinner.setAdapter(adapter);
    }

    private int tryParseInt(String s) {
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            return -1;
        }
    }

    private boolean isValidDate(int day, int month, int year) {
        if (day < 1 || day > 31 || year < 1900) return false;
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        if (year >= currentYear) return false;
        // בדיקה פשוטה לחודשים קצרים
        if ((month == 3 || month == 5 || month == 8 || month == 10) && day > 30) return false;
        // בדיקה לפברואר – עם שנה מעוברת
        if (month == 1) {  // פברואר (0-based: ינואר=0, פברואר=1)
            boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
            if (day > (isLeap ? 29 : 28)) return false;
        }        return true;
    }
}