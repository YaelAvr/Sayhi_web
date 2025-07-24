package com.example.androidapp.ui.home;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.data.WebApi.LabelServiceAPI;
import com.example.androidapp.data.WebApi.MailServicesAPI;
import com.example.androidapp.model.Label;
import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

import java.util.List;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MailViewModel extends AndroidViewModel {

    private final MailRepository repository;

    // LiveData קיים
    private final MutableLiveData<Result<List<Mail>>> mailsApiResult = new MutableLiveData<>();
    private final MutableLiveData<Mail> selectedMail = new MutableLiveData<>();
    private final MediatorLiveData<Result<Void>> deleteResult = new MediatorLiveData<>();
    private LiveData<Result<Void>> deleteSource;

    // --- הוספה: שירותים ו-LiveData חדשים לניהול תוויות ---
    private final MailServicesAPI mailServicesAPI;
    private final LabelServiceAPI labelServiceAPI;
    private final MutableLiveData<Result<List<Label>>> labelsResult = new MutableLiveData<>();
    private final MutableLiveData<Result<Void>> addLabelResult = new MutableLiveData<>();


    public MailViewModel(@NonNull Application application) {
        super(application);
        repository = new MailRepository(application);

        // --- הוספה: אתחול ישיר של Retrofit לשימוש ב-ViewModel ---
        TokenManager tokenManager = new TokenManager(application);
        AuthInterceptor authInterceptor = new AuthInterceptor(tokenManager);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(authInterceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(application.getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        this.mailServicesAPI = retrofit.create(MailServicesAPI.class);
        this.labelServiceAPI = retrofit.create(LabelServiceAPI.class);
    }

    // --- הוספה: פונקציות לטעינת תוויות והוספת מייל לתווית ---

    public LiveData<Result<List<Label>>> getLabelsResult() {
        return labelsResult;
    }

    public void fetchAllLabels() {
        labelServiceAPI.getLabels().enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(@NonNull Call<List<Label>> call, @NonNull Response<List<Label>> response) {
                if (response.isSuccessful()) {
                    labelsResult.postValue(new Result.Success<>(response.body()));
                } else {
                    labelsResult.postValue(new Result.Error(new Exception("Failed to fetch labels: " + response.code())));
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<Label>> call, @NonNull Throwable t) {
                labelsResult.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
    }

    public LiveData<Result<Void>> getAddLabelResult() {
        return addLabelResult;
    }

    public void addLabelToMail(String mailId, String labelName) {
        JsonObject body = new JsonObject();
        body.addProperty("labelName", labelName); // גוף הבקשה מכיל רק את שם התווית

        // קריאה ל-API עם ה-ID בנתיב והגוף בנפרד
        mailServicesAPI.addLabelToMail(mailId, body).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(@NonNull Call<Void> call, @NonNull Response<Void> response) {
                if (response.isSuccessful()) {
                    addLabelResult.postValue(new Result.Success<>(null));
                } else {
                    // --- לוגיקה משופרת לטיפול בשגיאה ---
                    String errorDetails = "Code: " + response.code();
                    try {
                        if (response.errorBody() != null) {
                            // ננסה לקרוא את גוף השגיאה שהשרת שלח
                            errorDetails = response.errorBody().string();
                            Log.e("AddLabelError", "השרת החזיר שגיאה: " + errorDetails);
                        }
                    } catch (Exception e) {
                        Log.e("AddLabelError", "שגיאה בקריאת גוף התגובה", e);
                    }
                    addLabelResult.postValue(new Result.Error(new Exception(errorDetails)));
                }
            }

            @Override
            public void onFailure(@NonNull Call<Void> call, @NonNull Throwable t) {
                Log.e("AddLabelError", "כשל ברשת", t);
                addLabelResult.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
    }


    // --- הקוד הקיים שלך נשאר פה ---

    public void findMailById(String mailId) {
        LiveData<Result<Mail>> resultSource = repository.getMailById(mailId);
        resultSource.observeForever(new androidx.lifecycle.Observer<Result<Mail>>() {
            @Override
            public void onChanged(Result<Mail> result) {
                if (result instanceof Result.Success) {
                    selectedMail.postValue(((Result.Success<Mail>) result).getData());
                } else {
                    selectedMail.postValue(null);
                }
                resultSource.removeObserver(this);
            }
        });
    }

    public LiveData<Mail> getSelectedMail() {
        return selectedMail;
    }

    public void deleteMail(String mailId) {
        if (deleteSource != null) {
            deleteResult.removeSource(deleteSource);
        }
        deleteSource = repository.deleteMailById(mailId);
        deleteResult.addSource(deleteSource, result -> deleteResult.setValue(result));
    }

    public LiveData<Result<Void>> getDeleteResult() {
        return deleteResult;
    }

    public LiveData<Result<List<Mail>>> getMailsResult() {
        return mailsApiResult;
    }

    public void fetchMailsByLabel(String labelId) {
        int offset = 0;
        repository.getMailsByLabel(labelId, offset, result -> mailsApiResult.postValue(result));
    }
}