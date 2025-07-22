package com.example.androidapp;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.model.User;
import com.example.androidapp.databinding.ActivityMain2Binding;
import com.example.androidapp.model.Label;
import com.example.androidapp.ui.gallery.LabelViewModel;
import com.example.androidapp.ui.gallery.LabelsAdapter;
import com.example.androidapp.ui.home.MailViewModel;
import com.example.androidapp.ui.loggedInUser.LoggedInUserViewModel;
import com.google.android.material.navigation.NavigationView;

import java.util.List;

public class InboxActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMain2Binding binding;

    // ViewModels
    private LabelViewModel labelViewModel;
    private MailViewModel mailViewModel;
    private LoggedInUserViewModel userViewModel;

    // Adapters & Views
    private LabelsAdapter labelsAdapter;
    private RecyclerView navLabelsRecyclerView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMain2Binding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        setSupportActionBar(binding.appBarMain.toolbar);

        // ================== 1. אתחול כל ה-ViewModels ==================
        labelViewModel = new ViewModelProvider(this).get(LabelViewModel.class);
        mailViewModel = new ViewModelProvider(this).get(MailViewModel.class);
        userViewModel = new LoggedInUserViewModel(this);

        userViewModel.fetchCurrentUserProfile();


        userViewModel.getUserProfile().observe(this, result -> {
            Log.i("inbox", " " );
//            loadingProgressBar.setVisibility(View.GONE);
            if (result instanceof Result.Success) {
                User user = ((Result.Success<User>) result).getData();
                Log.i("getUserResult", "user display name:  " + user.getDisplayName());

            } else if (result instanceof Result.Error) {
                Exception e = ((Result.Error) result).getError();
                Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();

            }
        });

//        binding.appBarMain.fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
//            }
//        });

        labelsAdapter = new LabelsAdapter();

        // 2. נגדיר את ה-Observer. עכשיו זה בטוח כי labelsAdapter כבר קיים.
        labelViewModel.getAllLabels().observe(this, labelEntities -> {
            List<Label> labels = new ArrayList<>();
            for (LabelEntity entity : labelEntities) {
                labels.add(toLabel(entity));
            }
            // הפעולה הזו בטוחה כעת
            labelsAdapter.setLabels(labels);
        });


        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;

        mAppBarConfiguration = new AppBarConfiguration.Builder(R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow)
                .setOpenableLayout(drawer)
                .build();

        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);
        setupNavigationListener();


        // ================== 3. הגדרת רשימת הלייבלים בתפריט ==================
        navLabelsRecyclerView = navigationView.findViewById(R.id.nav_labels_recycler_view);
        if (navLabelsRecyclerView != null) {
            labelsAdapter = new LabelsAdapter(labelViewModel);
            navLabelsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
            navLabelsRecyclerView.setAdapter(labelsAdapter);
        }

        // כפתור הוספת לייבל חדש
        ImageButton addLabelButton = navigationView.findViewById(R.id.button_add_label);
        if (addLabelButton != null) {
            addLabelButton.setOnClickListener(v -> addNewMockLabel());
        }


        // ================== 4. הגדרת המאזינים (Observers) המרכזיים ==================

        // --- מאזין לתוצאות קריאת ה-API של הלייבלים ---
        labelViewModel.getLabelsApiResult().observe(this, result -> {
            if (result instanceof Result.Success) {
                // הצלחה! קבלנו רשימה של לייבלים מהשרת
                List<Label> apiLabels = ((Result.Success<List<Label>>) result).getData();
                // עדכן את המתאם עם הנתונים החדשים שהגיעו
                labelsAdapter.setLabels(apiLabels);
            } else if (result instanceof Result.Error) {
                // שגיאה מהשרת או מהרשת
                Exception error = ((Result.Error) result).getError();
                Toast.makeText(this, "Error loading labels: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        // --- מאזין ללחיצות על הלייבלים ---
        labelViewModel.getSelectedLabelId().observe(this, labelId -> {
            if (labelId == null) return;

            drawer.closeDrawers();
            Toast.makeText(this, "Loading mails for label: " + labelId, Toast.LENGTH_SHORT).show();
            mailViewModel.fetchMailsByLabel(labelId);
        });

        // --- מאזין לפרטי המשתמש ---
        userViewModel.getUserProfile().observe(this, result -> {
            if (result instanceof Result.Success) {
                User user = ((Result.Success<User>) result).getData();
                Log.i("InboxActivity", "User profile loaded: " + user.getDisplayName());
                // בעתיד: עדכן את ה-Header עם פרטי המשתמש
            } else if (result instanceof Result.Error) {
                Toast.makeText(this, ((Result.Error) result).getError().getMessage(), Toast.LENGTH_SHORT).show();
            }
        });


        // ================== 5. טעינת נתונים ראשונית ==================
        userViewModel.fetchCurrentUserProfile();
        labelViewModel.fetchLabelsFromApi(); // <-- הפעלת טעינת הלייבלים מהשרת
    }

    // הפונקציה toLabel שהייתה לך אינה נחוצה יותר כאן, כי אנחנו לא ממירים מ-Entity
    // אבל פונקציית addNewMockLabel עדיין יכולה להישאר אם את רוצה להוסיף לייבלים מקומית
    private void addNewMockLabel() {
        //... הלוגיקה של הוספת לייבל נשארת כמו שהיא
    }

    // --- שאר המתודות שלך (onCreateOptionsMenu, onSupportNavigateUp, וכו') נשארות כמו שהן ---
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // ...
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        // ...
        return super.onSupportNavigateUp();
    }

    private void setupNavigationListener() {
        // ...
    }
    }