package com.example.androidapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {
    private AppDB db;
    private UserDao userDao;
    private SharedPreferences prefs;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

//        // Get the Token
//        prefs = getSharedPreferences("auth", MODE_PRIVATE);
//        String token = prefs.getString("jwt_token", null);
//
//        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "UsersDB")
//                .allowMainThreadQueries() //אומר לו לרוץ התרד הרגיל- ישתנה כנראה
//                .build();
//        userDao = db.userDao();
//        User user = userDao.get

        // יוצר את החלק של הלמעלה- לשקול למחוק או להעביר מפה
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // מעבר אוטומטי ל-MainActivity2
        Intent intent = new Intent(this, InboxActivity.class);
//        Intent intent = new Intent(this, LoginActivity.class);

        startActivity(intent);
        finish();
    }
}