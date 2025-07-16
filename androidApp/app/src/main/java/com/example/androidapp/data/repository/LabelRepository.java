package com.example.androidapp.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.androidapp.data.dao.LabelDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.LabelEntity;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class LabelRepository {

    private final LabelDao labelDao;
    private final ExecutorService executorService;

    public LabelRepository(Application application) {
        AppDB  db = AppDB.getInstance(application);
        labelDao = db.labelDao();
        executorService = Executors.newSingleThreadExecutor();
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
}