package com.example.androidapp.data.repository;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.WebApi.MailAPI;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.MailEntity;
import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MailRepository {

    // --- משתנים לעבודה עם מסד נתונים פנימי (Room) ---
    private final MailDao mailDao;
    private final MailAPI mailApi;
    private final ExecutorService executorService;
    
    // --- Callback להחזרת תוצאות מה-API ---
    public interface MailCallback {
        void onComplete(Result<List<Mail>> result);
    }

    public MailRepository(Application application) {
        // אתחול לעבודה עם Room
        AppDB db = AppDB.getInstance(application);
        mailDao = db.mailDao();
        executorService = Executors.newSingleThreadExecutor();
        mailApi = new MailAPI(application, mailDao);
    }

    public LiveData<Result<Void>> deleteMailById(String mailId) {
        MediatorLiveData<Result<Void>> resultLiveData = new MediatorLiveData<>();

        // 1. בצע את קריאת ה-API למחיקה בשרת
        final LiveData<Result<Void>> source = mailApi.deleteMail(mailId);

        // 2. האזן לתוצאה מהשרת
        resultLiveData.addSource(source, apiResult -> {
            if (apiResult instanceof Result.Success) {
                // 3. אם המחיקה בשרת הצליחה, מחק מה-DB המקומי
                executorService.execute(() -> {
                    mailDao.deleteMailById(mailId);
                });
                // 4. דווח ל-ViewModel שהכל הצליח
                resultLiveData.postValue(new Result.Success<>(null));
            } else if (apiResult instanceof Result.Error) {
                // 5. אם המחיקה בשרת נכשלה, העבר את השגיאה ל-ViewModel
                resultLiveData.postValue(apiResult);
            }
            // נקה את המקור כדי למנוע האזנה כפולה
            resultLiveData.removeSource(source);
        });

        return resultLiveData;
    }

    class MailsData extends MutableLiveData<List<MailEntity>> {
        public MailsData(){
            super();
            setValue(new LinkedList<MailEntity>());
        }

        @Override
        protected void onActive() {
            super.onActive();
            new Thread(()->{
                Log.i("UserRepo", "in tread " );
                //TO-DO fix userDao function and then fix this line
//                usersData.postValue(userDao.getAllUsernames());
            }).start();
        }
    }

    // --- מתודות קיימות לעבודה עם Room (נשארות למקרה הצורך) ---
    public LiveData<List<MailEntity>> getAllMails() {
        return mailDao.getAllMails();
    }

    public void insertMail(MailEntity mail) {
        executorService.execute(() -> mailDao.insertMail(mail));
    }

    public void deleteMail(MailEntity mail) {
        executorService.execute(() -> mailDao.deleteMail(mail));
    }

    public void clearAllMails() {
        executorService.execute(mailDao::clearAllMails);
    }
    public LiveData<Result<Mail>> getMailById(String mailId) {
        MutableLiveData<Result<Mail>> resultLiveData = new MutableLiveData<>();

        mailApi.getMailById(mailId).enqueue(new Callback<Mail>() {
            @Override
            public void onResponse(Call<Mail> call, Response<Mail> response) {
                if (response.isSuccessful() && response.body() != null) {
                    resultLiveData.postValue(new Result.Success<>(response.body()));
                } else {
                    resultLiveData.postValue(new Result.Error(new Exception("Failed to fetch mail: " + response.message())));
                }
            }

            @Override
            public void onFailure(Call<Mail> call, Throwable t) {
                resultLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });

        return resultLiveData;
}
    public void getMailsByLabel(String labelId, int offset, final MailCallback callback) {
        // אין צורך להצהיר על offset, אנחנו משתמשים בערך שהתקבל כפרמטר
        mailApi.getMailsByLabel(labelId, offset).enqueue(new Callback<List<Mail>>() {
            @Override
            public void onResponse(Call<List<Mail>> call, Response<List<Mail>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    callback.onComplete(new Result.Success<>(response.body()));
                } else {
                    callback.onComplete(new Result.Error(new Exception("API Error loading mails: " + response.code())));
                }
            }

            @Override
            public void onFailure(Call<List<Mail>> call, Throwable t) {
                callback.onComplete(new Result.Error(new Exception("Network Error loading mails: " + t.getMessage())));
            }
        });
    }

    public LiveData<Result<Void>> createMail(JsonObject jsonBody) {
//        MediatorLiveData<Result<Void>> resultLiveData = new MediatorLiveData<>();
//        final LiveData<Result<Void>> source = mailApi.createMail(jsonBody);
//
//        resultLiveData.addSource(source, apiResult -> {
//            if (apiResult instanceof Result.Success) {
//                // 2. The API call was successful. Get the draft object from the server.
//                MailEntity mailFromServer = ((Result.Success<MailEntity>) apiResult).getData();
//
//                // 3. THIS IS THE ANSWER: Save the draft to the local Room database.
//                // We use our executor to do this on a background thread.
//                executorService.execute(() -> {
//                    mailDao.insertMail(mailFromServer);
//                });
//
//                // 4. Notify the ViewModel that the entire operation was a success.
//                resultLiveData.postValue(new Result.Success<>(null));
//
//            } else if (apiResult instanceof Result.Error) {
//
//                // The API call failed. Report the error directly to the ViewModel.
//                Exception error = ((Result.Error) apiResult).getError();
//                resultLiveData.postValue(new Result.Error(new Exception(error.getMessage())));
//                Log.e("mailRepo_createMail", "response.code(): " + error.getMessage());
//
//            }
//            // Clean up the source
//            resultLiveData.removeSource(source);
//        });
//
//        return resultLiveData;
        return mailApi.createMail(jsonBody);
    }


    public LiveData<Result<Mail>> createDraft(JsonObject jsonBody) {
        return mailApi.createDraft(jsonBody);
    }
//    public LiveData<Result<List<MailEntity>>> refreshMailsForLabel(String labelName) {
//        // This would call a new method in your MailApi to fetch mails from the server
//        // and then save the new list to the Room database.
//        // For now, we'll assume this logic exists.
//        return mailApi.getMailsByLabel(labelName,0); // Example method
//    }
}