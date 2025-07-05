package com.example.androidapp.ui.login;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

import com.example.androidapp.R;
import com.example.androidapp.databinding.ActivityLoginBinding;

public class LoginActivity extends AppCompatActivity {

    private LoginViewModel loginViewModel;
    private ActivityLoginBinding binding;

    private EditText edForm;
    private Button nextBtn;
    private Button backBtn;
    private TextView statusText;
    private TextView title;
    private TextView explainText;
    private boolean isPasswordMode = false;
    private String username;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Inflate the layout using View Binding
        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        // Set the root of the binding as the content view
        setContentView(binding.getRoot());

        // Now, access your views directly from the binding object.
        // The names are automatically converted from snake_case to camelCase.
        // This is null-safe. If the ID doesn't exist, your project won't even build.
        title=binding.formTitle;
        explainText= binding.formDescriptionText;
        title.setText("Sign in");
        explainText.setText("to continue to your SayHi account");

        nextBtn = binding.loginNextBtn;
        backBtn = binding.loginBackBtn;
        edForm = binding.liInput;

        nextBtn.setOnClickListener(v -> {
            if (isPasswordMode){
                // TO--DO: api call to token and move to inbox
            } else if(!edForm.getText().toString().isEmpty()) {
                isPasswordMode=true;

                title.setText("Hi "); //TO-DO: add "+ display name" that return from API
                explainText.setText(edForm.getText().toString() + "@sayhi.com"); // TO-DO: replace with API username
                edForm.setText("");
                edForm.setHint(R.string.login_password_hint);
                backBtn.setText(R.string.backBtn);
            } else {
                runOnUiThread(() -> Toast.makeText(this, "Username is required", Toast.LENGTH_SHORT).show());
            }
        });

        backBtn.setOnClickListener(v -> {
            if (isPasswordMode){
                isPasswordMode=false;
                title.setText("Sign in");
                explainText.setText("to continue to your SayHi account");
                edForm.setText("");
                edForm.setHint(R.string.login_email_hint);
                backBtn.setText(R.string.create_an_account_btn);
            } else {
                // TO--DO: move to register

            }
        });

        /* setContentView(R.layout.activity_login);

        TextView title = findViewById(R.id.form_title);
        if (title == null) {
            Log.e("DEBUG", "form_title is NULL!");
        } else {
            title.setText("Sign in");
        }
//        title.setText("Sign in");
        TextView text = findViewById(R.id.form_description_text);
//        text.setText("to continue to your SayHi account");

        if (text == null) {
            Log.e("DEBUG", "form_description_text is NULL!");
        } else {
            text.setText("to continue to your SayHi account");
        }*/


//        binding = ActivityLoginBinding.inflate(getLayoutInflater());
//        setContentView(binding.getRoot());
//
//        loginViewModel = new ViewModelProvider(this, new LoginViewModelFactory())
//                .get(LoginViewModel.class);
//
//        final EditText usernameEditText = binding.liUsername;
////        final EditText passwordEditText = binding.password;
//        final Button loginButton = binding.login;
//        final ProgressBar loadingProgressBar = binding.loading;
//
//        loginViewModel.getLoginFormState().observe(this, new Observer<LoginFormState>() {
//            @Override
//            public void onChanged(@Nullable LoginFormState loginFormState) {
//                if (loginFormState == null) {
//                    return;
//                }
//                loginButton.setEnabled(loginFormState.isDataValid());
//                if (loginFormState.getUsernameError() != null) {
//                    usernameEditText.setError(getString(loginFormState.getUsernameError()));
//                }
////                if (loginFormState.getPasswordError() != null) {
////                    passwordEditText.setError(getString(loginFormState.getPasswordError()));
////                }
//            }
//        });
//
//        loginViewModel.getLoginResult().observe(this, new Observer<LoginResult>() {
//            @Override
//            public void onChanged(@Nullable LoginResult loginResult) {
//                if (loginResult == null) {
//                    return;
//                }
//                loadingProgressBar.setVisibility(View.GONE);
//                if (loginResult.getError() != null) {
//                    showLoginFailed(loginResult.getError());
//                }
//                if (loginResult.getSuccess() != null) {
//                    updateUiWithUser(loginResult.getSuccess());
//                }
//                setResult(Activity.RESULT_OK);
//
//                //Complete and destroy login activity once successful
//                finish();
//            }
//        });
//
//        TextWatcher afterTextChangedListener = new TextWatcher() {
//            @Override
//            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
//                // ignore
//            }
//
//            @Override
//            public void onTextChanged(CharSequence s, int start, int before, int count) {
//                // ignore
//            }
//
//            @Override
//            public void afterTextChanged(Editable s) {
////                loginViewModel.loginDataChanged(usernameEditText.getText().toString()
////                        , passwordEditText.getText().toString());
//            }
//        };
//        usernameEditText.addTextChangedListener(afterTextChangedListener);
////        passwordEditText.addTextChangedListener(afterTextChangedListener);
////        passwordEditText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
////
////            @Override
////            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
//////                if (actionId == EditorInfo.IME_ACTION_DONE) {
//////                    loginViewModel.login(usernameEditText.getText().toString(),
//////                            passwordEditText.getText().toString());
//////                }
//////                return false;
////            }
////        });
//
//        loginButton.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                loadingProgressBar.setVisibility(View.VISIBLE);
////                loginViewModel.login(usernameEditText.getText().toString(),
////                        passwordEditText.getText().toString());
//            }
//        });
    }

    private void updateUiWithUser(LoggedInUserView model) {
//        String welcome = getString(R.string.welcome) + model.getDisplayName();
//        // TODO : initiate successful logged in experience
//        Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
    }

    private void showLoginFailed(@StringRes Integer errorString) {
        Toast.makeText(getApplicationContext(), errorString, Toast.LENGTH_SHORT).show();
    }
}