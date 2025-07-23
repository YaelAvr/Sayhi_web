package com.example.androidapp.data.WebApi;

import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.model.Registration.PasswordRequest;
import com.example.androidapp.data.model.Registration.PasswordResponse;
import com.example.androidapp.data.model.Registration.UsernameRequest;
import com.example.androidapp.data.model.Registration.UsernameResponse;
import com.example.androidapp.data.model.User;
import com.example.androidapp.ui.login.RegisteredUserView;
import com.example.androidapp.data.model.Registration.DisplayNameRequest;
import com.example.androidapp.data.model.Registration.DisplayNameResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface UserServicesAPI {
    @GET("users/{id}")
    Call<User> getUser(@Path("id") String userId);

    @GET("users/all")
    Call<List<RegisteredUser>> getAllUsers();

    @POST("users")
    Call<User> createUser(@Body User newUser);

    @GET("users/validation/{username}")
    Call<RegisteredUserView> verifySignedUsername(@Path("username") String username);

    //sign in
    @POST("users/displayName")
    Call<DisplayNameResponse> validateDisplayName(@Body DisplayNameRequest request);

    @POST("users/userName")
    Call<UsernameResponse> validateUserName(@Body UsernameRequest request);

    @POST("users/password")
    Call<PasswordResponse> validatePassword(@Body PasswordRequest request);
}
