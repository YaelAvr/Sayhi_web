package com.example.androidapp.data.WebApi;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.SessionExpiredException;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

import java.util.List;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MailAPI {
    private Retrofit retrofit;
    private Context context;
    private MailServicesAPI mailServicesAPI;
    private MailDao mailDao;

    public MailAPI(Context context, MailDao md) {
        TokenManager tokenManager = new TokenManager(context);
        AuthInterceptor authInterceptor = new AuthInterceptor(tokenManager);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(authInterceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        mailServicesAPI = retrofit.create(MailServicesAPI.class);
        mailDao = md;
    }

    public LiveData<Result<Void>> createMail(JsonObject jsonBody) {

        MutableLiveData<Result<Void>> resultLiveData = new MutableLiveData<>();

//        CreateMailRequest request = new CreateMailRequest(to, subject, body);
        Call<Void> call = mailServicesAPI.createMail(jsonBody);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Log.i("mailApi_createMail", "isSuccessful response.code(): " + response.code());

                    resultLiveData.postValue(new Result.Success<>(null));

                } else {
                    Log.e("mailApi_createMail", "response.code(): " + response.code()+" "+response.message());
                    // Check if the error code is 401 (Unauthorized) or 403 (Forbidden).
                    if (response.code() == 401 || response.code() == 403) {
                        // This is a special error that means the session has expired.
                        resultLiveData.postValue(new Result.Error(new SessionExpiredException()));

                    } else {
                        resultLiveData.postValue(new Result.Error(new Exception(response.message())));
                    }
                }


            }
            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("mailApi_createMail", "response.getMessage(): " + t.getMessage());

                resultLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
        return resultLiveData;
    }

    public Call<List<Mail>> getMailsByLabel(String labelId, int offset) {
        return mailServicesAPI.getMailsByLabel(labelId, offset); // <-- העברנו אותו הלאה
    }

    public Call<Mail> getMailById(String mailId) {
        // פשוט קוראים לפונקציה בממשק ה-Retrofit ומחזירים את התוצאה
        return mailServicesAPI.getMailById(mailId);
    }

    public LiveData<Result<Void>> deleteMail(String mailId) {
        MutableLiveData<Result<Void>> resultLiveData = new MutableLiveData<>();

        Call<Void> call = mailServicesAPI.deleteMail(mailId);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) { // קוד 204, המחיקה הצליחה
                    resultLiveData.postValue(new Result.Success<>(null));
                } else {
                    // בדוק אם השגיאה היא בגלל פג תוקף הטוקן
                    if (response.code() == 401 || response.code() == 403) {
                        resultLiveData.postValue(new Result.Error(new SessionExpiredException()));
                    } else {
                        resultLiveData.postValue(new Result.Error(new Exception("Error: " + response.message())));
                    }
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                resultLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
        return resultLiveData;
    }

}
