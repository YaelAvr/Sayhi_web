package com.example.androidapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import com.google.gson.annotations.SerializedName;

import java.util.Date;
import java.util.List;

@Entity
public class Draft {

    @PrimaryKey
    @NonNull
    @SerializedName("_id")
    private String id;


    private User from;
    private User to;


    //    private String fromUserId;
//    private String toUserId;
    private String subject;
    private String body;
    private List<String> links;
    private List<LabelEntity> labels;
    private Date time;
    private String fromName;
    private String toName;
    private String fromUserName;
    private String toUserName;
    private String fromPicture;
    private boolean isStarred;
    private boolean isRead = false;

    public Draft(@NonNull String id, User from, User to, String subject, String body, List<String> links, List<LabelEntity> labels, Date time, String fromName, String toName, String fromUserName, String toUserName, String fromPicture, boolean isStarred){        this.id = id;
        this.id = id;
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.links = links;
        this.labels = labels;
        this.time = time;
        this.fromName = fromName;
        this.toName = toName;
        this.fromUserName = fromUserName;
        this.toUserName = toUserName;
        this.fromPicture = fromPicture;
        this.isStarred = isStarred;
    }
    // Getters and Setters

    @NonNull
    public String getId() {
        return id;
    }

    public void setId(@NonNull String id) {
        this.id = id;
    }

    public User getFrom() {
        return from;
    }

    public void setFrom(User fromUser) {
        this.from = fromUser;
    }

    public User getTo() {
        return to;
    }

    public void setTo(User toUser) {
        this.to = toUser;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public List<LabelEntity> getLabels() {
        return labels;
    }

    public void setLabels(List<LabelEntity> labels) {
        this.labels = labels;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getFromName() {
        return fromName;
    }

    public void setFromName(String fromName) {
        this.fromName = fromName;
    }

    public String getToName() {
        return toName;
    }

    public void setToName(String toName) {
        this.toName = toName;
    }

    public String getFromUserName() {
        return fromUserName;
    }

    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }

    public String getToUserName() {
        return toUserName;
    }

    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }

    public String getFromPicture() {
        return fromPicture;
    }

    public void setFromPicture(String fromPicture) {
        this.fromPicture = fromPicture;
    }

    public boolean isStarred() {
        return isStarred;
    }

    public void setStarred(boolean starred) {
        isStarred = starred;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}