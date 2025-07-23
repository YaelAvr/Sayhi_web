package com.example.androidapp.data.WebApi;

import android.content.Context;
import com.example.androidapp.R;
import com.example.androidapp.data.WebApi.MailServiceAPI;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.model.Mail;

import java.util.List;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MailAPI {

    private final Retrofit retrofit;
    private final MailServiceAPI mailServiceAPI;

    public MailAPI(Context context) {
        TokenManager tokenManager = new TokenManager(context);
        AuthInterceptor authInterceptor = new AuthInterceptor(tokenManager);
        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(authInterceptor)
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        mailServiceAPI = retrofit.create(MailServiceAPI.class);
    }

    public Call<List<Mail>> getMailsByLabel(String labelId, int offset) { // <-- הוספנו פרמטר
        return mailServiceAPI.getMailsByLabel(labelId, offset); // <-- העברנו אותו הלאה
    }
}