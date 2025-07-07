package com.example.androidapp.data.WebApi;

import com.example.androidapp.MyApplication;
import com.example.androidapp.R;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.User;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserApi {
    private Retrofit retrofit;
    private UserServicesAPI userServiceAPI;
    private UserDao userDao;

    public UserApi(UserDao userDao) {
        this.userDao = userDao;

        String baseUrl = MyApplication.context.getString(R.string.BaseUrl);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userServiceAPI = retrofit.create(UserServicesAPI.class);

    }

    public Call<User> getUser(String id) {
        return userServiceAPI.getUser(id);
    }

    // TO-DO: add create user fundtion for register


}
