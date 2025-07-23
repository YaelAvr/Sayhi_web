package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

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
    Call<Mail> createDraft(@Body JsonObject mailJson);
}
