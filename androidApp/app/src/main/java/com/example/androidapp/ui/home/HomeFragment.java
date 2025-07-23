package com.example.androidapp.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.model.Mail;

import java.util.List;

public class HomeFragment extends Fragment {

    private SwipeRefreshLayout swipeRefreshLayout;
    private RecyclerView recyclerViewMails;
    private MailsAdapter mailsAdapter;
    private MailViewModel mailViewModel;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // --- 1. אתחול הרכיבים וה-ViewModel ---
        // חשוב להשתמש ב-requireActivity() כדי לקבל את אותו מופע של ViewModel כמו ה-Activity
        mailViewModel = new ViewModelProvider(requireActivity()).get(MailViewModel.class);

        swipeRefreshLayout = view.findViewById(R.id.swipe_refresh_layout);
        recyclerViewMails = view.findViewById(R.id.recycler_view_mails);

        setupRecyclerView();
        setupSwipeToRefresh();


        // --- 2. הוספת המאזין (Observer) המרכזי לתוצאות מה-API ---
        mailViewModel.getMailsResult().observe(getViewLifecycleOwner(), result -> {
            swipeRefreshLayout.setRefreshing(false); // הפסק אנימציית רענון אם הייתה

            if (result instanceof Result.Success) {
                // הצלחה! קבלנו רשימה של מיילים מהשרת
                List<Mail> apiMails = ((Result.Success<List<Mail>>) result).getData();

                // עדכן את המתאם עם הנתונים החדשים
                mailsAdapter.setMails(apiMails);

                Toast.makeText(getContext(), "Loaded " + apiMails.size() + " mails.", Toast.LENGTH_SHORT).show();
            } else if (result instanceof Result.Error) {
                // הצג הודעת שגיאה במקרה של כישלון
                Exception error = ((Result.Error) result).getError();
                Toast.makeText(getContext(), "Error: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        // --- 3. טעינה ראשונית של תיבת הדואר הנכנס ---
        // בפעם הראשונה שהמסך עולה, נציג את המיילים מה-inbox כברירת מחדל
        mailViewModel.fetchMailsByLabel("Inbox");
    }

    private void setupRecyclerView() {
        mailsAdapter = new MailsAdapter();
        recyclerViewMails.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewMails.setAdapter(mailsAdapter);
    }

    private void setupSwipeToRefresh() {
        swipeRefreshLayout.setOnRefreshListener(() -> {
            // בעתיד, אפשר להוסיף כאן לוגיקה מורכבת יותר שתזכור מה הלייבל האחרון שנבחר
            // כרגע, כל רענון יטען מחדש את תיבת הדואר הנכנס
            mailViewModel.fetchMailsByLabel("Inbox");
        });
    }

    @Override
    public void onResume() {
        super.onResume();
        // הלוגיקה של הכפתור הצף נשארת כמו שהיא
        if (getActivity() != null) {
            View fab = getActivity().findViewById(R.id.fab);
            if (fab != null) {
                fab.setOnClickListener(v -> {
                    if (getView() != null) {
                        Bundle args = new Bundle();
                        args.putString("mode", "new"); // מציין שזה מייל חדש
                        Navigation.findNavController(getView())
                                .navigate(R.id.action_nav_home_to_editNewMailFragment, args);
                    }
                });
             }
        }
    }


    private Mail toMail(MailEntity entity) {
        Mail mail = new Mail(
                entity.getFromName(),
                entity.getSubject(),
                entity.getBody(),
                entity.getTime(),
                entity.isRead(),
                entity.isStarred(),
                entity.getFromPicture()
        );
        mail.setId(entity.getId());
        return mail;
    }

}