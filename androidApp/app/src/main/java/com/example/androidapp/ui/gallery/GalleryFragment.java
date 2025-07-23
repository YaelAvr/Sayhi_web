package com.example.androidapp.ui.gallery;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast; // <-- Import חדש

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.R;
import com.example.androidapp.data.Result; // <-- Import חדש
import com.example.androidapp.model.Label;

import java.util.ArrayList;
import java.util.List;

public class GalleryFragment extends Fragment {

    private RecyclerView recyclerView;
    private LabelsAdapter adapter;
    private LabelViewModel labelViewModel;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_gallery, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // --- 1. אתחול ה-ViewModel ---
        // חשוב לאתחל את ה-ViewModel לפני ה-Adapter
        labelViewModel = new ViewModelProvider(this).get(LabelViewModel.class);

        // --- 2. אתחול ה-RecyclerView וה-Adapter ---
        recyclerView = view.findViewById(R.id.recyclerViewLabels); // ודא שזה ה-ID הנכון בקובץ ה-XML שלך

        // יצירת ה-Adapter והעברת ה-ViewModel, כפי שהקונסטרוקטור דורש
        adapter = new LabelsAdapter(labelViewModel);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        // --- 3. הגדרת המאזין (Observer) לתוצאות מה-API ---
        labelViewModel.getLabelsApiResult().observe(getViewLifecycleOwner(), result -> {
            if (result instanceof Result.Success) {
                // הצלחה! קבלנו רשימה של לייבלים מהשרת
                List<Label> apiLabels = ((Result.Success<List<Label>>) result).getData();
                adapter.setLabels(apiLabels);
            } else if (result instanceof Result.Error) {
                // שגיאה מהשרת או מהרשת
                Exception error = ((Result.Error) result).getError();
                Toast.makeText(getContext(), "Error: " + error.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        // --- 4. טעינה ראשונית של הנתונים ---
        // קריאה למתודה שתפעיל את קריאת ה-API
        labelViewModel.fetchLabelsFromApi();
    }

    // הפונקציות toLabel ו-insertMockLabels אינן נחוצות יותר בקובץ הזה,
    // מכיוון שאנחנו לא עובדים יותר עם LabelEntity ונתוני דמה כאן.
    // אפשר למחוק אותן בבטחה.
}