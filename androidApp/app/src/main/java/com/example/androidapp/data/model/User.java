package com.example.androidapp.data.model;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
@Entity
public class User {
    @PrimaryKey
    private String id;
    private String displayName;
    private String userName;
//    private String password;
    private String pictureURL;
    private boolean isDarkMode;

    public User() {
    }

    public User(String id, String displayName, String userName, String pictureURL, boolean isDarkMode) {
        this.id = id;
        this.displayName = displayName;
        this.userName = userName;
        this.pictureURL = pictureURL;
        this.isDarkMode = isDarkMode;
    }
    public User(String userId, String displayName) {
        this.id = userId;
        this.displayName = displayName;
    }

    public String getUserId() {
        return id;
    }

    public void setUserId(String id) {
        this.id = id;
    }
    public String getDisplayName() {
        return displayName;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }

    public String getPictureURL() {
        return pictureURL;
    }

    public void setPictureURL(String pictureURL) {
        this.pictureURL = pictureURL;
    }

    public boolean isDarkMode() {
        return isDarkMode;
    }

    public void setDarkMode(boolean darkMode) {
        isDarkMode = darkMode;
    }

}