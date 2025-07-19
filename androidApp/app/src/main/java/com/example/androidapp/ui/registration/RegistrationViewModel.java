package com.example.androidapp.ui.registration;


import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class RegistrationViewModel extends ViewModel {

    private final MutableLiveData<String> firstName = new MutableLiveData<>();
    private final MutableLiveData<String> lastName = new MutableLiveData<>();

    public void setFirstName(String name) { firstName.setValue(name); }
    public void setLastName(String name) { lastName.setValue(name); }
    public LiveData<String> getFirstName() { return firstName; }
    public LiveData<String> getLastName() { return lastName; }
    }