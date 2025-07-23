package com.example.androidapp.data.db;

import androidx.room.TypeConverter;
import com.example.androidapp.data.model.LabelEntity;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;

public class LabelListConverter {
    private static Gson gson = new Gson();

    @TypeConverter
    public static List<LabelEntity> stringToLabelList(String data) {
        if (data == null) {
            return Collections.emptyList();
        }
        // We need TypeToken for Gson to understand it's a list of LabelEntity objects
        Type listType = new TypeToken<List<LabelEntity>>() {}.getType();
        return gson.fromJson(data, listType);
    }

    @TypeConverter
    public static String labelListToString(List<LabelEntity> labels) {
        return gson.toJson(labels);
    }
}
