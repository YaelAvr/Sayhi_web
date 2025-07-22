package com.example.androidapp.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidapp.R;
import com.example.androidapp.model.Mail;

import java.text.SimpleDateFormat;
import java.util.Locale;


public class SingleMailFragment extends Fragment {

    private TextView subjectTextView, bodyTextView, fromTextView, dateTextView;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_single_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        subjectTextView = view.findViewById(R.id.subject_text);
        bodyTextView = view.findViewById(R.id.body_text);
        fromTextView = view.findViewById(R.id.from_text);
        dateTextView = view.findViewById(R.id.date_text);

        // קבלת נתוני המייל דרך Bundle
        if (getArguments() != null) {
            String subject = getArguments().getString("subject");
            String body = getArguments().getString("body");
            String from = getArguments().getString("from");
            String date = getArguments().getString("date");

            subjectTextView.setText(subject);
            bodyTextView.setText(body);
            fromTextView.setText(from);
            dateTextView.setText(date);
        }

        ImageButton closeButton = view.findViewById(R.id.button_close);
        closeButton.setOnClickListener(v -> {
            // חזרה אחורה
            requireActivity().onBackPressed();
        });

        String mailId = getArguments() != null ? getArguments().getString("mailId") : null;
        if (mailId != null) {
            MailViewModel viewModel = new ViewModelProvider(this).get(MailViewModel.class);
            viewModel.getMailById(mailId).observe(getViewLifecycleOwner(), mail -> {
                if (mail != null) {
                    displayMail(mail); // פונקציה שמציגה את פרטי המייל במסך
                } else {
                    Toast.makeText(requireContext(), "Mail not found", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            Toast.makeText(requireContext(), "Missing mail ID", Toast.LENGTH_SHORT).show();
        }

    }
    private void displayMail(Mail mail) {
        subjectTextView.setText(mail.getSubject());
        bodyTextView.setText(mail.getBody());
        fromTextView.setText(mail.getFromName());

        if (mail.getTime() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("MMM d, HH:mm", Locale.getDefault());
            dateTextView.setText(sdf.format(mail.getTime()));
        } else {
            dateTextView.setText(""); // כדי שלא יישאר טקסט ישן
        }
    }
}
