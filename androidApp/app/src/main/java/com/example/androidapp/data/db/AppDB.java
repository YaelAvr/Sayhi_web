package com.example.androidapp.data.db;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;
import androidx.room.TypeConverters;

import com.example.androidapp.data.dao.LabelDao;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.data.dao.RegisteredUserDao;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.LabelEntity;
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.model.User;

@Database(entities = {LabelEntity.class, User.class, MailEntity.class, RegisteredUser.class}, version = 4)
@TypeConverters({StringListConverter.class, DateConverter.class})
public abstract class AppDB extends RoomDatabase {

    private static volatile AppDB INSTANCE;
    public abstract RegisteredUserDao registeredUserDao();
    public abstract LabelDao labelDao();
    public abstract UserDao userDao();

    public abstract MailDao mailDao();

    public static AppDB getInstance(Context context) {
        if (INSTANCE == null) {
            synchronized (AppDB.class) {
                if (INSTANCE == null) {
                    INSTANCE = Room.databaseBuilder(
                            context.getApplicationContext(),
                            AppDB.class,
                            "app_database"
                    )
                            .fallbackToDestructiveMigration()
                            .build();
                }
            }
        }
        return INSTANCE;
    }
}