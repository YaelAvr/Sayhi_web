package com.example.androidapp.ui.home;

import android.os.Bundle;
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

    // רכיבי UI
    private TextView subjectTextView;
    private TextView bodyTextView;
    private TextView fromTextView;
    private TextView dateTextView;
    private ImageButton closeButton;
    private Button deleteButton;
    private Button addToLabelButton;

    private String currentMailId;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_single_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // אתחול ה-ViewModel (בלי Factory)
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
            AddToLabelDialogFragment dialog = AddToLabelDialogFragment.newInstance();

            dialog.setListener(selectedLabelNames -> {
                for (String label : selectedLabelNames) {
                    mailViewModel.addLabelToMail(currentMailId, label);
                }
                mailViewModel.findMailById(currentMailId);
                Toast.makeText(getContext(), "label added successfully", Toast.LENGTH_SHORT).show();
            });

            dialog.show(getParentFragmentManager(), "add_to_label");
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