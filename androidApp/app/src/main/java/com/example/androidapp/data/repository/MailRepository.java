package com.example.androidapp.data.repository;

import android.app.Application;
import androidx.lifecycle.LiveData;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.MailEntity;


import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MailRepository {

    private final MailDao mailDao;
    private final ExecutorService executorService;

    public MailRepository(Application application) {
        AppDB db = AppDB.getInstance(application);
        mailDao = db.mailDao();
        executorService = Executors.newSingleThreadExecutor();
    }

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
}