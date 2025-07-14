package com.example.androidapp.data.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidapp.data.model.User;

@Dao
public interface UserDao {
    /**
     * Inserts a user into the database. If the user already exists,
     * it replaces the old user data with the new data.
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertUser(User user);

    @Update
    void updateUser(User user);

    @Delete
    void deleteUser(User user);
    @Query("SELECT * FROM User WHERE id = :id")
    User getUserById(String id);

    @Query("DELETE FROM User")
    void deleteAllUsers();
}
