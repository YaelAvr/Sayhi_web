package com.example.androidapp.data.WebApi;

import com.example.androidapp.data.model.Draft;
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

import java.util.List;
import com.google.gson.JsonObject; // <-- ודא שהייבוא קיים


import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.DELETE; // <-- הוסף את הייבוא הזה
import retrofit2.http.Path;

public interface MailServicesAPI {
    @POST("mails")
    Call<Void> createMail(@Body JsonObject mailJson);
    @GET("mails/{id}")
    Call<Mail> getMailById(@Path("id") String userId);


    @GET("mails/label-mails")
    Call<List<Mail>> getMailsByLabel(
            @Query("label") String labelName,
            @Query("offset") int offset
    );

    @POST("mails/drafts")
    Call<Draft> createDraft(@Body JsonObject mailJson);

    @DELETE("mails/{id}")
    Call<Void> deleteMail(@Path("id") String mailId);

    @POST("mails/add-label")
    Call<Void> addLabelToMail(@Body JsonObject body);
}
