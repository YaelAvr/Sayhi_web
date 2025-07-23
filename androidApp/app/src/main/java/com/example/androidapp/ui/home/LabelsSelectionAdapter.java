package com.example.androidapp.ui.home; // או החבילה המתאימה

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.google.android.material.checkbox.MaterialCheckBox;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.R;
import com.example.androidapp.model.Label;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class LabelsSelectionAdapter extends RecyclerView.Adapter<LabelsSelectionAdapter.ViewHolder> {

    private List<Label> allLabels = new ArrayList<>();
    private final List<String> selectedLabelNames = new ArrayList<>();

    public LabelsSelectionAdapter() {}

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_label_checkbox, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bind(allLabels.get(position));
    }

    @Override
    public int getItemCount() {
        return allLabels.size();
    }

    public void setLabels(List<Label> labels) {
        if (labels == null) {
            this.allLabels = new ArrayList<>();
        } else {
            // סינון תוויות מערכת שאי אפשר להוסיף אליהן מיילים
            this.allLabels = labels.stream().filter(Label::isAllowAdd).collect(Collectors.toList());
        }
        notifyDataSetChanged();
    }

    public List<String> getSelectedLabelNames() {
        return selectedLabelNames;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        private final MaterialCheckBox checkBox;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            checkBox = itemView.findViewById(R.id.label_checkbox);
        }

        void bind(final Label label) {
            checkBox.setText(label.getName());
            checkBox.setChecked(selectedLabelNames.contains(label.getName()));

            checkBox.setOnCheckedChangeListener((buttonView, isChecked) -> {
                if (isChecked) {
                    if (!selectedLabelNames.contains(label.getName())) {
                        selectedLabelNames.add(label.getName());
                    }
                } else {
                    selectedLabelNames.remove(label.getName());
                }
            });
        }
    }
}