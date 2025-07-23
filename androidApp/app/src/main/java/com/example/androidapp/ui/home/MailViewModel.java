package com.example.androidapp.ui.home;

import android.app.Application;
import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.model.Mail;

import java.util.List;

public class MailViewModel extends AndroidViewModel {

    private final MailRepository repository;
    private final MutableLiveData<Result<List<Mail>>> mailsApiResult = new MutableLiveData<>();

    // ================== הוספנו LiveData חדש למייל הנבחר ==================
    private final MutableLiveData<Mail> selectedMail = new MutableLiveData<>();
    // ====================================================================

    public MailViewModel(@NonNull Application application) {
        super(application);
        repository = new MailRepository(application);
    }

    // --- מתודות לעבודה עם ה-API ---
    public LiveData<Result<List<Mail>>> getMailsResult() {
        return mailsApiResult;
    }

    public void fetchMailsByLabel(String labelId) {
        // אנחנו קובעים את ה-offset ל-0 כדי לקבל את המיילים הראשונים
        int offset = 0;

        // עכשיו הקריאה כוללת את כל הפרמטרים הנדרשים
        repository.getMailsByLabel(labelId, offset, new MailRepository.MailCallback() {
            @Override
            public void onComplete(Result<List<Mail>> result) {
                mailsApiResult.postValue(result);
            }
        });
    }

    // ================== זו המתודה המתוקנת והחשובה ==================
    /**
     * מחזיר LiveData שמכיל את המייל שנבחר.
     * ה-SingleMailFragment יאזין לזה.
     */
    public LiveData<Mail> getSelectedMail() {
        return selectedMail;
    }

    /**
     * מחפש מייל לפי ID ברשימה שכבר נטענה מה-API
     * ומעדכן את ה-LiveData של המייל הנבחר.
     * @param mailId ה-ID של המייל שיש למצוא.
     */
    public void findMailById(String mailId) {
        // ודא שתוצאת ה-API אינה null והיא הצלחה
        Result<List<Mail>> result = mailsApiResult.getValue();
        if (result instanceof Result.Success) {
            List<Mail> currentMails = ((Result.Success<List<Mail>>) result).getData();
            if (currentMails != null) {
                // עבור על כל המיילים ברשימה
                for (Mail mail : currentMails) {
                    // אם מצאנו מייל עם ה-ID המתאים
                    if (mail.getId().equals(mailId)) {
                        // עדכן את ה-LiveData והפסק את החיפוש
                        selectedMail.setValue(mail);
                        return;
                    }
                }
            }
        }
        // אם לא מצאנו את המייל (או שאין רשימה), עדכן ל-null
        selectedMail.setValue(null);
    }
    // ====================================================================
}