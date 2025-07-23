package com.example.androidapp.ui.gallery;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import com.example.androidapp.data.Result; // <-- Import חדש
import com.example.androidapp.data.repository.LabelRepository;
import com.example.androidapp.model.Label;
import java.util.List;

public class LabelViewModel extends AndroidViewModel {

    private final LabelRepository repository;

    // LiveData לטיפול בלחיצות על לייבלים
    private final MutableLiveData<String> selectedLabelId = new MutableLiveData<>();

    // LiveData חדש שיחזיק את התוצאה מה-API
    private final MutableLiveData<Result<List<Label>>> labelsApiResult = new MutableLiveData<>();
    private final MutableLiveData<Result<Label>> createLabelResult = new MutableLiveData<>();


    public LabelViewModel(@NonNull Application application) {
        super(application);
        repository = new LabelRepository(application);
    }

    // --- מתודות חדשות לעבודה עם ה-API ---

    /**
     * חושף את התוצאה מה-API (רשימת לייבלים או שגיאה) החוצה.
     * ה-Activity יאזין ל-LiveData הזה.
     */
    public LiveData<Result<List<Label>>> getLabelsApiResult() {
        return labelsApiResult;
    }

    /**
     * המתודה שה-Activity יקרא לה כדי להתחיל את טעינת הלייבלים מהשרת.
     */
    public void fetchLabelsFromApi() {
        repository.fetchLabelsFromApi(result -> {
            labelsApiResult.postValue(result); // השתמש ב-postValue כי הקריאה היא אסינכרונית
        });
    }

    // --- מתודות קיימות לטיפול בלחיצות ---

    /**
     * חושף את ה-ID של הלייבל שנלחץ. ה-Activity יאזין לזה.
     */
    public LiveData<String> getSelectedLabelId() {
        return selectedLabelId;
    }

    public LiveData<Result<Label>> getCreateLabelResult() {
        return createLabelResult;
    }

    public void createLabel(String name) {
        repository.createLabel(name, result -> {
            createLabelResult.postValue(result);
        });
    }

    /**
     * המתודה שה-Adapter קורא לה כשלוחצים על לייבל.
     */
    public void onLabelClicked(Label label) {
        if (label != null && label.getId() != null) {
            selectedLabelId.setValue(label.getId());
        }
    }
}