package com.example.androidapp.ui.home;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.model.Mail;

import java.util.List;

public class MailViewModel extends AndroidViewModel {

    private final MailRepository repository;
    private final MutableLiveData<Result<List<Mail>>> mailsApiResult = new MutableLiveData<>();
    private final MutableLiveData<Mail> selectedMail = new MutableLiveData<>();
    private LiveData<Result<Void>> deleteResult;

    public MailViewModel(@NonNull Application application) {
        super(application);
        repository = new MailRepository(application);
    }

    // --- שינוי מרכזי: הפונקציה הזו עכשיו קוראת ל-API ---
    public void findMailById(String mailId) {
        // קורא ל-Repository כדי לקבל מייל בודד
        LiveData<Result<Mail>> resultSource = repository.getMailById(mailId);

        // מאזין לתוצאה מה-Repository
        resultSource.observeForever(new androidx.lifecycle.Observer<Result<Mail>>() {
            @Override
            public void onChanged(Result<Mail> result) {
                if (result instanceof Result.Success) {
                    // אם ההצלחה, עדכן את ה-selectedMail שה-Fragment מאזין לו
                    selectedMail.postValue(((Result.Success<Mail>) result).getData());
                } else {
                    // אם נכשל, עדכן ל-null
                    selectedMail.postValue(null);
                }
                // חשוב להסיר את המאזין כדי למנוע דליפות זיכרון
                resultSource.removeObserver(this);
            }
        });
    }

    // הפונקציה שה-Fragment מאזין לה נשארת זהה
    public LiveData<Mail> getSelectedMail() {
        return selectedMail;
    }

    // --- שאר הקוד נשאר זהה לחלוטין ---

    public void deleteMail(String mailId) {
        deleteResult = repository.deleteMailById(mailId);
    }

    public LiveData<Result<Void>> getDeleteResult() {
        if (deleteResult == null) {
            deleteResult = new MutableLiveData<>();
        }
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