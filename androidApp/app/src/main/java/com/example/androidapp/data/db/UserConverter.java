package com.example.androidapp.data.db;

import androidx.room.TypeConverter;
import com.example.androidapp.data.model.User;
import com.google.gson.Gson;

public class UserConverter {
    private static Gson gson = new Gson();

    @TypeConverter
    public static User stringToUser(String data) {
        if (data == null) {
            return null;
        }
        return gson.fromJson(data, User.class);
    }

    @TypeConverter
    public static String userToString(User user) {
        return gson.toJson(user);
    }
}