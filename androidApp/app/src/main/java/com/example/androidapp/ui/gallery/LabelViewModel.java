package com.example.androidapp.ui.gallery;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.androidapp.data.model.LabelEntity;
import com.example.androidapp.data.repository.LabelRepository;

import java.util.List;

public class LabelViewModel extends AndroidViewModel {

    private final LabelRepository repository;
    private final LiveData<List<LabelEntity>> allLabels;

    public LabelViewModel(@NonNull Application application) {
        super(application);
        repository = new LabelRepository(application);
        allLabels = repository.getAllLabels();
    }

    public LiveData<List<LabelEntity>> getAllLabels() {
        return allLabels;
    }

    public void insert(LabelEntity label) {
        repository.insertLabel(label);
    }

    public void delete(LabelEntity label) {
        repository.deleteLabel(label);
    }

    public void clear() {
        repository.clearAllLabels();
    }
}