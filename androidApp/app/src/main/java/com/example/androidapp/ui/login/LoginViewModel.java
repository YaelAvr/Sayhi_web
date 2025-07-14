package com.example.androidapp.ui.login;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.repository.UserRepository;

public class LoginViewModel extends ViewModel {


    private final MutableLiveData<Result<RegisteredUserView>> userResult = new MutableLiveData<>();
    private final UserRepository repository;

    public LoginViewModel(Context context) {
        repository = new UserRepository(context);
    }

    public LiveData<Result<RegisteredUserView>> getUserResult() {
        return userResult;
    }

    public void verifySignedUsername(String username) {
        repository.verifySignedUsername(username, userResult);
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

    // A placeholder username validation check
    private boolean isUserNameValid(String username) {
        // TO-DO: add API call
        return true;
//        if (username == null) {
//            return false;
//        }
//        if (username.contains("@")) {
//            return Patterns.EMAIL_ADDRESS.matcher(username).matches();
//        } else {
//            return !username.trim().isEmpty();
//        }
    }

    // A placeholder password validation check
    private boolean isPasswordValid(String password) {
        // TO-DO: add API call
        return true;

//        return password != null && password.trim().length() > 5;
    }*/
}