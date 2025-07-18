package com.example.androidapp.model;

import com.google.gson.annotations.SerializedName;
import java.util.Date;
import java.util.List;

public class Mail {

    @SerializedName("_id")
    private String id;

    @SerializedName("from")
    private String fromUserId; // ID של השולח

    @SerializedName("to")
    private String toUserId; // ID של הנמען

    @SerializedName("subject")
    private String subject;

    @SerializedName("body")
    private String body; // התוכן המלא של המייל

    @SerializedName("links")
    private List<String> links;

    @SerializedName("labels")
    private List<String> labelIds; // רשימת ID-ים של לייבלים

    @SerializedName("time")
    private Date time; // אפשר להשתמש ב-Date, Gson יודע להמיר את זה

    @SerializedName("fromName")
    private String fromName; // זה השם שבאמת נרצה להציג

    @SerializedName("toName")
    private String toName;

    @SerializedName("fromUserName")
    private String fromUserName;

    @SerializedName("toUserName")
    private String toUserName;

    @SerializedName("fromPicture")
    private String fromPicture; // כתובת ה-URL של תמונת הפרופיל

    @SerializedName("isStarred")
    private boolean isStarred;

    // נוסיף שדה מקומי כדי לדעת אם המייל נקרא (זה לא מגיע מהשרת, אז ננהל אותו באפליקציה)
    private boolean isRead = false;

    // Constructor ריק (חשוב ל-Gson)
    public Mail() {}

    // Constructor ליצירת נתוני דמה (Mock Data)
    public Mail(String fromName, String subject, String body, Date time, boolean isRead, boolean isStarred, String fromPicture) {
        this.fromName = fromName;
        this.subject = subject;
        this.body = body;
        this.time = time;
        this.isRead = isRead;
        this.isStarred = isStarred;
        this.fromPicture = fromPicture;
    }

    // --- Getters and Setters for all fields ---

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