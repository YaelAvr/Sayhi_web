package com.example.androidapp.ui.loggedInUser;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.JwtDecoder;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.model.User;
import com.example.androidapp.data.repository.UserRepository;

public class LoggedInUserViewModel  extends ViewModel {
    // Fields for this ViewModel's specific responsibilities
    private final UserRepository repository;
    private final TokenManager tokenManager;
    private final JwtDecoder jwtDecoder;

    private final MediatorLiveData<Result<User>> userProfile = new MediatorLiveData<>();

    public LoggedInUserViewModel(Context context) {
        this.repository = new UserRepository(context);
        // Instantiate the reusable auth tools
        this.tokenManager = new TokenManager(context);
        this.jwtDecoder = new JwtDecoder();
    }

    public LiveData<Result<User>> getUserProfile() {
        return userProfile;
    }

    // This is the action method the Activity will call
    public void fetchCurrentUserProfile() {
        // 1. Get the raw token string from storage
        String token = tokenManager.getToken();
        if (token == null) {
            userProfile.setValue(new Result.Error(new Exception("User is not logged in.")));
            return;
        }

        // 2. Decode the token to get the user's ID
        String userId = jwtDecoder.getUserId(token);
        if (userId == null) {
            userProfile.setValue(new Result.Error(new Exception("Invalid token.")));
            return;
        }

        Log.i("ProfileViewModel", "Fetching profile for user ID: " + userId);

        // 3. Call the repository with the ID and observe the result
        final LiveData<Result<User>> source = repository.getUserById(userId);
        userProfile.addSource(source, result -> {
            userProfile.setValue(result);
            userProfile.removeSource(source);
        });
    }
}
