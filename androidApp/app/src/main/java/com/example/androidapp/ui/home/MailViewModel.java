package com.example.androidapp.ui.home;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.Transformations;

import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.model.Mail;

import java.util.List;

public class MailViewModel extends AndroidViewModel {
    private final MailRepository repository;
    private final LiveData<List<MailEntity>> allMails;

    public MailViewModel(@NonNull Application application) {
        super(application);
        repository = new MailRepository(application);
        allMails = repository.getAllMails();
    }

    public LiveData<List<MailEntity>> getAllMails() {
        return allMails;
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
            return toMail(entity); // פונקציה שממירה מ־MailEntity ל־Mail
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