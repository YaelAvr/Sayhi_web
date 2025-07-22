package com.example.androidapp.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.androidapp.InboxActivity;
import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.databinding.ActivityLoginBinding;
import com.example.androidapp.ui.registration.RegistrationActivity;


public class LoginActivity extends AppCompatActivity {
//    private MutableLiveData<Result<RegisteredUserView>> loginResult = new MutableLiveData<>();

    private LoginViewModel loginViewModel;
    private ActivityLoginBinding binding;

    private EditText edForm;
    private Button nextBtn;
    private Button backBtn;
    private TextView statusText;
    private TextView title;
    private TextView explainText;
    private boolean isPasswordMode = false;
    private String m_username;
    private ProgressBar loadingProgressBar;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Inflate the layout using View Binding
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        // Set the root of the binding as the content view
        setContentView(binding.getRoot());

        title=binding.formTitle;
        explainText= binding.formDescriptionText;

        nextBtn = binding.loginNextBtn;
        backBtn = binding.loginBackBtn;
        edForm = binding.liInput;
        loadingProgressBar = binding.loading;

        updateUiToGetUsername();


        loginViewModel = new LoginViewModel(this);
        loginViewModel.getAllUsers();

        loginViewModel.getUserResult().observe(this, result -> {
            Log.i("errorType", "result on click " + result);
            loadingProgressBar.setVisibility(View.INVISIBLE);
            if (result instanceof Result.Success) {
                RegisteredUser user = ((Result.Success<RegisteredUser>) result).getData();
                Log.i("getUserResult", "result on click " + user);

                updateUiWithUser(user);
            } else if (result instanceof Result.Error) {
                Exception e = ((Result.Error) result).getError();
                edForm.setError(e.getMessage());
            }
        });

        loginViewModel.getLoginResult().observe(this, result -> {
            Log.i("getLoginResult", " getLoginResult result on click o" + result);
            loadingProgressBar.setVisibility(View.INVISIBLE);
            if (result instanceof Result.Success) {
                String token = ((Result.Success<String>) result).getData();

                // go to registration page
                Intent intent = new Intent(LoginActivity.this, InboxActivity.class);
                startActivity(intent);
            } else if (result instanceof Result.Error) {
                Exception e = ((Result.Error) result).getError();
                edForm.setError(e.getMessage());
            }
        });


        nextBtn.setOnClickListener(v -> {
            Log.i("nextBtnClick", "isPasswordMode on click " + isPasswordMode);

            if (isPasswordMode){
                loadingProgressBar.setVisibility(View.VISIBLE);
                String password = edForm.getText().toString();

                loginViewModel.login(m_username, password);

            } else if(!edForm.getText().toString().isEmpty()) {
                String username = edForm.getText().toString();

                loginViewModel.verifySignedUsername(username);
            } else {
                edForm.setError("Username is required");
            }
        });

        backBtn.setOnClickListener(v -> {
            if (isPasswordMode){
                // go back to enter username part
                updateUiToGetUsername();

            } else {
                // go to registration page
                Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
                startActivity(intent);

            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();
        // This will be called every time the activity comes to the foreground.
        loginViewModel.getAllUsers();
    }

    private void updateUiWithUser(RegisteredUser user) {
        isPasswordMode=true;
        m_username = user.getUserName();
        Log.i("updateUiWithUser", "m_username: " +m_username );

        title.setText("Hi "+user.getDisplayName());
        explainText.setText(getString(R.string.app_sig,user.getUserName()));
        edForm.setText("");
        edForm.setHint(R.string.login_password_hint);
        edForm.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        backBtn.setText(R.string.backBtn);
    }

    private void updateUiToGetUsername() {
        isPasswordMode=false;
        title.setText(R.string.action_sign_in_short);
        explainText.setText("to continue to your SayHi account");
        edForm.setText("");
        edForm.setHint(R.string.login_email_hint);
        edForm.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
        backBtn.setText(R.string.create_an_account_btn);
    }
}