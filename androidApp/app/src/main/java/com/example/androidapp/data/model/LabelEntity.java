package com.example.androidapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;
import com.example.androidapp.data.db.StringListConverter;
import java.util.List;

@Entity(tableName = "labels")
@TypeConverters(StringListConverter.class)
public class LabelEntity {

    @PrimaryKey
    @NonNull
    private String id;

    private String name;
    private List<String> mails;
    private boolean isDefault;
    private boolean allowAdd;
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