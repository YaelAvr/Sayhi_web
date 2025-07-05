package com.example.androidapp.ui.gallery;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
// import androidx.annotation.NonNull; // הסרנו את ה-import
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.Label;
import com.example.androidapp.R;
import java.util.ArrayList;
import java.util.List;

public class LabelsAdapter extends RecyclerView.Adapter<LabelsAdapter.LabelViewHolder> {

    private List<Label> labels = new ArrayList<>();

    // הוסר @NonNull
    @Override
    public LabelViewHolder onCreateViewHolder(ViewGroup parent, int viewType) { // הוסר @NonNull מהפרמטר
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_label, parent, false);
        return new LabelViewHolder(view);
    }

    @Override
    public void onBindViewHolder(LabelViewHolder holder, int position) { // הוסר @NonNull מהפרמטר
        Label currentLabel = labels.get(position);
        holder.textViewLabelName.setText(currentLabel.getName());

        // --- לוגיקה דינמית למציאת אייקון ---
        int iconResId;
        Context context = holder.itemView.getContext();

        // בניית שם המשאב לפי קונבנציה: "ic_" + "שם הלייבל באותיות קטנות"
        String resourceName = "ic_" + currentLabel.getName().toLowerCase();

        // חיפוש ה-ID של המשאב
        iconResId = context.getResources().getIdentifier(resourceName, "drawable", context.getPackageName());

        // אם לא נמצא ID (התוצאה היא 0), השתמש באייקון ברירת מחדל
        if (iconResId == 0) {
            iconResId = R.drawable.ic_custom_label;
        }

        // הגדרת האייקון ב-ImageView
        holder.iconLabel.setImageResource(iconResId);
    }

    @Override
    public int getItemCount() {
        return labels.size();
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
        notifyDataSetChanged();
    }

    public void addLabel(Label label) {
        this.labels.add(label);
        notifyItemInserted(labels.size() - 1);
    }

    static class LabelViewHolder extends RecyclerView.ViewHolder {
        ImageView iconLabel;
        TextView textViewLabelName;

        public LabelViewHolder(View itemView) { // הוסר @NonNull מהפרמטר
            super(itemView);
            iconLabel = itemView.findViewById(R.id.icon_label);
            textViewLabelName = itemView.findViewById(R.id.textViewLabelName);
        }
    }
}