package com.example.androidapp.data.model.Registration;

import com.google.gson.annotations.SerializedName;

public class PictureResponse {
    @SerializedName("tempImageUrl")
    private String tempImageUrl;

    public String getTempImageUrl() {
        return tempImageUrl;
    }
}

