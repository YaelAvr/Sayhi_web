package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Mail;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface MailServiceAPI {

    @GET("api/mails/{labelId}") // <-- עדכן לנתיב הנכון בסרבר שלך
    Call<List<Mail>> getMailsByLabel(
            @Path("labelId") String labelId,
            @Header("Authorization") String token
    );

    // בעתיד, קריאות נוספות שקשורות למיילים יתווספו כאן
}