package com.example.androidapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
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

import com.bumptech.glide.Glide;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.SessionExpiredException;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.model.User;
import com.example.androidapp.databinding.ActivityMain2Binding;
import com.example.androidapp.model.Label;
import com.example.androidapp.ui.gallery.LabelViewModel;
import com.example.androidapp.ui.gallery.LabelsAdapter;
import com.example.androidapp.ui.home.MailViewModel;
import com.example.androidapp.ui.landingPage.LandingPageActivity;
import com.example.androidapp.ui.loggedInUser.LoggedInUserViewModel;
import com.google.android.material.navigation.NavigationView;

import java.util.List;

public class InboxActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMain2Binding binding;
    private TokenManager tokenManager;

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


        tokenManager = new TokenManager(this);

        // ================== 1. אתחול כל ה-ViewModels ==================
        labelViewModel = new ViewModelProvider(this).get(LabelViewModel.class);
        mailViewModel = new ViewModelProvider(this).get(MailViewModel.class);
        userViewModel = new LoggedInUserViewModel(this);

        userViewModel.getUserProfile().observe(this, result -> {
            if (result instanceof Result.Success) {
                User user = ((Result.Success<User>) result).getData();
                Log.i("getUserResult", "user display name:  " + user.getDisplayName());

            } else if (result instanceof Result.Error) {
                Exception e = ((Result.Error) result).getError();

            }
        });

       // ================== 2. הגדרת הניווט הראשי ==================
        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;

        // הגדרת היעדים העליונים בתפריט (רק nav_home כרגע)
        mAppBarConfiguration = new AppBarConfiguration.Builder(R.id.nav_home)
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

        ImageButton addLabelButton = navigationView.findViewById(R.id.button_add_label);
        if (addLabelButton != null) {
            addLabelButton.setOnClickListener(v -> addNewLabel());
        }



        // ================== 4. הגדרת המאזינים (Observers) המרכזיים ==================

        labelViewModel.getLabelsApiResult().observe(this, result -> {
            if (result instanceof Result.Success) {
                List<Label> apiLabels = ((Result.Success<List<Label>>) result).getData();
                labelsAdapter.setLabels(apiLabels);
            } else if (result instanceof Result.Error) {
                Exception error = ((Result.Error) result).getError();
                Toast.makeText(this, "Error loading labels: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        labelViewModel.getSelectedLabelName().observe(this, labelName -> { // <-- השתנה ל-getSelectedLabelName
            if (labelName == null) return;

            drawer.closeDrawers();
            Toast.makeText(this, "Loading mails for label: " + labelName, Toast.LENGTH_SHORT).show();

            // קוראים למתודה עם שם הלייבל, כפי שהשרת מצפה
            mailViewModel.fetchMailsByLabel(labelName);
        });

         userViewModel.getUserProfile().observe(this, result -> {
            if (result instanceof Result.Success) {
                User user = ((Result.Success<User>) result).getData();
                Log.i("getUserProfile", "user display name:  " + user.getDisplayName());
                updateNavHeader(user);

            } else if (result instanceof Result.Error) {
                Exception e = ((Result.Error) result).getError();

                // Check if the error is our special session exception
                if (e instanceof SessionExpiredException) {
                    // The token is invalid/expired. Handle the logout flow.
                    handleSessionExpired();
                } else {
                    // It's a different kind of error (e.g., no internet).
                    Toast.makeText(this, e.getMessage(), Toast.LENGTH_SHORT).show();
                }

            }
        });

        labelViewModel.getCreateLabelResult().observe(this, result -> {
            if (result instanceof Result.Success) {
                Label newLabel = ((Result.Success<Label>) result).getData();
                Toast.makeText(this, "Label '" + newLabel.getName() + "' created successfully!", Toast.LENGTH_SHORT).show();
                labelViewModel.fetchLabelsFromApi();
            } else if (result instanceof Result.Error) {
                Exception error = ((Result.Error) result).getError();
                Toast.makeText(this, "Failed to create label: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        // ================== 5. טעינת נתונים ראשונית ==================
        mailViewModel.fetchMailsByLabel("Inbox");

        userViewModel.fetchCurrentUserProfile();
        labelViewModel.fetchLabelsFromApi();
    }


//    @Override
//    protected void onResume() {
//        super.onResume();
//        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main); // התאימי ל-ID של NavHostFragment שלך
//
//        NavBackStackEntry currentBackStackEntry = navController.getCurrentBackStackEntry();
//
//        if (currentBackStackEntry != null) {
//            currentBackStackEntry.getSavedStateHandle()
//                    .getLiveData("shouldRefresh")
//                    .observe(this, shouldRefresh -> {
//                        if (Boolean.TRUE.equals(shouldRefresh)) {
//                            // הפעולה שתרצי לבצע אחרי החזרה
//                            mailViewModel.fetchMailsByLabel("Inbox");
////                            mailViewModel.fetchMailsByLabel("Draft");
//
//                            // remove in order to prevent second call
//                            currentBackStackEntry.getSavedStateHandle().remove("shouldRefresh");
//                        }
//                    });
//        }
//
//    }

    /**
     * A new method to handle the session expiration logic cleanly.
     */
    private void handleSessionExpired() {
        // Show a message to the user
        Toast.makeText(this, "Session expired. Please log in again.", Toast.LENGTH_LONG).show();

        // 1. Delete the invalid token from storage
        tokenManager.deleteToken();

        // 2. Create an intent to go back to the landing/login page
        Intent intent = new Intent(this, LandingPageActivity.class);

        // 3. Clear the activity stack so the user can't press "back" to get into the app
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

        // 4. Start the new activity
        startActivity(intent);

        // 5. Finish the current (InboxActivity)
        finish();
    }

    private void addNewLabel() {
        final EditText input = new EditText(this);
        new AlertDialog.Builder(this)
                .setTitle("Add New Label")
                .setView(input)
                .setPositiveButton("Add", (dialog, which) -> {
                    String labelName = input.getText().toString().trim();
                    if (!labelName.isEmpty()) {
                        labelViewModel.createLabel(labelName);
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

    private void updateNavHeader(User user) {
        NavigationView navigationView = binding.navView;
        TextView displayNameTextView = navigationView.findViewById(R.id.display_name_text);
        TextView emailTextView = navigationView.findViewById(R.id.username_text);
        ImageView profileImageView = navigationView.findViewById(R.id.profile_image);

        // בדיקה ראשונה: נוודא שאובייקט המשתמש אינו null
        if (user == null) {
            return;
        }

        // עדכון שדות הטקסט
        if (displayNameTextView != null) {
            displayNameTextView.setText(user.getDisplayName());
        }
        if (emailTextView != null) {
            String fullEmail = user.getUserName() + "@sayhi.com";
            emailTextView.setText(fullEmail);
        }

        // ================== קוד לטעינת התמונה ==================
        if (profileImageView != null) {
            String imageUrl = user.getPicture();
            Log.d("GlideDebug", "url of pic " + imageUrl);

            // בדיקה שנייה: נוודא שכתובת התמונה אינה null ואינה ריקה
            if (imageUrl != null && !imageUrl.isEmpty()) {
                // אם הכתובת תקינה, נבנה את הכתובת המלאה ונטען עם Glide
                String baseUrl = "http://10.0.2.2:3000"; // כתובת בסיס נקייה
                String fullImageUrl = baseUrl + "/" + imageUrl;

                Log.d("GlideDebug", "טוען תמונה מהכתובת: " + fullImageUrl);

                Glide.with(this)
                        .load(fullImageUrl)
                        .placeholder(R.drawable.ic_menu_camera) // תמונה זמנית
                        .error(R.drawable.ic_menu_camera)       // תמונה במקרה של שגיאה
                        .circleCrop()                           // חיתוך לעיגול
                        .into(profileImageView);                // הצגה ברכיב זה
            } else {
                // אם למשתמש אין כתובת תמונה, נציג את תמונת ברירת המחדל
                profileImageView.setImageResource(R.drawable.ic_menu_camera);
            }
        }
    }

    // Inside MainActivity.java

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // We use a switch statement to handle clicks on different menu items
        if(item.getItemId() ==  R.id.action_settings) {

            Toast.makeText(this, "Logout clicked", Toast.LENGTH_SHORT).show();
            handleSessionExpired();
                return true;
        }
        return super.onOptionsItemSelected(item);
//        switch (item.getItemId()) {
//            case R.id.action_settings:
//                // User chose the "Settings" item.
//                Toast.makeText(this, "Settings clicked", Toast.LENGTH_SHORT).show();
//                // TODO: Navigate to your SettingsFragment or SettingsActivity
//                return true;
//
//            case R.id.action_logout:
//                // User chose the "Logout" item.
//                Toast.makeText(this, "Logout clicked", Toast.LENGTH_SHORT).show();
//                // TODO: Add your user logout logic here
//                return true;
//
//            default:
//                // If we got here, the user's action was not recognized.
//                // Invoke the superclass to handle it.
//                return super.onOptionsItemSelected(item);
//        }
    }
}