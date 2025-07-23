package com.example.androidapp.ui.editmail;

import android.app.Application;

import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.repository.MailRepository;
import com.example.androidapp.model.Mail;
import com.google.gson.JsonObject;

public class EditNewMailViewModel extends AndroidViewModel {
    private final MailRepository mailRepository;
    private final MediatorLiveData<Result<Void>> sendResult = new MediatorLiveData<>();

    public EditNewMailViewModel(Application application) {
        super(application);
        this.mailRepository = new MailRepository(application);
    }

    public LiveData<Result<Void>> getSendResult() {
        return sendResult;
    }

    public void sendMail(String to, String subject, String body) {
        JsonObject jsonBody = setApiReqJSON(to, subject, body);


        final LiveData<Result<Void>> source = mailRepository.createMail(jsonBody);
        sendResult.addSource(source, result -> {
            sendResult.setValue(result);
            sendResult.removeSource(source);
        });
    }


    public JsonObject setApiReqJSON(String to, String subject, String body) {
        String finalTo;
        String finalSubject = (subject == null) ? "" : subject;
        String finalBody = (body == null) ? "" : body;

        if (to == null) {
            finalTo = "";
        } else if (to.endsWith("@sayhi.com")) {
            finalTo = to.split("@sayhi.com")[0];
        } else {
            finalTo = to.split("@sayhi.com")[0];

        }

        JsonObject jsonBody = new JsonObject();
        // Add the guaranteed non-null properties to the JSON body.
        jsonBody.addProperty("to", finalTo);
        jsonBody.addProperty("subject", finalSubject);
        jsonBody.addProperty("body", finalBody);

        return jsonBody;
    }

    // You could also have a saveDraft method
    public void saveDraftOnExit(String to, String subject, String body) {
        // Logic to save draft if the user navigates away
        JsonObject jsonBody = setApiReqJSON(to, subject, body);


        final LiveData<Result<Mail>> source = mailRepository.createDraft(jsonBody);
        sendResult.addSource(source, result -> {

            // 3. THE REFRESH: If the send was successful, tell the repository
            //    to refresh the data for the "Sent" and "Inbox" labels.
            //    This will update the local database with the new mail.
            if (result instanceof Result.Success) {
                sendResult.setValue(new Result.Success<>(null));
//                MailEntity draft = ((Result.Success<Mail>) result).getData();
//
//                mailRepository.insertMail(draft);


            } else if (result instanceof Result.Error) {
                String errorMessage = ((Result.Error) result).getError().getMessage();
                sendResult.setValue(new Result.Error(new Exception(errorMessage)));
            }
            sendResult.removeSource(source);
        });
    }


}