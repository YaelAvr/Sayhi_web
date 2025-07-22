package com.example.androidapp.ui.gallery;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
// import androidx.annotation.NonNull; // הסרנו את ה-import
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.model.Label;
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
    public void onBindViewHolder(LabelViewHolder holder, int position) {
        try {
            // כל הקוד המקורי שלך נמצא כאן
            Label currentLabel = labels.get(position);
            String labelName = currentLabel.getName();

            // בודקים אם הרכיבים קיימים לפני שמשתמשים בהם
            if (holder.textViewLabelName != null) {
                if (labelName == null || labelName.isEmpty()) {
                    holder.textViewLabelName.setText("(No Name)");
                } else {
                    holder.textViewLabelName.setText(labelName);
                }
            }

            if (holder.iconLabel != null) {
                int iconResId = R.drawable.ic_custom_label; // ערך ברירת מחדל
                if (labelName != null && !labelName.isEmpty()) {
                    Context context = holder.itemView.getContext();
                    String resourceName = "ic_" + labelName.toLowerCase();
                    int foundResId = context.getResources().getIdentifier(resourceName, "drawable", context.getPackageName());
                    if (foundResId != 0) {
                        iconResId = foundResId;
                    }
                }
                holder.iconLabel.setImageResource(iconResId);
            }

        } catch (Exception e) {
            // ================== זה החלק החשוב! ==================
            // אם בכל זאת מתרחשת קריסה, נציג אותה על המסך
            Toast.makeText(
                    holder.itemView.getContext(),
                    "Crash in Adapter: " + e.getMessage(), // <-- זה יציג את הודעת השגיאה המדויקת
                    Toast.LENGTH_LONG
            ).show();
            // =======================================================
        }
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