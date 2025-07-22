package com.example.androidapp.data.WebApi;

import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface TokenServicesAPI {
    @POST("tokens")
    Call<JsonObject> login(@Body JsonObject body);

//    @POST("refresh")
//    Call<TokenResponse> refreshToken(@Body RefreshRequest request);
}
