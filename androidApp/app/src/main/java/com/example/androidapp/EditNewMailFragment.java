package com.example.androidapp;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.view.MenuProvider; // <-- Import חדש
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Lifecycle; // <-- Import חדש
import androidx.navigation.Navigation;

import com.google.android.material.appbar.MaterialToolbar;

public class EditNewMailFragment extends Fragment {

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_edit_new_mail, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        setupToolbar(view);
        setupMenu(); // קריאה לפונקציה החדשה שמגדירה את התפריט
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

    private void setupMenu() {
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
    }
}