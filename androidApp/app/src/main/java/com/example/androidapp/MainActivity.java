package com.example.androidapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {
    private AppDB db;
    private UserDao userDao;
    private TokenManager tokenManager;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);


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

        // Instantiate your TokenManager
        tokenManager = new TokenManager(this);

        // Check if a token exists
        if (tokenManager.getToken() == null) {
            // No token found, user is not logged in.
            // TO-DO: Redirect to Home page/ make this home page
        } else {
            // User is logged in, proceed to load profile data.
            // You can even get the token if needed.
            String currentToken = tokenManager.getToken();
            Log.d("ProfileActivity", "Current user token: " + currentToken);
        }

        // מעבר אוטומטי ל-MainActivity2
//        Intent intent = new Intent(this, MainActivity2.class);
        Intent intent = new Intent(this, LoginActivity.class);

        startActivity(intent);
        finish();
    }
}