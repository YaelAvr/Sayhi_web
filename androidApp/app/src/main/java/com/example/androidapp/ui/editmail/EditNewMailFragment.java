package com.example.androidapp.ui.editmail;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.google.android.material.appbar.MaterialToolbar;

public class EditNewMailFragment extends Fragment {
    private EditNewMailViewModel viewModel;
    private EditText toEditText, subjectEditText, bodyEditText;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(this).get(EditNewMailViewModel.class);
        return inflater.inflate(R.layout.fragment_edit_new_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        toEditText = view.findViewById(R.id.mail_to);
        subjectEditText = view.findViewById(R.id.mail_subject);
        bodyEditText = view.findViewById(R.id.mail_body);


        setupToolbar(view); // X button
//        setupMenu(); // קריאה לפונקציה החדשה שמגדירה את התפריט
        setupSendButton(view);
        observeViewModel();
    }

    private void observeViewModel() {
        viewModel.getSendResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                Toast.makeText(getContext(), "Mail created!", Toast.LENGTH_SHORT).show();
                // Navigate back after success
                Navigation.findNavController(requireView()).navigateUp();
            } else if (result instanceof Result.Error) {
                String errorMessage = ((Result.Error) result).getError().getMessage();
                Log.e("fregment_getSendResult", "response.code(): " +errorMessage);

                Toast.makeText(getContext(), "Error: " + errorMessage, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void setupToolbar(View view) {
        MaterialToolbar toolbar = view.findViewById(R.id.toolbar_edit_mail);
        toolbar.setNavigationOnClickListener(v -> {
            // הטיפול בכפתור הניווט (X) יישאר כאן אם תרצי התנהגות שונה מכפתור ה"אחורה" הראשי.
            // אם לא, אפשר למחוק את זה ולטפל רק ב-onOptionsItemSelected.
            // כרגע נשאיר את זה כך שיחזור אחורה.
            if (getView() != null) {
                Navigation.findNavController(getView()).navigateUp();
            }
        });
    }

  /*  private void setupMenu() {
        // הדרך החדשה והמודרנית להוסיף תפריט ל-Fragment
        requireActivity().addMenuProvider(new MenuProvider() {
            @Override
            public void onCreateMenu(@NonNull Menu menu, @NonNull MenuInflater menuInflater) {
                // אם תרצי להוסיף כפתורים לתפריט (למשל 'Send', 'Attach'), תעשי את זה כאן.
                // לדוגמה: menuInflater.inflate(R.menu.edit_mail_menu, menu);
            }

            @Override
            public boolean onMenuItemSelected(@NonNull MenuItem menuItem) {
                // כאן מטפלים בלחיצות על פריטי התפריט, כולל כפתור ה"בית/חזור".
                if (menuItem.getItemId() == android.R.id.home) {
                    // הלוגיקה של שמירה כטיוטה תיכנס כאן
                    Toast.makeText(getContext(), "Back button pressed. Saving as draft...", Toast.LENGTH_SHORT).show();

                    // אחרי הלוגיקה, נחזור אחורה
                    if (getActivity() != null) {
                        getActivity().onBackPressed();
                    }
                    return true; // ציין שטיפלנו באירוע
                }
                return false; // אם לא טיפלנו, החזר false
            }
        }, getViewLifecycleOwner(), Lifecycle.State.RESUMED);
    }*/

    private void setupSendButton(View view) {
        // מצא את הכפתור לפי ה-ID שהגדרנו ב-XML
        com.google.android.material.button.MaterialButton sendButton = view.findViewById(R.id.button_send);

        // הגדר מאזין ללחיצות
        if (sendButton != null) {
            sendButton.setOnClickListener(v -> {

                String to = toEditText.getText().toString().trim();
                String subject = subjectEditText.getText().toString().trim();
                String body = bodyEditText.getText().toString().trim();
                viewModel.sendMail(to, subject, body);
                // כרגע, רק נקפיץ הודעה כדי לוודא שזה עובד
//                Toast.makeText(getContext(), "כפתור 'שלח' נלחץ!", Toast.LENGTH_SHORT).show();

                // כאן בעתיד תוסיף את הלוגיקה של איסוף המידע ושליחת המייל
            });
        }
    }
}