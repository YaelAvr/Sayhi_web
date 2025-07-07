package com.example.androidapp.data.repository;

import android.content.Context;

import androidx.room.Room;

import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.User;

public class UserRepository {

    private UserDao userDao;

    public UserRepository(Context context) {
        AppDB db = Room.databaseBuilder(context, AppDB.class, "UsersDB")
                .allowMainThreadQueries() // כדאי להחליף ל-Async
                .build();
        this.userDao = db.userDao();
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
}
