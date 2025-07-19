package com.example.androidapp.data.dao;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Update;

import com.example.androidapp.data.model.RegisteredUser;

import java.util.List;

@Dao
public interface RegisteredUserDao {
    /**
     * Inserts a user into the database. If the user already exists,
     * it replaces the old user data with the new data.
     */
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertRegisteredUser(RegisteredUser... registeredUser);

    @Update
    void updateUser(RegisteredUser... registeredUser);

    @Delete
    void deleteUser(RegisteredUser... registeredUser);

    @Query("DELETE FROM RegisteredUser")
    void deleteAllUsers();

     // לתקן את זה
    @Query("SELECT * FROM RegisteredUser")
    List<RegisteredUser> index();
    @Query("SELECT COUNT(*) FROM RegisteredUser WHERE userName = :username")
    int isUsernameExist(String username);

    @Query("SELECT * FROM RegisteredUser WHERE userName = :username")
    RegisteredUser getUserByUsername(String username);


//    @Query("SELECT * FROM user WHERE username = :username LIMIT 1")
//    User getUserByUsername(String username);
//
//    @Query("SELECT EXISTS(SELECT 1 FROM user WHERE username = :username)")
//    boolean isUserExists(String username);


    //אם את רוצה לקבל את זה כ־LiveData או כ־Flow,
//    @Query("SELECT EXISTS(SELECT 1 FROM user WHERE username = :username)")
//    LiveData<Boolean> isUserExistsLive(String username);
}
