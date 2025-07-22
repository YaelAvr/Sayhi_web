package com.example.androidapp.ui.gallery;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.model.Label;
import com.example.androidapp.R;
import com.example.androidapp.ui.home.HomeViewModel;

import java.util.ArrayList;
import java.util.List;

public class LabelsAdapter extends RecyclerView.Adapter<LabelsAdapter.LabelViewHolder> {

    private List<Label> labels = new ArrayList<>();
    private final LabelViewModel viewModel; // <-- תוקן!

    public LabelsAdapter(LabelViewModel viewModel) { // <-- תוקן!
        this.viewModel = viewModel;
    }

    @Override
    public LabelViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_label, parent, false);
        return new LabelViewHolder(view);
    }

    @Override
    public void onBindViewHolder(LabelViewHolder holder, int position) {
        Label currentLabel = labels.get(position);

        // הקוד שלך להצגת המידע - הוא תקין ונשאר פה
        try {
            String labelName = currentLabel.getName();
            if (holder.textViewLabelName != null) {
                if (labelName == null || labelName.isEmpty()) {
                    holder.textViewLabelName.setText("(No Name)");
                } else {
                    holder.textViewLabelName.setText(labelName);
                }
            }
            if (holder.iconLabel != null) {
                int iconResId = R.drawable.ic_custom_label;
                if (labelName != null && !labelName.isEmpty()) {
                    Context context = holder.itemView.getContext();
                    String resourceName = "ic_" + labelName.toLowerCase();
                    int foundResId = context.getResources().getIdentifier(resourceName, "drawable", context.getPackageName());
                    if (foundResId != 0) { iconResId = foundResId; }
                }
                holder.iconLabel.setImageResource(iconResId);
            }
        } catch (Exception e) {
            Toast.makeText(holder.itemView.getContext(), "Crash in Adapter: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }

        // ======================= החלק החשוב ששכחת =======================
        // כאן אנחנו מגדירים מה קורה כשלוחצים על שורת הלייבל כולה
        holder.itemView.setOnClickListener(v -> {
            // קוראים למתודה ב-ViewModel שהגדרנו קודם
            viewModel.onLabelClicked(currentLabel);
        });
        // ===================================================================
    }

    @Override
    public int getItemCount() {
        return labels.size();
    }

    public void setLabels(List<Label> labels) {
        this.labels = labels;
        notifyDataSetChanged();
    }

    // אין צורך במתודה הזו אם משתמשים ב-LiveData
    // public void addLabel(Label label) { ... }

    // ================== שינוי: הסרנו את המילה 'static' ==================
    class LabelViewHolder extends RecyclerView.ViewHolder {
        ImageView iconLabel;
        TextView textViewLabelName;

        public LabelViewHolder(View itemView) {
            super(itemView);
            iconLabel = itemView.findViewById(R.id.icon_label);
            textViewLabelName = itemView.findViewById(R.id.textViewLabelName);
        }
    }
}
