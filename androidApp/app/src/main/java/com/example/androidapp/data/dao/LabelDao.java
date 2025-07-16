package com.example.androidapp.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.*;
import com.example.androidapp.data.model.LabelEntity;
import java.util.List;

@Dao
public interface LabelDao {
    @Query("SELECT * FROM labels")
    LiveData<List<LabelEntity>> getAllLabels();

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    void insertLabel(LabelEntity label);

    @Delete
    void deleteLabel(LabelEntity label);

    @Query("DELETE FROM labels")
    void clearAllLabels();
}