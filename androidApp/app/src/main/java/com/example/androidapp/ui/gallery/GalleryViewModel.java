package com.example.androidapp.ui.gallery;

import android.app.Application;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.example.androidapp.data.model.LabelEntity;
import com.example.androidapp.data.repository.LabelRepository;

import java.util.List;

public class GalleryViewModel extends AndroidViewModel {

    private final LabelRepository labelRepository;
    private final LiveData<List<LabelEntity>> allLabels;

    public GalleryViewModel(Application application) {
        super(application);
        labelRepository = new LabelRepository(application);
        allLabels = labelRepository.getAllLabels();
    }

    public LiveData<List<LabelEntity>> getAllLabels() {
        return allLabels;
    }

    // פעולות עזר כמו insert/delete אם תרצי להשתמש בלייבלים דמה
    public void insert(LabelEntity label) {
        labelRepository.insertLabel(label);
    }

    public void clear() {
        labelRepository.clearAllLabels();
    }
}