package com.example.androidapp;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import java.util.List;

public interface ApiService {
    @GET("api/labels")
    Call<List<Label>> getLabels(@Header("Authorization") String token);
}