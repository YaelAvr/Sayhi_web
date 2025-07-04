package com.example.androidapp.ui.gallery;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.ApiService;
import com.example.androidapp.Label;
import com.example.androidapp.R;
import com.example.androidapp.RetrofitClient;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GalleryFragment extends Fragment {

    private RecyclerView recyclerView;
    private ProgressBar progressBar;
    private LabelsAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // "ניפוח" התצוגה של הפרגמנט
        return inflater.inflate(R.layout.fragment_gallery, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // קישור הרכיבים מה-XML
        recyclerView = view.findViewById(R.id.recyclerViewLabels);
        progressBar = view.findViewById(R.id.progressBar);

        // הגדרת ה-RecyclerView וה-Adapter
        setupRecyclerView();

        // ביצוע קריאת ה-API
        fetchLabels();
    }

    private void setupRecyclerView() {
        adapter = new LabelsAdapter();
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);
    }

    private void fetchLabels() {
        progressBar.setVisibility(View.VISIBLE); // הצג את סרגל ההתקדמות

        // !!! חשוב מאוד !!!
        // עליך להשיג את טוקן האימות שלך (למשל, אחרי שהמשתמש התחבר)
        // כרגע נשים כאן ערך דמה. החלף אותו בטוקן האמיתי שלך.
        String authToken = "Bearer YOUR_ACTUAL_TOKEN_HERE";

        ApiService apiService = RetrofitClient.getClient().create(ApiService.class);
        Call<List<Label>> call = apiService.getLabels(authToken);

        call.enqueue(new Callback<List<Label>>() {
            @Override
            public void onResponse(Call<List<Label>> call, Response<List<Label>> response) {
                progressBar.setVisibility(View.GONE); // הסתר את סרגל ההתקדמות

                if (response.isSuccessful() && response.body() != null) {
                    // הקריאה הצליחה! עדכן את ה-Adapter עם הנתונים
                    adapter.setLabels(response.body());
                } else {
                    // שגיאה מהשרת (למשל, 401 Unauthorized, 404 Not Found)
                    Toast.makeText(getContext(), "Error: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<Label>> call, Throwable t) {
                progressBar.setVisibility(View.GONE); // הסתר את סרגל ההתקדמות
                // שגיאת רשת (אין אינטרנט, שרת לא זמין)
                Toast.makeText(getContext(), "Failure: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}