package com.example.androidapp.data.model;

public class NewUserRequest {
    private String username;
    private String displayName;
    private String password;
    private String picture;
    private String gender;
    private String birthday;

    public NewUserRequest(String username, String displayName, String password, String picture, String gender, String birthday) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.picture = picture;
        this.gender = gender;
        this.birthday = birthday;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}