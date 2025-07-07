package com.example.androidapp.data.WebApi;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface TokenServicesAPI {
    @POST("token")
    Call<String> login(@Body String username,  String password);

//    @POST("refresh")
//    Call<TokenResponse> refreshToken(@Body RefreshRequest request);
}
