package com.example.androidapp.ui.registration;


import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class RegistrationViewModel extends ViewModel {

    private final MutableLiveData<String> username = new MutableLiveData<>();
    private final MutableLiveData<String> password = new MutableLiveData<>();
    private final MutableLiveData<String> displayName = new MutableLiveData<>();

    private final MutableLiveData<Boolean> registrationSuccess = new MutableLiveData<>();
    private final MutableLiveData<String> errorMessage = new MutableLiveData<>();

    public void setUsername(String value) {
        username.setValue(value);
    }

    public void setPassword(String value) {
        password.setValue(value);
    }

    public void setDisplayName(String value) {
        displayName.setValue(value);
    }

    public LiveData<Boolean> getRegistrationSuccess() {
        return registrationSuccess;
    }

    public LiveData<String> getErrorMessage() {
        return errorMessage;
    }

    public void register() {
        String user = username.getValue();
        String pass = password.getValue();
        String name = displayName.getValue();

        if (user == null || pass == null || name == null || user.isEmpty() || pass.isEmpty() || name.isEmpty()) {
            errorMessage.setValue("All fields are required.");
            registrationSuccess.setValue(false);
            return;
        }

        // כאן אמורה להיות קריאה לריפוזיטורי (Repository) – אבל נוסיף את זה בשלבים.
        // כרגע רק נריץ סימולציה מוצלחת:
        registrationSuccess.setValue(true);
    }
}