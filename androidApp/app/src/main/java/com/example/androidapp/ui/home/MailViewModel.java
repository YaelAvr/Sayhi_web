package com.example.androidapp.ui.home;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Transformations;

import com.example.androidapp.data.Result; // <-- Import חדש
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.model.Mail;

import java.util.List;

public class MailViewModel extends AndroidViewModel {

    private final MailRepository repository;

    // LiveData לעבודה עם מסד נתונים פנימי (נשאר למקרה הצורך)
    private final LiveData<List<MailEntity>> allMailsFromDb;

    // LiveData חדש שיחזיק את התוצאה מה-API
    private final MutableLiveData<Result<List<Mail>>> mailsApiResult = new MutableLiveData<>();

    public MailViewModel(@NonNull Application application) {
        super(application);
        repository = new MailRepository(application);
        allMailsFromDb = repository.getAllMails(); // מאתחלים את ה-LiveData מה-DB
    }

    // --- מתודות חדשות לעבודה עם ה-API ---

    /**
     * חושף את תוצאת ה-API החוצה, כדי שה-Fragment יוכל להאזין לה.
     */
    public LiveData<Result<List<Mail>>> getMailsResult() {
        return mailsApiResult;
    }

    /**
     * המתודה ש-InboxActivity קורא לה כדי להתחיל את טעינת המיילים.
     * זו המתודה שהייתה חסרה לך.
     */
    public void fetchMailsByLabel(String labelId) {
        // קריאה ל-Repository שיבצע את קריאת ה-API
        int offset = 0;

        repository.getMailsByLabel(labelId, offset, result -> { // <-- העברנו את ה-offset
            mailsApiResult.postValue(result);
        });
    }


    // --- מתודות קיימות לעבודה עם Room (מסד נתונים פנימי) ---

    public LiveData<List<MailEntity>> getAllMails() {
        return allMailsFromDb;
    }

    public void insert(MailEntity mail) {
        repository.insertMail(mail);
    }

    public void delete(MailEntity mail) {
        repository.deleteMail(mail);
    }

    public void clear() {
        repository.clearAllMails();
    }

    public LiveData<Mail> getMailById(String id) {
        return Transformations.map(repository.getMailById(id), entity -> {
            if (entity == null) return null;
            return toMail(entity);
        });
    }

    private Mail toMail(MailEntity entity) {
        Mail mail = new Mail(
                entity.getFromName(),
                entity.getSubject(),
                entity.getBody(),
                entity.getTime(),
                entity.isRead(),
                entity.isStarred(),
                entity.getFromPicture()
        );
        mail.setId(entity.getId());
        return mail;
    }
}