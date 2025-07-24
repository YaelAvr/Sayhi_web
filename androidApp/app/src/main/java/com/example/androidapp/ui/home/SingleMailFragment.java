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
import java.util.List; // ודא שהייבוא הזה קיים
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
            Toast.makeText(requireContext(), "מוחק...", Toast.LENGTH_SHORT).show();
            mailViewModel.deleteMail(currentMailId);
        });

        // --- כאן התיקון בלוגיקת הכפתור ---
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
                Toast.makeText(requireContext(), "המייל נמחק בהצלחה", Toast.LENGTH_LONG).show();
                navigateUp();
            } else if (result instanceof Result.Error) {
                String errorMessage = ((Result.Error) result).getError().getMessage();
                Toast.makeText(requireContext(), "שגיאה: " + errorMessage, Toast.LENGTH_LONG).show();
                deleteButton.setEnabled(true);
            }
        });

        // --- הוספה: האזנה לתוצאת ההוספה לתווית ---
        mailViewModel.getAddLabelResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                Toast.makeText(getContext(), "המייל נוסף לתווית בהצלחה!", Toast.LENGTH_SHORT).show();
                // אופציונלי: רענן את נתוני המייל כדי להציג את התווית החדשה אם יש לך תצוגה כזו
                mailViewModel.findMailById(currentMailId);
            }
            else if (result instanceof Result.Error) {
                // --- כאן התיקון ---
                // 1. נשמור את תוצאת השגיאה במשתנה נפרד
                Result.Error<Void> errorResult = (Result.Error<Void>) result;
                // 2. נקבל את הודעת השגיאה מהמשתנה
                String errorMessage = errorResult.getError().getMessage();
                // 3. נציג את ההודעה הנקייה
                Toast.makeText(getContext(), "שגיאה בהוספת התווית: " + errorMessage, Toast.LENGTH_SHORT).show();
            }
        });
    }

    // --- הוספה: פונקציה שמראה את הדיאלוג ומטפלת בתוצאה ---
    private void showAddToLabelDialog() {
        AddToLabelDialogFragment dialog = AddToLabelDialogFragment.newInstance();
        dialog.setListener(selectedLabelNames -> {
            if (selectedLabelNames == null || selectedLabelNames.isEmpty()) {
                Toast.makeText(getContext(), "לא נבחרו תוויות", Toast.LENGTH_SHORT).show();
                return; // יציאה מהפונקציה אם לא נבחר כלום
            }

            // --- בדיקת בטיחות: ודא שיש לנו ID של מייל ---
            if (currentMailId == null || currentMailId.isEmpty()) {
                Toast.makeText(getContext(), "שגיאה: לא זוהה מייל נוכחי", Toast.LENGTH_SHORT).show();
                return;
            }

            Toast.makeText(getContext(), "מעדכן...", Toast.LENGTH_SHORT).show();

            for (String labelName : selectedLabelNames) {
                // --- בדיקת בטיחות: ודא ששם התווית אינו ריק ---
                if (labelName != null && !labelName.isEmpty()) {
                    // הדפסה ל-Logcat כדי לוודא מה אנחנו שולחים
                    Log.d("AddLabelDebug", "שולח בקשה: mailId=" + currentMailId + ", labelName=" + labelName);
                    mailViewModel.addLabelToMail(currentMailId, labelName);
                } else {
                    Log.e("AddLabelDebug", "ניסיון לשלוח שם תווית ריק!");
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