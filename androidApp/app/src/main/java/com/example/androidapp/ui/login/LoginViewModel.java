package com.example.androidapp.ui.login;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.repository.UserRepository;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LoginViewModel extends ViewModel {

    private MediatorLiveData<Result<String>> loginResult = new MediatorLiveData<>();
    private final MutableLiveData<Result<RegisteredUser>> userResult = new MutableLiveData<>();
    private final UserRepository repository;
    private final TokenManager tokenManager;

    public LoginViewModel(Context context) {
        repository = new UserRepository(context);
        tokenManager = new TokenManager(context);
    }

    public LiveData<Result<RegisteredUser>> getUserResult() {
        return userResult;
    }
    public LiveData<Result<String>> getLoginResult() {
        return loginResult;
    }

    public void verifySignedUsername(String username) {
        String finalString = username.toLowerCase();
        // TO-DO: add API call

        if (finalString == null) {
            userResult.postValue(new Result.Error(new Exception("Username is required")));
        }
        if (finalString.contains("@")) {
            // valid username pattern: "username@sayhi.com"
            Pattern pattern = Pattern.compile("^([a-zA-Z0-9._-]+)@sayhi\\.com$", Pattern.CASE_INSENSITIVE);
            Matcher matcher = pattern.matcher(finalString.trim());

            if (matcher.matches()) {
                finalString = matcher.group(1);
//                Log.d("USERNAME", "Username is: " + username);
            } else {
                userResult.postValue(new Result.Error(new Exception("Invalid Username")));

            }

        }
//        return verifySignedUsername(finalString);
        repository.verifySignedUsername(finalString, userResult);
    }

    public void login(String username, String password) {
        // Call the repository to get the temporary LiveData source.
        final LiveData<Result<String>> source = repository.login(username, password);

        // Add the temporary LiveData as a source to our main loginResult.
        loginResult.addSource(source, result -> {
            if (result instanceof Result.Success) {
                // If login is successful, tell the TokenManager to save the token.
                String token = ((Result.Success<String>) result).getData();
                Log.i("LoginViewModel", "Login successful. Saving token.");
                tokenManager.saveToken(token);
            }

            // Update the UI with the final result (success or error)
            loginResult.setValue(result);

            // Clean up the source to prevent this observer from firing again
            loginResult.removeSource(source);
        });


        // can be launched in a separate asynchronous job
//         repository.login(username, password,loginResult);
//        MutableLiveData<Result<String>> result = repository.login(username, password,loginResult);
//
//        if (result.getValue() instanceof Result.Success) {
//            String data = ((Result.Success<String>) result.getValue()).getData();
//            loginResult.setValue(new Result.Success<>(new LoginResult(data)));
//        } else {
//            loginResult.setValue(result.getValue());
//        }

    }
    public void loginDataChanged(String username, String password) {
//        if (!isUserNameValid(username)) {
//            loginFormState.setValue(new LoginFormState(R.string.invalid_username, null));
//        } else if (!isPasswordValid(password)) {
//            loginFormState.setValue(new LoginFormState(null, R.string.invalid_password));
//        } else {
//            loginFormState.setValue(new LoginFormState(true));
//        }
    }

    public void getAllUsers() {repository.getAllUsers();}

    public void reload(){
        repository.reload();
    }

/*
    private MutableLiveData<LoginFormState> loginFormState = new MutableLiveData<>();
    private MutableLiveData<LoginResult> loginResult = new MutableLiveData<>();
    private LoginRepository loginRepository;
    private UserRepository userRepository;


//    LoginViewModel(LoginRepository loginRepository) {
//        this.loginRepository = loginRepository;
//    }
    LoginViewModel(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    LiveData<LoginFormState> getLoginFormState() {
        return loginFormState;
    }

    LiveData<LoginResult> getLoginResult() {
        return loginResult;
    }

    public void login(String username, String password) {
        // can be launched in a separate asynchronous job
        Result<User> result = loginRepository.login(username, password);

        if (result instanceof Result.Success) {
            User data = ((Result.Success<User>) result).getData();
            loginResult.setValue(new LoginResult(new RegisteredUserView(data.getDisplayName())));
        } else {
            loginResult.setValue(new LoginResult(R.string.login_failed));
        }
    }
//    public void enterUsername


    public void loginDataChanged(String username, String password) {
        if (!isUserNameValid(username)) {
            loginFormState.setValue(new LoginFormState(R.string.invalid_username, null));
        } else if (!isPasswordValid(password)) {
            loginFormState.setValue(new LoginFormState(null, R.string.invalid_password));
        } else {
            loginFormState.setValue(new LoginFormState(true));
        }
    }
*/


    // A placeholder password validation check
    private boolean isPasswordValid(String password) {
        // TO-DO: add API call
        return true;

//        return password != null && password.trim().length() > 5;
    }
}