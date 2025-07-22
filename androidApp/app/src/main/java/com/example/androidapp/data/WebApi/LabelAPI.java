package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Label;
import java.util.List;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LabelAPI {

    private final Retrofit retrofit;
    private final LabelServiceAPI labelServiceAPI;

    public LabelAPI() {
        // הכתובת הזו צריכה להיות זהה לכתובת של RetrofitClient שיצרנו קודם
        String BASE_URL = "http://10.0.2.2:3000/";

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        labelServiceAPI = retrofit.create(LabelServiceAPI.class);
    }

    // מתודה ציבורית שתאפשר לקוד החיצוני לקרוא ל-API
    public Call<List<Label>> getLabels(String token) {
        return labelServiceAPI.getLabels(token);
    }
}