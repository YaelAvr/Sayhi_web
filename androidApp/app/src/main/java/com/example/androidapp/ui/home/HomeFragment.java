package com.example.androidapp.ui.home;

import android.os.Bundle;
import android.os.Handler; // <-- הוסף import
import android.os.Looper; // <-- הוסף import
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout; // <-- הוסף import

import com.example.androidapp.Mail;
import com.example.androidapp.R;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class HomeFragment extends Fragment {

    // משתנים חדשים שהוספנו
    private SwipeRefreshLayout swipeRefreshLayout;

    private RecyclerView recyclerViewMails;
    private MailsAdapter mailsAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // מציאת הרכיבים מה-XML, כולל החדש
        swipeRefreshLayout = view.findViewById(R.id.swipe_refresh_layout);
        recyclerViewMails = view.findViewById(R.id.recycler_view_mails);

        setupRecyclerView();
        setupSwipeToRefresh(); // קריאה לפונקציה חדשה שמגדירה את הרענון

        // טעינה ראשונית של הנתונים
        loadMockMails();

//        if (getActivity() != null) {
//            Log.d("MyFabCheck", "Fragment is attached to an Activity.");
//
//            View fab = getActivity().findViewById(R.id.fab);
//
//            if (fab != null) {
//                Log.d("MyFabCheck", "SUCCESS: FAB was found with ID R.id.fab.");
//                fab.setOnClickListener(v -> {
//                    Log.d("MyFabCheck", "SUCCESS: FAB was clicked!");
//                    try {
//                        Navigation.findNavController(v).navigate(R.id.action_nav_home_to_editNewMailFragment);
//                        Log.d("MyFabCheck", "SUCCESS: Navigation command sent successfully.");
//                    } catch (Exception e) {
//                        Log.e("MyFabCheck", "ERROR: Navigation failed! Reason: " + e.getMessage(), e);
//                    }
//                });
//            } else {
//                Log.e("MyFabCheck", "ERROR: FAB is NULL. Could not find a View with ID R.id.fab in the Activity's layout.");
//            }
//        } else {
//            Log.e("MyFabCheck", "ERROR: getActivity() returned NULL. Fragment not attached.");
//        }
    }

    private void setupRecyclerView() {
        mailsAdapter = new MailsAdapter(); // ודא שיש לך את הקובץ MailsAdapter.java
        recyclerViewMails.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerViewMails.setAdapter(mailsAdapter);
    }

    // פונקציה חדשה להגדרת ההתנהגות של משיכה לרענון
    private void setupSwipeToRefresh() {
        swipeRefreshLayout.setOnRefreshListener(() -> {
            // מה יקרה כשהמשתמש יבצע משיכה לרענון
            // בעתיד, כאן תהיה קריאת API אמיתית

            // כרגע, נטען את נתוני הדמה מחדש
            // נוסיף השהייה של 1.5 שניות כדי שיהיה אפשר לראות את אנימציית הטעינה
            new Handler(Looper.getMainLooper()).postDelayed(() -> {
                loadMockMails();
                // חשוב מאוד: בסיום הטעינה, להפסיק את אנימציית הרענון
                swipeRefreshLayout.setRefreshing(false);
            }, 1500); // השהייה של 1500 מילישניות = 1.5 שניות
        });
    }

    private void loadMockMails() {
        List<Mail> mockMails = new ArrayList<>();

        // הוספת מיילים לדוגמה
        mockMails.add(new Mail("Google", "Security Alert", "A new device signed in...", new Date(), false, false, null));
        mockMails.add(new Mail("GitHub", "Build has failed", "The workflow run for your...", new Date(), false, true, null));
        mockMails.add(new Mail("Tami", "Weekly meeting notes", "Hi team, please find the...", new Date(System.currentTimeMillis() - 86400000L), true, false, null));
        mockMails.add(new Mail("LinkedIn", "9 searches this week", "See who's looking...", new Date(System.currentTimeMillis() - 86400000L), true, false, null));
        mockMails.add(new Mail("Slack", "New message from Ron", "Hey, do you have a minute...", new Date(System.currentTimeMillis() - 172800000L), false, false, null));

        // כדי שהרענון יראה ויזואלית, נערבב את הרשימה בכל פעם
//        Collections.shuffle(mockMails);

        // עדכון ה-Adapter עם רשימת הדמה
        mailsAdapter.setMails(mockMails);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }


    @Override
    public void onResume() {
        super.onResume();

        // אנחנו מגדירים את ה-Listener כאן, כי בנקודה זו אנחנו בטוחים
        // שגם ה-Fragment וגם ה-Activity קיימים ומוצגים.
        if (getActivity() != null) {
            View fab = getActivity().findViewById(R.id.fab);
            if (fab != null) {
                fab.setOnClickListener(v -> {
                    // חשוב מאוד: צריך להשתמש ב-getView() כדי לקבל את ה-NavController מתוך Fragment
                    if (getView() != null) {
                        Navigation.findNavController(getView()).navigate(R.id.action_nav_home_to_editNewMailFragment);
                    }
                });
            } else {
                // אם עדיין יש שגיאה, נראה אותה בלוג
                Log.e("HomeFragment", "FAB is still null in onResume");
            }
        }
    }
}