package com.example.androidapp.data.WebApi;

import android.content.Context;

import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.TokenManager;
import com.google.gson.JsonObject;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class TokenApi {
    private Retrofit retrofit;
    private Context context;
    private TokenServicesAPI tokenServicesAPI;

    public TokenApi(Context context) {
        TokenManager tokenManager = new TokenManager(context);
        AuthInterceptor authInterceptor = new AuthInterceptor(tokenManager);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(authInterceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        tokenServicesAPI = retrofit.create(TokenServicesAPI.class);
    }

    public MutableLiveData<Result<String>>  login(String username, String password) {
        MutableLiveData<Result<String>> tokenLiveData = new MutableLiveData<>();
        try {
            JsonObject jsonBody = new JsonObject();

            // Add properties to it. The keys are the JSON field names.
            jsonBody.addProperty("username", username);
            jsonBody.addProperty("password", password);

            Call<JsonObject> call = tokenServicesAPI.login(jsonBody);
            call.enqueue(new Callback<JsonObject>() {
                @Override
                public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        JsonObject responseObject = response.body();
                        if (responseObject.has("token")) {
                            String token = responseObject.get("token").getAsString();
                            tokenLiveData.postValue(new Result.Success<>(token));
                        }
                    } else {
                        tokenLiveData.postValue(new Result.Error(new Exception(response.message())));
                    }
                }

                @Override
                public void onFailure(Call<JsonObject> call, Throwable t) {
                    tokenLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
                }
            });
        } catch (Exception e) {
            tokenLiveData.postValue(new Result.Error(e));
        }

        return tokenLiveData;
    }
}
