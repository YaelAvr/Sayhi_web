package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Mail;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

import retrofit2.http.Query;

public interface MailServiceAPI {

    @GET("mails/label-mails")
    Call<List<Mail>> getMailsByLabel(
            @Query("label") String labelName,
            @Query("offset") int offset // <-- הוספנו את הפרמטר הזה
    );
}