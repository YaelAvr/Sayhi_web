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

    /* // לתקן את זה
    @Query("SELECT username FROM User")
    List<User> getAllUsernames();
    @Query("SELECT COUNT(*) FROM User WHERE username = :username")
    int isUsernameExist(String username);

    @Query("SELECT * FROM User WHERE username = :username")
    User getUserByUsername(String username);*/

//    @Query("SELECT * FROM user WHERE username = :username LIMIT 1")
//    User getUserByUsername(String username);
//
//    @Query("SELECT EXISTS(SELECT 1 FROM user WHERE username = :username)")
//    boolean isUserExists(String username);


    //אם את רוצה לקבל את זה כ־LiveData או כ־Flow,
//    @Query("SELECT EXISTS(SELECT 1 FROM user WHERE username = :username)")
//    LiveData<Boolean> isUserExistsLive(String username);
}
