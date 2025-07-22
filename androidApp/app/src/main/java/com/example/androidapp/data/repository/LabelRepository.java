package com.example.androidapp.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.androidapp.data.WebApi.LabelAPI;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.dao.LabelDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.LabelEntity;
import com.example.androidapp.model.Label;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LabelRepository {

    // --- משתנים לעבודה עם מסד נתונים פנימי (Room) ---
    private final LabelDao labelDao;
    private final ExecutorService executorService;

    // --- משתנים לעבודה עם הרשת (API) ---
    private final LabelAPI labelAPI;
    private final TokenManager tokenManager;

    // --- Callback להחזרת תוצאות מה-API ---
    public interface LabelApiCallback {
        void onComplete(Result<List<Label>> result);
    }

    public LabelRepository(Application application) {
        // אתחול לעבודה עם Room
        AppDB db = AppDB.getInstance(application);
        labelDao = db.labelDao();
        executorService = Executors.newSingleThreadExecutor();

        // אתחול לעבודה עם ה-API
        this.labelAPI = new LabelAPI();
        this.tokenManager = new TokenManager(application);
    }

    // --- מתודות קיימות לעבודה עם Room ---
    public LiveData<List<LabelEntity>> getAllLabels() {
        return labelDao.getAllLabels();
    }

    public void insertLabel(LabelEntity label) {
        executorService.execute(() -> labelDao.insertLabel(label));
    }

    public void deleteLabel(LabelEntity label) {
        executorService.execute(() -> labelDao.deleteLabel(label));
    }

    public void clearAllLabels() {
        executorService.execute(labelDao::clearAllLabels);
    }

    // --- מתודה חדשה לעבודה עם ה-API ---
    public void fetchLabelsFromApi(final LabelApiCallback callback) {
        String token = tokenManager.getToken();
        if (token == null) {
            callback.onComplete(new Result.Error(new Exception("User not logged in")));
            return;
        }
        String authToken = "Bearer " + token;

        labelAPI.getLabels(authToken).enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(Call<List<Label>> call, Response<List<Label>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onComplete(new Result.Success<>(response.body()));
                } else {
                    callback.onComplete(new Result.Error(new Exception("API Error loading labels: " + response.code())));
                }
            }

            @Override
            public void onFailure(Call<List<Label>> call, Throwable t) {
                callback.onComplete(new Result.Error(new Exception("Network Error loading labels: " + t.getMessage())));
            }
        });
    }
}