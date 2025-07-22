package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Label;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface LabelServiceAPI {

    @GET("api/labels") // <-- עדכני לנתיב הנכון שלך
    Call<List<Label>> getLabels(@Header("Authorization") String token);

    // אם בעתיד תרצי להוסיף לייבל דרך ה-API, תוסיפי כאן:
    // @POST("api/labels")
    // Call<Void> createLabel(...);
}