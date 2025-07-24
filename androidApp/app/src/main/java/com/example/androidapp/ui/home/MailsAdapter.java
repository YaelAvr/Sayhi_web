package com.example.androidapp.ui.home;

import android.graphics.Typeface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.RecyclerView;
import com.example.androidapp.model.Mail;
import com.example.androidapp.R;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MailsAdapter extends RecyclerView.Adapter<MailsAdapter.MailViewHolder> {

    private List<Mail> mails = new ArrayList<>();

    @NonNull
    @Override
    public MailViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_mail, parent, false);
        return new MailViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MailViewHolder holder, int position) {
        Mail currentMail = mails.get(position);

        holder.textFrom.setText(currentMail.getFromName());
        holder.textSubject.setText(currentMail.getSubject());
        holder.textPreview.setText(currentMail.getBody());

        if (currentMail.getTime() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("MMM d, HH:mm", Locale.getDefault());
            holder.textTime.setText(sdf.format(currentMail.getTime()));
        }

        if (!currentMail.isRead()) {
            holder.textFrom.setTypeface(null, Typeface.BOLD);
            holder.textSubject.setTypeface(null, Typeface.BOLD);
        } else {
            holder.textFrom.setTypeface(null, Typeface.NORMAL);
            holder.textSubject.setTypeface(null, Typeface.NORMAL);
        }

        holder.itemView.setOnClickListener(v -> {
            Bundle bundle = new Bundle();
            bundle.putString("mailId", currentMail.getId());

            NavController navController = Navigation.findNavController(v);
            navController.navigate(R.id.singleMailFragment, bundle);
        });
    }

    @Override
    public int getItemCount() {
        return mails.size();
    }

    public void setMails(List<Mail> mails) {
        this.mails = mails;
        notifyDataSetChanged();
    }

    static class MailViewHolder extends RecyclerView.ViewHolder {
        TextView textFrom, textSubject, textPreview, textTime;

        public MailViewHolder(@NonNull View itemView) {
            super(itemView);
            textFrom = itemView.findViewById(R.id.text_from);
            textSubject = itemView.findViewById(R.id.text_subject);
            textPreview = itemView.findViewById(R.id.text_preview);
            textTime = itemView.findViewById(R.id.text_time);
        }
    }
}