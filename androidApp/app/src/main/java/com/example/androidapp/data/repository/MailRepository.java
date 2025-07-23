package com.example.androidapp.data.repository;

import android.app.Application;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.WebApi.MailApi;
import com.example.androidapp.data.dao.MailDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.MailEntity;
import com.google.gson.JsonObject;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MailRepository {

    private final MailDao mailDao;
    private final MailApi mailApi;
    private final ExecutorService executorService;


    public MailRepository(Application application) {
        AppDB db = AppDB.getInstance(application);
        mailDao = db.mailDao();
        executorService = Executors.newSingleThreadExecutor();
        mailApi = new MailApi(application, mailDao);
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

    public LiveData<MailEntity> getMailById(String id) {
        return mailDao.getMailById(id);
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

}