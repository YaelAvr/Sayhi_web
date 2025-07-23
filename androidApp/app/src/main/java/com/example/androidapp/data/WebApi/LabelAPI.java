package com.example.androidapp.data.WebApi;

import android.content.Context; // <-- Import חדש
import com.example.androidapp.R; // <-- Import חדש
import com.example.androidapp.data.WebApi.LabelServiceAPI;
import com.example.androidapp.data.auth.AuthInterceptor; // <-- Import חדש
import com.example.androidapp.data.auth.TokenManager; // <-- Import חדש
import com.example.androidapp.model.Label;

import java.util.List;
import okhttp3.OkHttpClient; // <-- Import חדש
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import java.util.HashMap; // <-- הוסף import
import java.util.Map; // <-- הוסף import

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

    // המתודה הזו כבר לא צריכה לקבל טוקן, הוא יתווסף אוטומטית!
    public Call<List<Label>> getLabels() {
        return labelServiceAPI.getLabels();
    }

    public Call<Label> createLabel(String name) {
        Map<String, String> body = new HashMap<>();
        body.put("name", name);
        return labelServiceAPI.createLabel(body);
    }
}