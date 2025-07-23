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
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.model.Mail;

import java.text.SimpleDateFormat;
import java.util.Locale;

public class SingleMailFragment extends Fragment {

    // ViewModel לאחזור הנתונים
    private MailViewModel mailViewModel;

    // רכיבי UI להצגת הנתונים
    private TextView subjectTextView;
    private TextView bodyTextView;
    private TextView fromTextView;
    private TextView dateTextView;
    private ImageButton closeButton;

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

        // --- 1. אתחול ה-ViewModel ורכיבי ה-UI ---
        // חשוב להשתמש ב-requireActivity() כדי לקבל את אותו מופע של ViewModel כמו ה-Activity והפרגמנט הקודם
        mailViewModel = new ViewModelProvider(requireActivity()).get(MailViewModel.class);

        // ודא שה-IDs האלה תואמים לקובץ fragment_single_mail.xml
        subjectTextView = view.findViewById(R.id.subject_text);
        bodyTextView = view.findViewById(R.id.body_text);
        fromTextView = view.findViewById(R.id.from_text);
        dateTextView = view.findViewById(R.id.date_text);
        closeButton = view.findViewById(R.id.button_close);

        // הגדרת כפתור הסגירה
        closeButton.setOnClickListener(v -> {
            if (getView() != null) {
                Navigation.findNavController(getView()).navigateUp();
            }
        });

        // --- 2. קבלת ה-ID של המייל מה-Bundle ---
        String mailId = null;
        if (getArguments() != null) {
            mailId = getArguments().getString("mailId");
        }

        // --- 3. אם קיבלנו ID, נבקש את המידע מה-ViewModel ---
        if (mailId != null) {
            mailViewModel.findMailById(mailId);
            mailViewModel.getSelectedMail().observe(getViewLifecycleOwner(), mail -> {
                if (mail != null) {
                    displayMailDetails(mail); // הצג את הפרטים
                } else {
                    Toast.makeText(requireContext(), "Mail not found.", Toast.LENGTH_SHORT).show();
                }
            });
            // =======================================================
        } else {
            Toast.makeText(requireContext(), "Error: Missing Mail ID.", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * פונקציית עזר שמקבלת אובייקט Mail ומעדכנת את רכיבי ה-UI.
     * @param mail האובייקט עם פרטי המייל להצגה.
     */
    private void displayMailDetails(Mail mail) {
        subjectTextView.setText(mail.getSubject());
        bodyTextView.setText(mail.getBody());
        fromTextView.setText(mail.getFromName());

        if (mail.getTime() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("MMM d, yyyy 'at' HH:mm", Locale.getDefault());
            dateTextView.setText(sdf.format(mail.getTime()));
        } else {
            dateTextView.setText(""); // מנקים את השדה אם אין תאריך
        }

        // כאן תוכל להוסיף בעתיד לוגיקה לעדכון תמונת הפרופיל, טיפול בקבצים מצורפים וכו'.
    }
}