package com.example.androidapp.ui.gallery; // ודא שהחבילה נכונה

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.Label;
import com.example.androidapp.R;
import java.util.ArrayList;
import java.util.List;


public class LabelsAdapter extends RecyclerView.Adapter<LabelsAdapter.LabelViewHolder> {

    private List<Label> labels = new ArrayList<>();

    @NonNull
    @Override
    public LabelViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_label, parent, false);
        return new LabelViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull LabelViewHolder holder, int position) {
        Label currentLabel = labels.get(position);
        holder.textViewLabelName.setText(currentLabel.getName());
    }

    @Override
    public int getItemCount() {
        return labels.size();
    }

    // פונקציה לעדכון הרשימה מבחוץ
    public void setLabels(List<Label> labels) {
        this.labels = labels;
        notifyDataSetChanged(); // מרענן את התצוגה
    }

    // ViewHolder שמחזיק את הרכיבים של כל שורה
    static class LabelViewHolder extends RecyclerView.ViewHolder {
        private TextView textViewLabelName;

        public LabelViewHolder(@NonNull View itemView) {
            super(itemView);
            textViewLabelName = itemView.findViewById(R.id.textViewLabelName);
        }
    }

    // --- הוסף את הפונקציה החדשה הזו ---
    public void addLabel(Label label) {
        this.labels.add(label);
        // נודיע ל-Adapter שפריט חדש נוסף בסוף הרשימה.
        // זה יותר יעיל מ-notifyDataSetChanged()
        notifyItemInserted(labels.size() - 1);
    }
}