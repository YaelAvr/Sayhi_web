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


        // ================== 2. הגדרת הניווט הראשי ==================
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
            // יוצרים את ה-Adapter פעם אחת ומעבירים לו את ה-ViewModel
            labelsAdapter = new LabelsAdapter(labelViewModel);
            navLabelsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
            navLabelsRecyclerView.setAdapter(labelsAdapter);
        }

        ImageButton addLabelButton = navigationView.findViewById(R.id.button_add_label);
        if (addLabelButton != null) {
            addLabelButton.setOnClickListener(v -> addNewLabel());
        }


        // ================== 4. הגדרת המאזינים (Observers) המרכזיים ==================

        // --- מאזין לתוצאות קריאת ה-API של הלייבלים ---
        labelViewModel.getLabelsApiResult().observe(this, result -> {
            if (result instanceof Result.Success) {
                List<Label> apiLabels = ((Result.Success<List<Label>>) result).getData();
                labelsAdapter.setLabels(apiLabels);
            } else if (result instanceof Result.Error) {
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
                // כאן תוכלי לעדכן את ה-Header בתפריט עם פרטי המשתמש
            } else if (result instanceof Result.Error) {
                Toast.makeText(this, ((Result.Error) result).getError().getMessage(), Toast.LENGTH_SHORT).show();
            }
        });


        // ================== 5. טעינת נתונים ראשונית ==================
        userViewModel.fetchCurrentUserProfile();
        labelViewModel.fetchLabelsFromApi();
    }

    /**
     * פותח דיאלוג להוספת לייבל חדש.
     * בעתיד, צריך לחבר את זה לקריאת API שיוצרת לייבל חדש בשרת.
     */
    private void addNewLabel() {
        final EditText input = new EditText(this);
        new AlertDialog.Builder(this)
                .setTitle("Add New Label")
                .setView(input)
                .setPositiveButton("Add", (dialog, which) -> {
                    String labelName = input.getText().toString().trim();
                    if (!labelName.isEmpty()) {
                        // בעתיד: labelViewModel.createNewLabel(labelName);
                        Toast.makeText(this, "Label '" + labelName + "' added (locally for now).", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Cancel", null)
                .show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_activity2, menu);
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration) || super.onSupportNavigateUp();
    }

    private void setupNavigationListener() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        navController.addOnDestinationChangedListener((controller, destination, arguments) -> {
            boolean isFullScreen = destination.getId() == R.id.editNewMailFragment || destination.getId() == R.id.singleMailFragment;
            if (isFullScreen) {
                if (getSupportActionBar() != null) getSupportActionBar().hide();
                if (binding.appBarMain.fab != null) binding.appBarMain.fab.hide();
            } else {
                if (getSupportActionBar() != null) getSupportActionBar().show();
                if (binding.appBarMain.fab != null) binding.appBarMain.fab.show();
            }
        });
    }
}