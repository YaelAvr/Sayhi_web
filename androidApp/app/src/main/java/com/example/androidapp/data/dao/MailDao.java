package com.example.androidapp.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;
import com.example.androidapp.data.model.MailEntity;
import java.util.List;

@Dao
public interface MailDao {
    @Query("SELECT * FROM mails ORDER BY time DESC")
    LiveData<List<MailEntity>> getAllMails();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertMail(MailEntity mail);

    @Delete
    void deleteMail(MailEntity mail);

    @Query("DELETE FROM mails")
    void clearAllMails();

    @Query("SELECT * FROM mails WHERE id = :id")
    LiveData<MailEntity> getMailById(String id);
}