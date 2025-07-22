package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Mail;
import java.util.List;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MailAPI {

    private final Retrofit retrofit;
    private final MailServiceAPI mailServiceAPI;

    public MailAPI() {
        String BASE_URL = "http://10.0.2.2:3000/"; // ודא שזו כתובת הבסיס הנכונה

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        mailServiceAPI = retrofit.create(MailServiceAPI.class);
    }

    public Call<List<Mail>> getMailsByLabel(String labelId, String token) {
        return mailServiceAPI.getMailsByLabel(labelId, token);
    }
}