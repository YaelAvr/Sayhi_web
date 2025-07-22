package com.example.androidapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
@Entity
public class User {
    @PrimaryKey
    @NonNull
    @SerializedName("id")
    private String id;

    @SerializedName("displayName")
    private String displayName;
    @SerializedName("username")
    private String userName;

    //    private String password;
    @SerializedName("picture")
    private String pictureURL;

    @SerializedName("isDarkMode")
    private boolean isDarkMode;


    public User(@NonNull String id, String displayName, String userName, String pictureURL, boolean isDarkMode) {
        this.id = id;
        this.displayName = displayName;
        this.userName = userName;
        this.pictureURL = pictureURL;
        this.isDarkMode = isDarkMode;
    }
    public User(@NonNull String userId, String displayName) {
        this.id = userId;
        this.displayName = displayName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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