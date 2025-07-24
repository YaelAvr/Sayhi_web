package com.example.androidapp.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import com.example.androidapp.data.model.Draft;

import java.util.List;

@Dao
public interface DraftDao {
    @Query("SELECT * FROM draft ORDER BY time DESC")
    LiveData<List<Draft>> getAllDrafts();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertDraft(Draft Draft);

    @Delete
    void deleteDraft(Draft Draft);

    @Query("DELETE FROM draft")
    void clearAllDrafts();

    @Query("SELECT * FROM Draft WHERE id = :id")
    LiveData<Draft> getDraftById(String id);
}
