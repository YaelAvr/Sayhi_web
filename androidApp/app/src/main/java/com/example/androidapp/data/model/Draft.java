package com.example.androidapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.util.Date;
import java.util.List;

@Entity
public class Draft {

    @PrimaryKey
    @NonNull
    private String id;

    private String fromUserId;
    private String toUserId;
    private String subject;
    private String body;
    private List<String> links;
    private List<String> labelIds;
    private Date time;
    private String fromName;
    private String toName;
    private String fromUserName;
    private String toUserName;
    private String fromPicture;
    private boolean isStarred;
    private boolean isRead = false;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFromUserId() { return fromUserId; }
    public void setFromUserId(String fromUserId) { this.fromUserId = fromUserId; }

    public String getToUserId() { return toUserId; }
    public void setToUserId(String toUserId) { this.toUserId = toUserId; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public List<String> getLinks() { return links; }
    public void setLinks(List<String> links) { this.links = links; }

    public List<String> getLabelIds() { return labelIds; }
    public void setLabelIds(List<String> labelIds) { this.labelIds = labelIds; }

    public Date getTime() { return time; }
    public void setTime(Date time) { this.time = time; }

    public String getFromName() { return fromName; }
    public void setFromName(String fromName) { this.fromName = fromName; }

    public String getToName() { return toName; }
    public void setToName(String toName) { this.toName = toName; }

    public String getFromUserName() { return fromUserName; }
    public void setFromUserName(String fromUserName) { this.fromUserName = fromUserName; }

    public String getToUserName() { return toUserName; }
    public void setToUserName(String toUserName) { this.toUserName = toUserName; }

    public String getFromPicture() { return fromPicture; }
    public void setFromPicture(String fromPicture) { this.fromPicture = fromPicture; }

    public boolean isStarred() { return isStarred; }
    public void setStarred(boolean starred) { isStarred = starred; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
}
