package com.example.androidapp.ui.home;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.model.Mail;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class SingleMailFragment extends Fragment {

    private MailViewModel mailViewModel;

    private TextView subjectTextView, bodyTextView, fromTextView, dateTextView;
    private ImageButton closeButton;
    private Button deleteButton, addToLabelButton;
    private String currentMailId;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_single_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mailViewModel = new ViewModelProvider(this).get(MailViewModel.class);
        initializeViews(view);

        if (getArguments() != null) {
            currentMailId = getArguments().getString("mailId");
        }

        if (currentMailId != null) {
            setupListeners();
            observeViewModel();
            mailViewModel.findMailById(currentMailId);
        } else {
            Toast.makeText(requireContext(), "Error: Missing Mail ID.", Toast.LENGTH_SHORT).show();
            navigateUp();
        }
    }

    private void initializeViews(View view) {
        subjectTextView = view.findViewById(R.id.subject_text);
        bodyTextView = view.findViewById(R.id.body_text);
        fromTextView = view.findViewById(R.id.from_text);
        dateTextView = view.findViewById(R.id.date_text);
        closeButton = view.findViewById(R.id.button_close);
        deleteButton = view.findViewById(R.id.button_delete);
        addToLabelButton = view.findViewById(R.id.button_add_to_label);
    }

    private void setupListeners() {
        closeButton.setOnClickListener(v -> navigateUp());

        deleteButton.setOnClickListener(v -> {
            deleteButton.setEnabled(false);
            Toast.makeText(requireContext(), "deleting...", Toast.LENGTH_SHORT).show();
            mailViewModel.deleteMail(currentMailId);
        });

        addToLabelButton.setOnClickListener(v -> {
            showAddToLabelDialog();
        });
    }

    private void observeViewModel() {
        mailViewModel.getSelectedMail().observe(getViewLifecycleOwner(), mail -> {
            if (mail != null) {
                displayMailDetails(mail);
            }
        });

        mailViewModel.getDeleteResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                navigateUp();
            } else if (result instanceof Result.Error) {
                String errorMessage = ((Result.Error) result).getError().getMessage();
                deleteButton.setEnabled(true);
            }
        });

        mailViewModel.getAddLabelResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                Toast.makeText(getContext(), "Mail added successfully", Toast.LENGTH_SHORT).show();
                mailViewModel.findMailById(currentMailId);
            }
            else if (result instanceof Result.Error) {
                Result.Error<Void> errorResult = (Result.Error<Void>) result;
                String errorMessage = errorResult.getError().getMessage();
                Toast.makeText(getContext(), "Error: " + errorMessage, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showAddToLabelDialog() {
        AddToLabelDialogFragment dialog = AddToLabelDialogFragment.newInstance();
        dialog.setListener(selectedLabelNames -> {
            if (selectedLabelNames == null || selectedLabelNames.isEmpty()) {
                Toast.makeText(getContext(), "No labels selected", Toast.LENGTH_SHORT).show();
                return;
            }

            if (currentMailId == null || currentMailId.isEmpty()) {
                Toast.makeText(getContext(), "Error: No current mail detected", Toast.LENGTH_SHORT).show();
                return;
            }

            Toast.makeText(getContext(), "updating...", Toast.LENGTH_SHORT).show();

            for (String labelName : selectedLabelNames) {
                if (labelName != null && !labelName.isEmpty()) {
                    mailViewModel.addLabelToMail(currentMailId, labelName);
                }
            }
        });
        dialog.show(getParentFragmentManager(), "AddToLabelDialog");
    }

    private void displayMailDetails(Mail mail) {
        subjectTextView.setText(mail.getSubject());
        bodyTextView.setText(mail.getBody());
        fromTextView.setText(mail.getFromName());

        if (mail.getTime() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("MMM d, yyyy 'at' HH:mm", Locale.getDefault());
            dateTextView.setText(sdf.format(mail.getTime()));
        } else {
            dateTextView.setText("");
        }
    }

    private void navigateUp() {
        if (getView() != null && isAdded()) {
            Navigation.findNavController(getView()).navigateUp();
        }
    }
}