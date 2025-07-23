package com.example.androidapp.ui.home;

import android.app.Dialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.model.Label;

import java.util.List;

public class AddToLabelDialogFragment extends DialogFragment {

    // --- נשתמש רק ב-MailViewModel, אין צורך ב-LabelViewModel כאן ---
    private MailViewModel viewModel;
    private LabelsSelectionAdapter adapter;
    private ProgressBar progressBar;

    public interface AddToLabelListener {
        void onLabelsSelected(List<String> selectedLabelNames);
    }
    private AddToLabelListener listener;

    public static AddToLabelDialogFragment newInstance() {
        return new AddToLabelDialogFragment();
    }

    public void setListener(AddToLabelListener listener) {
        this.listener = listener;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(requireActivity());
        LayoutInflater inflater = requireActivity().getLayoutInflater();
        View view = inflater.inflate(R.layout.dialog_add_to_label, null);

        // --- אתחול ה-ViewModel הנכון ---
        viewModel = new ViewModelProvider(requireActivity()).get(MailViewModel.class);

        RecyclerView recyclerView = view.findViewById(R.id.labels_recycler_view);
        progressBar = view.findViewById(R.id.progress_bar);
        adapter = new LabelsSelectionAdapter();
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        // --- קריאה לפונקציות הנכונות מתוך MailViewModel ---
        progressBar.setVisibility(View.VISIBLE);

        // 1. קריאה לפונקציה שמפעילה את קבלת התוויות מהשרת
        viewModel.fetchAllLabels();

        // 2. האזנה ל-LiveData שמחזיק את תוצאת הבקשה
        viewModel.getLabelsResult().observe(this, result -> {
            progressBar.setVisibility(View.GONE);
            if (result instanceof Result.Success) {
                // פיצול לשורות נפרדות למניעת שגיאת קומפילציה
                Result.Success<List<Label>> successResult = (Result.Success<List<Label>>) result;
                List<Label> labels = successResult.getData();
                adapter.setLabels(labels);

            } else {
                Toast.makeText(getContext(), "Failed to load labels", Toast.LENGTH_SHORT).show();
                dismiss();
            }
        });

        Button addButton = view.findViewById(R.id.button_add);
        Button cancelButton = view.findViewById(R.id.button_cancel);

        addButton.setOnClickListener(v -> {
            if (listener != null) {
                listener.onLabelsSelected(adapter.getSelectedLabelNames());
            }
            dismiss();
        });

        cancelButton.setOnClickListener(v -> dismiss());

        builder.setView(view);
        return builder.create();
    }
}