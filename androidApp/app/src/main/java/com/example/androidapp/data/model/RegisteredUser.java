package com.example.androidapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

@Entity
public class RegisteredUser {
    @PrimaryKey
    @NonNull
    @SerializedName("id")
    private String id;

    @SerializedName("displayName")
    private String displayName;
    @SerializedName("username")
    private String userName;

    public RegisteredUser(@NonNull String id, String displayName, String userName) {
        this.id = id;
        this.displayName = displayName;
        this.userName = userName;
    }

    @NonNull
    public String getId() {
        return id;
    }

    public void setId(@NonNull String id) {
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
}
