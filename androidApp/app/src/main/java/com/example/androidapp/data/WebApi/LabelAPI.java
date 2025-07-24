package com.example.androidapp.data.WebApi;

import android.content.Context;

import com.example.androidapp.R;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.model.Label;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LabelAPI {

    private final Retrofit retrofit;
    private final LabelServiceAPI labelServiceAPI;

    // ================== שדרגנו את הבנאי ==================
    public LabelAPI(Context context) {
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

        labelServiceAPI = retrofit.create(LabelServiceAPI.class);
    }
    // =======================================================

    public Call<List<Label>> getLabels() {
        return labelServiceAPI.getLabels();
    }

    public Call<Label> createLabel(String name) {
        Map<String, String> body = new HashMap<>();
        body.put("name", name);
        return labelServiceAPI.createLabel(body);
    }
}