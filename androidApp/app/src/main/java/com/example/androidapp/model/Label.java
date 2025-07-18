package com.example.androidapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class Label {
    @SerializedName("_id")
    private String id;

    @SerializedName("name")
    private String name;

    @SerializedName("mails")
    private List<String> mails;

    @SerializedName("isDefault")
    private boolean isDefault;

    @SerializedName("allowAdd")
    private boolean allowAdd;

    @SerializedName("user")
    private String user;

    // Getters ו-Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<String> getMails() { return mails; }
    public void setMails(List<String> mails) { this.mails = mails; }
    public boolean isDefault() { return isDefault; }
    public void setDefault(boolean isDefault) { this.isDefault = isDefault; }
    public boolean isAllowAdd() { return allowAdd; }
    public void setAllowAdd(boolean allowAdd) { this.allowAdd = allowAdd; }
    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
}