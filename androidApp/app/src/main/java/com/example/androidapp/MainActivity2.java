package com.example.androidapp;

import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.ImageButton; // <-- הוסף את ה-import הזה
import android.widget.TextView;
import android.widget.Toast;

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
import com.google.android.material.snackbar.Snackbar;

import java.util.ArrayList;
import java.util.List;

import android.text.InputType;
import android.widget.EditText;
import androidx.appcompat.app.AlertDialog;
import android.widget.FrameLayout;
import android.view.ViewGroup;
import android.widget.LinearLayout;

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

        binding.appBarMain.fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

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

        // ======================= תחילת קוד חדש =======================
        // מציאת כפתור הוספת הלייבל והגדרת לחיצה עליו
        ImageButton addLabelButton = navigationView.findViewById(R.id.button_add_label);
        if (addLabelButton != null) {
            addLabelButton.setOnClickListener(v -> {
                addNewMockLabel(); // קריאה לפונקציה חדשה
            });
        }
        // ======================= סוף קוד חדש =======================
    }

    private void fetchLabelsForNav() {
        List<Label> mockLabels = new ArrayList<>();

        Label label1 = new Label();
        label1.setId("1");
        label1.setName("Work");
        mockLabels.add(label1);

        Label label2 = new Label();
        label2.setId("2");
        label2.setName("Personal");
        mockLabels.add(label2);

        Label label3 = new Label();
        label3.setId("3");
        label3.setName("Groceries");
        mockLabels.add(label3);

        Label label4 = new Label();
        label4.setId("4");
        label4.setName("University");
        mockLabels.add(label4);

        Label label5 = new Label();
        label5.setId("5");
        label5.setName("Important");
        mockLabels.add(label5);

        labelsAdapter.setLabels(mockLabels);
        Toast.makeText(this, "Displaying mock data", Toast.LENGTH_SHORT).show();
    }

    // ======================= תחילת פונקציה חדשה =======================
    private void addNewMockLabel() {
        // 1. יצירת ה-AlertDialog Builder
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Add New Label");

        // 2. יצירת ה-EditText (שדה הקלט) עבור הדיאלוג
        final EditText input = new EditText(this);
        input.setInputType(InputType.TYPE_CLASS_TEXT);
        input.setHint("Enter label name");

        // הגדרת padding כדי שזה ייראה טוב
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT);
        input.setLayoutParams(lp);

        // הוספת ה-EditText לדיאלוג (עם קונטיינר כדי שיהיה padding)
        FrameLayout container = new FrameLayout(this);
        FrameLayout.LayoutParams params = new  FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.leftMargin = getResources().getDimensionPixelSize(R.dimen.dialog_margin);
        params.rightMargin = getResources().getDimensionPixelSize(R.dimen.dialog_margin);
        input.setLayoutParams(params);
        container.addView(input);
        builder.setView(container);

        // 3. הגדרת כפתור "אישור" (Add)
        builder.setPositiveButton("Add", (dialog, which) -> {
            String labelName = input.getText().toString().trim();

            // בדיקה שהמשתמש באמת הכניס טקסט
            if (!labelName.isEmpty()) {
                // יצירת אובייקט Label חדש
                Label newLabel = new Label();
                newLabel.setId("local_" + System.currentTimeMillis()); // ID מקומי זמני
                newLabel.setName(labelName);

                // הוספה ל-Adapter
                if (labelsAdapter != null) {
                    labelsAdapter.addLabel(newLabel);
                    if (navLabelsRecyclerView != null) {
                        navLabelsRecyclerView.scrollToPosition(labelsAdapter.getItemCount() - 1);
                    }
                }
                Toast.makeText(this, "Added: " + labelName, Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Label name cannot be empty", Toast.LENGTH_SHORT).show();
            }
        });

        // 4. הגדרת כפתור "ביטול" (Cancel)
        builder.setNegativeButton("Cancel", (dialog, which) -> dialog.cancel());

        // 5. הצגת הדיאלוג
        builder.show();
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

}