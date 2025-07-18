package com.example.androidapp.ui.registration;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.example.androidapp.R;

/**
 * RegistrationActivity hosts the registration flow using multiple fragments.
 * It uses a NavHostFragment and navigation graph to switch between steps
 * like name input, birthday, gender, etc.
 */
public class RegistrationActivity extends AppCompatActivity {

    private AppBarConfiguration appBarConfiguration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);  // נטען את ה-NavHostFragment מה-XML
    }

    @Override
    public boolean onSupportNavigateUp() {
        // Enables navigation when the Up button is pressed (optional)
        NavHostFragment navHostFragment = (NavHostFragment)
                getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_content_registration);
        if (navHostFragment != null) {
            return navHostFragment.getNavController().navigateUp() || super.onSupportNavigateUp();
        }
        return super.onSupportNavigateUp();
    }
}