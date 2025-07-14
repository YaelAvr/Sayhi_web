package com.example.androidapp.data.db;

import androidx.room.Database;
import androidx.room.RoomDatabase;

import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.User;

@Database(entities = { User.class}, version = 1)
public abstract class AppDB  extends RoomDatabase {
    public abstract UserDao userDao();
}
