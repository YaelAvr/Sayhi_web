package com.example.androidapp.ui.editmail;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavBackStackEntry;
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.google.android.material.appbar.MaterialToolbar;

public class EditNewMailFragment extends Fragment {
    private EditNewMailViewModel viewModel;
    private EditText toEditText, subjectEditText, bodyEditText;

    private String mode;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(this).get(EditNewMailViewModel.class);
        mode = getArguments() != null ? getArguments().getString("mode", "new") : "new";

        return inflater.inflate(R.layout.fragment_edit_new_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        toEditText = view.findViewById(R.id.mail_to);
        subjectEditText = view.findViewById(R.id.mail_subject);
        bodyEditText = view.findViewById(R.id.mail_body);

        setupToolbar(view); // X button
        setupSendButton(view);
        observeViewModel();
    }

    private void observeViewModel() {
        viewModel.getSendResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                NavBackStackEntry backStackEntry =
                        Navigation.findNavController(requireView())
                                .getPreviousBackStackEntry();

                if (backStackEntry != null) {
                    backStackEntry.getSavedStateHandle().set("shouldRefresh", true);
                }

                Navigation.findNavController(requireView()).navigateUp();
            } else if (result instanceof Result.Error) {
                String errorMessage = ((Result.Error) result).getError().getMessage();

                Toast.makeText(getContext(), "Error: " + errorMessage, Toast.LENGTH_LONG).show();
            }
        });
    }

    // this is the X button the create a draft
    private void setupToolbar(View view) {
        MaterialToolbar toolbar = view.findViewById(R.id.toolbar_edit_mail);
        toolbar.setNavigationOnClickListener(v -> {
            if (getView() != null) {
                if(!toEditText.getText().toString().trim().isEmpty()) {
                    saveAsDraft(); // פונקציה שתשמור ל־DAO
                    Toast.makeText(getContext(), "Saved as draft", Toast.LENGTH_SHORT).show();
                }
                Navigation.findNavController(getView()).navigateUp();
            }
        });
    }


    // define a send button
    private void setupSendButton(View view) {
        com.google.android.material.button.MaterialButton sendButton = view.findViewById(R.id.button_send);

        if (sendButton != null) {
            sendButton.setOnClickListener(v -> {
                String to = toEditText.getText().toString().trim();
                String subject = subjectEditText.getText().toString().trim();
                String body = bodyEditText.getText().toString().trim();
                viewModel.sendMail(to, subject, body); // go to view model
            });
        }
    }

    private void saveAsDraft(){
        String to = ((EditText) requireView().findViewById(R.id.mail_to)).getText().toString().trim();
        String subject = ((EditText) requireView().findViewById(R.id.mail_subject)).getText().toString().trim();
        String body = ((EditText) requireView().findViewById(R.id.mail_body)).getText().toString().trim();

        viewModel.saveDraftOnExit(to, subject, body);
    }

}