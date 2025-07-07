package com.example.androidapp.data.dao;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidapp.data.model.User;

import retrofit2.http.DELETE;

@Dao
public interface UserDao {
    @Insert
    void insertUser(User user);

    @Update
    void updateUser(User user);

    @DELETE
    void deleteUser(User user);
    @Query("SELECT * FROM User WHERE id = :id")
    User getUserById(String id);

//    @Query("DELETE FROM User")
//    void deleteAllUsers();
}
