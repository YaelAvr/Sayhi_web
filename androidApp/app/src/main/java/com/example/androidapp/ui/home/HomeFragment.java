package com.example.androidapp.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.Mail;
import com.example.androidapp.R;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class HomeFragment extends Fragment {

    private RecyclerView recyclerViewMails;
    private MailsAdapter mailsAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // מציאת ה-RecyclerView
        recyclerViewMails = view.findViewById(R.id.recycler_view_mails);

        // הגדרת ה-Adapter וה-LayoutManager
        setupRecyclerView();

        // טעינת נתוני הדמה
        loadMockMails();
    }

    private void setupRecyclerView() {
        mailsAdapter = new MailsAdapter();
        recyclerViewMails.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewMails.setAdapter(mailsAdapter);
    }

    private void loadMockMails() {
        List<Mail> mockMails = new ArrayList<>();

        // הוספת מיילים לדוגמה עם ה-Constructor החדש
        mockMails.add(new Mail("Google", "Security Alert", "A new device signed in...", new Date(), false, false, null));
        mockMails.add(new Mail("GitHub", "Build has failed", "The workflow run for your...", new Date(), false, true, null));
        mockMails.add(new Mail("Tami", "Weekly meeting notes", "Hi team, please find the...", new Date(System.currentTimeMillis() - 86400000), true, false, null)); // מייל מאתמול
        mockMails.add(new Mail("LinkedIn", "9 searches this week", "See who's looking...", new Date(System.currentTimeMillis() - 86400000), true, false, null));
        mockMails.add(new Mail("Slack", "New message from Ron", "Hey, do you have a minute...", new Date(System.currentTimeMillis() - 172800000), false, false, null)); // מייל משלשום

        // עדכון ה-Adapter עם רשימת הדמה
        mailsAdapter.setMails(mockMails);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }
}