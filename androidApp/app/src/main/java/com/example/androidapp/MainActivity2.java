package com.example.androidapp;

import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.databinding.ActivityMain2Binding;
import com.example.androidapp.ui.gallery.LabelsAdapter;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity2 extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMain2Binding binding;

    private LabelsAdapter labelsAdapter;
    private RecyclerView navLabelsRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMain2Binding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.appBarMain.toolbar);

//        binding.appBarMain.fab.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
//                        .setAction("Action", null).show();
//            }
//        });

        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;

        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow)
                .setOpenableLayout(drawer)
                .build();

        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);

        TextView navHomeButton = navigationView.findViewById(R.id.nav_home_button);
        if (navHomeButton != null) {
            navHomeButton.setOnClickListener(v -> {
                navController.navigate(R.id.nav_home);
                drawer.closeDrawers();
            });
        }

        navLabelsRecyclerView = navigationView.findViewById(R.id.nav_labels_recycler_view);
        if (navLabelsRecyclerView != null) {
            labelsAdapter = new LabelsAdapter();
            navLabelsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
            navLabelsRecyclerView.setAdapter(labelsAdapter);
            fetchLabelsForNav();
        }

        // מציאת כפתור הוספת הלייבל והגדרת לחיצה עליו
        ImageButton addLabelButton = navigationView.findViewById(R.id.button_add_label);
        if (addLabelButton != null) {
            addLabelButton.setOnClickListener(v -> {
                addNewMockLabel(); // קריאה לפונקציה חדשה
            });
        }
        setupNavigationListener();
    }

    private void fetchLabelsForNav() {
        List<Label> mockLabels = new ArrayList<>();

        Label label1 = new Label();
        label1.setId("1");
        label1.setName("inbox");
        mockLabels.add(label1);

        Label label2 = new Label();
        label2.setId("2");
        label2.setName("starred");
        mockLabels.add(label2);

        Label label3 = new Label();
        label3.setId("3");
        label3.setName("drafts");
        mockLabels.add(label3);

        Label label4 = new Label();
        label4.setId("4");
        label4.setName("spam");
        mockLabels.add(label4);

        Label label5 = new Label();
        label5.setId("5");
        label5.setName("sent");
        mockLabels.add(label5);

        labelsAdapter.setLabels(mockLabels);
        Toast.makeText(this, R.string.toast_displaying_mock_data, Toast.LENGTH_SHORT).show();
    }

    private void fetchLabelsForNavvvvvvv() {
        // 1. יצירת מופע של TokenManager
        TokenManager tokenManager = new TokenManager(this);

        // 2. קריאת הטוקן מה-SharedPreferences
        String token = tokenManager.getToken();

        // 3. בדיקה אם קיים טוקן (מקביל ל- `if (!token)` ב-React)
        if (token == null) {
            // המשתמש לא מחובר. צריך להעביר אותו למסך הלוגין.
            // לדוגמה:
            // Intent intent = new Intent(this, LoginActivity.class);
            // startActivity(intent);
            // finish(); // סוגר את ה-Activity הנוכחי
            Toast.makeText(this, "User not logged in", Toast.LENGTH_LONG).show();
            return; // עוצרים את הפונקציה
        }

        // 4. אם יש טוקן, נשלח אותו בבקשה
        String authToken = "Bearer " + token;

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
        Call<List<Label>> call = apiService.getLabels(authToken);

        call.enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(Call<List<Label>> call, Response<List<Label>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    labelsAdapter.setLabels(response.body());
                } else {
                    // יכול להיות שהטוקן פג תוקף
                    Toast.makeText(MainActivity2.this, "Failed to load labels: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Label>> call, Throwable t) {
                Toast.makeText(MainActivity2.this, "Network Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }


    private void fetchLabelsForNavwithHardCoded() {
        // --- נשתול כאן טוקן קבוע לבדיקות ---
        // 1. השג טוקן תקין מהשרת שלך (למשל, דרך Postman או מהאפליקציה הקיימת ב-React).
        // 2. הדבק אותו כאן.
        String hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // <--- הדבק כאן את הטוקן האמיתי שלך

        // 3. אין צורך לבדוק אם הטוקן קיים, כי אנחנו יודעים שהוא שם.
        String authToken = "Bearer " + hardcodedToken;

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
        Call<List<Label>> call = apiService.getLabels(authToken);

        call.enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(Call<List<Label>> call, Response<List<Label>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    // הצלחה! הנתונים מהשרת יוצגו
                    labelsAdapter.setLabels(response.body());
                    Toast.makeText(MainActivity2.this, "Labels loaded from API!", Toast.LENGTH_SHORT).show();
                } else {
                    // שגיאה מהשרת (אולי הטוקן ששתלת לא תקין או פג תוקף)
                    Toast.makeText(MainActivity2.this, "API Error: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Label>> call, Throwable t) {
                // שגיאת רשת
                Toast.makeText(MainActivity2.this, "Network Failure: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }



    // ======================= תחילת פונקציה חדשה =======================
    private void addNewMockLabel() {
        // 1. "ניפוח" (Inflate) של קובץ ה-Layout שיצרנו
        View dialogView = getLayoutInflater().inflate(R.layout.dialog_add_label, null);
        final EditText inputLabelName = dialogView.findViewById(R.id.input_label_name);

        // 2. יצירת ה-AlertDialog וקישור ה-View שלנו אליו
        new AlertDialog.Builder(this)
                .setTitle(R.string.dialog_title_add_new_label)
                .setView(dialogView) // <-- כאן אנחנו משתמשים ב-Layout מה-XML
                .setPositiveButton(R.string.dialog_button_add, (dialog, which) -> {
                    String labelName = inputLabelName.getText().toString().trim();

                    if (!labelName.isEmpty()) {
                        Label newLabel = new Label();
                        newLabel.setId("local_" + System.currentTimeMillis());
                        newLabel.setName(labelName);

                        if (labelsAdapter != null) {
                            labelsAdapter.addLabel(newLabel);
                            if (navLabelsRecyclerView != null) {
                                navLabelsRecyclerView.scrollToPosition(labelsAdapter.getItemCount() - 1);
                            }
                        }
                        Toast.makeText(this, getString(R.string.toast_label_added, labelName), Toast.LENGTH_SHORT).show();
                    } else {
                        Toast.makeText(this, R.string.toast_label_name_cannot_be_empty, Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton(R.string.dialog_button_cancel, null) // null פשוט יסגור את הדיאלוג
                .show();
    }
    // ======================= סוף פונקציה חדשה =======================

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_activity2, menu);
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }

    // hide the toolbar when create mail window is open
    public void hideMainToolbar() {
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
    }

    public void showMainToolbar() {
        if (getSupportActionBar() != null) {
            getSupportActionBar().show();
        }
    }

    // hide the envelope button when create mail window is open
    public void hideFloatingActionButton() {
        if (binding.appBarMain.fab != null) {
            binding.appBarMain.fab.hide();
        }
    }

    public void showFloatingActionButton() {
        if (binding.appBarMain.fab != null) {
            binding.appBarMain.fab.show();
        }
    }

    private void setupNavigationListener() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);

        navController.addOnDestinationChangedListener((controller, destination, arguments) -> {
            // המאזין הזה יופעל בכל פעם שהמשתמש מנווט למסך חדש.
            // 'destination' הוא היעד החדש.

            // עכשיו נבדוק מהו היעד ונקבע את נראות הרכיבים.
            if (destination.getId() == R.id.editNewMailFragment) {
                // אם הגענו למסך כתיבת המייל, הסתר הכל.
                hideMainToolbar();
                hideFloatingActionButton();
            } else {
                // בכל מסך אחר, הצג הכל.
                showMainToolbar();
                showFloatingActionButton();
            }
        });
    }

}