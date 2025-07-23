package com.example.androidapp.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.androidapp.data.WebApi.MailAPI;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.model.Mail;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MailRepository {

    // --- משתנים לעבודה עם מסד נתונים פנימי (Room) ---
    private final MailDao mailDao;
    private final ExecutorService executorService;

    // --- משתנה לעבודה עם הרשת (API) ---
    private final MailAPI mailAPI;

    // --- Callback להחזרת תוצאות מה-API ---
    public interface MailCallback {
        void onComplete(Result<List<Mail>> result);
    }

    public MailRepository(Application application) {
        // אתחול לעבודה עם Room
        AppDB db = AppDB.getInstance(application);
        mailDao = db.mailDao();
        executorService = Executors.newSingleThreadExecutor();

        // אתחול לעבודה עם ה-API, עם העברת Context לבנאי
        this.mailAPI = new MailAPI(application);
    }

    // --- מתודות קיימות לעבודה עם Room (נשארות למקרה הצורך) ---
    public LiveData<List<MailEntity>> getAllMails() {
        return mailDao.getAllMails();
    }

    public void insertMail(MailEntity mail) {
        executorService.execute(() -> mailDao.insertMail(mail));
    }

    public void deleteMail(MailEntity mail) {
        executorService.execute(() -> mailDao.deleteMail(mail));
    }

    public void clearAllMails() {
        executorService.execute(mailDao::clearAllMails);
    }

    public LiveData<MailEntity> getMailById(String id) {
        return mailDao.getMailById(id);
    }

    // --- מתודה מעודכנת לעבודה עם ה-API ---
    public void getMailsByLabel(String labelId, int offset, final MailCallback callback) {
        // אין צורך להצהיר על offset, אנחנו משתמשים בערך שהתקבל כפרמטר
        mailAPI.getMailsByLabel(labelId, offset).enqueue(new Callback<List<Mail>>() {
            @Override
            public void onResponse(Call<List<Mail>> call, Response<List<Mail>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onComplete(new Result.Success<>(response.body()));
                } else {
                    callback.onComplete(new Result.Error(new Exception("API Error loading mails: " + response.code())));
                }
            }

            @Override
            public void onFailure(Call<List<Mail>> call, Throwable t) {
                callback.onComplete(new Result.Error(new Exception("Network Error loading mails: " + t.getMessage())));
            }
        });
    }
}