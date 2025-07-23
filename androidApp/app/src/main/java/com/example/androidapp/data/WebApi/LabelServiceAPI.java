package com.example.androidapp.data.WebApi;

import com.example.androidapp.model.Label;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Body; // <-- הוסף import
import retrofit2.http.POST; // <-- הוסף import
import java.util.Map; // <-- הוסף import

public interface LabelServiceAPI {
    // הסרנו את הפרמטר @Header("Authorization") String token
    @GET("labels")
    Call<List<Label>> getLabels();

    @POST("labels")
    Call<Label> createLabel(@Body Map<String, String> body);
}