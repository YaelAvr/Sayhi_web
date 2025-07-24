package com.example.androidapp.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.androidapp.data.WebApi.LabelAPI; // <-- ודא שה-import מהמקום הנכון
import com.example.androidapp.data.Result;
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

    private final LabelDao labelDao;
    private final ExecutorService executorService;
    private final LabelAPI labelAPI;

    public interface LabelApiCallback {
        void onComplete(Result<List<Label>> result);
    }

    public LabelRepository(Application application) {
        // init Room
        AppDB db = AppDB.getInstance(application);
        labelDao = db.labelDao();
        executorService = Executors.newSingleThreadExecutor();

        this.labelAPI = new LabelAPI(application);
    }

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

    // --- מתודה מעודכנת לעבודה עם ה-API ---
    public void fetchLabelsFromApi(final LabelApiCallback callback) {
        labelAPI.getLabels().enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(Call<List<Label>> call, Response<List<Label>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onComplete(new Result.Success<>(response.body()));
                } else {
                    // אם קיבלנו שגיאה, ייתכן שהטוקן לא תקין או פג תוקף
                    callback.onComplete(new Result.Error(new Exception("API Error loading labels: " + response.code())));
                }
            }

            @Override
            public void onFailure(Call<List<Label>> call, Throwable t) {
                callback.onComplete(new Result.Error(new Exception("Network Error loading labels: " + t.getMessage())));
            }
        });
    }

    public interface CreateLabelCallback {
        void onComplete(Result<Label> result);
    }

    public void createLabel(String name, final CreateLabelCallback callback) {
        labelAPI.createLabel(name).enqueue(new Callback<Label>() {
            @Override
            public void onResponse(Call<Label> call, Response<Label> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onComplete(new Result.Success<>(response.body()));
                } else {
                    // שגיאה, למשל "שם כבר קיים"
                    callback.onComplete(new Result.Error(new Exception("Failed to create label: " + response.code())));
                }
            }

            @Override
            public void onFailure(Call<Label> call, Throwable t) {
                callback.onComplete(new Result.Error(new Exception("Network error: " + t.getMessage())));
            }
        });
    }
}