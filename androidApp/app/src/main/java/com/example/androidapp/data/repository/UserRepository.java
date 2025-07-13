package com.example.androidapp.data.repository;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.WebApi.UserApi;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.User;
import com.example.androidapp.ui.login.RegisteredUserView;

public class UserRepository {

    private UserDao userDao;
private UserApi userApi;
    public UserRepository(Context context) {
        AppDB db = Room.databaseBuilder(context, AppDB.class, "UsersDB")
                .allowMainThreadQueries() // כדאי להחליף ל-Async
                .build();
        this.userDao = db.userDao();
        this.userApi= new UserApi(context, userDao);
    }

    public User getUserById(String id) {
        return userDao.getUserById(id);
    }

    public void insertUser(User user) {
        userDao.insertUser(user);
    }

    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }

    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUserView>> loginResult ){
        userApi.verifySignedUsername(username, loginResult);
    }
}
