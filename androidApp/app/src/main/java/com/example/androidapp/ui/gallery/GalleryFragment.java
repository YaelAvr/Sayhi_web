package com.example.androidapp.ui.gallery;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.androidapp.model.Label;
import com.example.androidapp.R;
import com.example.androidapp.data.model.LabelEntity;

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

        recyclerView = view.findViewById(R.id.recyclerViewLabels);
        adapter = new LabelsAdapter();
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(adapter);

        labelViewModel = new ViewModelProvider(
                this,
                new ViewModelProvider.AndroidViewModelFactory(requireActivity().getApplication())
        ).get(LabelViewModel.class);
        labelViewModel.getAllLabels().observe(getViewLifecycleOwner(), labelEntities -> {
            List<Label> labels = new ArrayList<>();
            for (LabelEntity entity : labelEntities) {
                labels.add(toLabel(entity));
            }
            adapter.setLabels(labels);
        });

        // לצורך בדיקה בלבד - הכנסת תוויות דמה
        insertMockLabels(); // אפשר למחוק את זה אחר כך
    }

    private Label toLabel(LabelEntity entity) {
        Label label = new Label();
        label.setId(entity.getId());
        label.setName(entity.getName());
        label.setMails(entity.getMails());
        label.setDefault(entity.isDefault());
        label.setAllowAdd(entity.isAllowAdd());
        label.setUser(entity.getUser());
        return label;
    }

    private void insertMockLabels() {
        labelViewModel.clear();

        LabelEntity label1 = new LabelEntity();
        label1.setId("1");
        label1.setName("Important");
        label1.setDefault(true);
        label1.setAllowAdd(true);
        label1.setUser("user1");

        LabelEntity label2 = new LabelEntity();
        label2.setId("2");
        label2.setName("School");
        label2.setDefault(false);
        label2.setAllowAdd(true);
        label2.setUser("user1");

        labelViewModel.insert(label1);
        labelViewModel.insert(label2);
    }
}