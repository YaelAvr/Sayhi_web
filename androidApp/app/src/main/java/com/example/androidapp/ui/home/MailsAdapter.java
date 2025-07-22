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

import java.text.SimpleDateFormat; // <-- הוסף את ה-import הזה
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

    // ======================= תחילת שינוי =======================
    @Override
    public void onBindViewHolder(@NonNull MailViewHolder holder, int position) {
        Mail currentMail = mails.get(position);

        // שימוש בשדות המעודכנים מהמודל החדש
        holder.textFrom.setText(currentMail.getFromName());
        holder.textSubject.setText(currentMail.getSubject());
        holder.textPreview.setText(currentMail.getBody()); // נשתמש ב-body המלא כתצוגה מקדימה

        // עיצוב התאריך והשעה בצורה יפה
        if (currentMail.getTime() != null) {
            // דוגמה פשוטה: מציג רק שעה ותאריך
            SimpleDateFormat sdf = new SimpleDateFormat("MMM d, HH:mm", Locale.getDefault());
            holder.textTime.setText(sdf.format(currentMail.getTime()));
        }

        // אם המייל לא נקרא, נדגיש את הטקסט
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

        // בעתיד: כאן יהיה קוד לטעינת תמונה מ-currentMail.getFromPicture() לתוך holder.iconAvatar
    }
    // ======================= סוף שינוי =======================

    @Override
    public int getItemCount() {
        return mails.size();
    }

    public void setMails(List<Mail> mails) {
        this.mails = mails;
        notifyDataSetChanged();
    }

    static class MailViewHolder extends RecyclerView.ViewHolder {
        // הוספנו פה את ה-ImageView של האווטאר
        // ImageView iconAvatar;
        TextView textFrom, textSubject, textPreview, textTime;

        public MailViewHolder(@NonNull View itemView) {
            super(itemView);
            // iconAvatar = itemView.findViewById(R.id.icon_avatar);
            textFrom = itemView.findViewById(R.id.text_from);
            textSubject = itemView.findViewById(R.id.text_subject);
            textPreview = itemView.findViewById(R.id.text_preview);
            textTime = itemView.findViewById(R.id.text_time);
        }
    }
}