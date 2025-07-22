package com.example.androidapp.ui.registration;


import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class RegistrationViewModel extends ViewModel {

    private final MutableLiveData<String> firstName = new MutableLiveData<>();
    private final MutableLiveData<String> lastName = new MutableLiveData<>();
    // תאריך לידה (יום, חודש, שנה)
    private final MutableLiveData<Integer> birthDay = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthMonth = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthYear = new MutableLiveData<>();

    // מגדר
    private final MutableLiveData<String> gender = new MutableLiveData<>();
    private String username;
    private String password;



    public void setFirstName(String name) { firstName.setValue(name); }
    public void setLastName(String name) { lastName.setValue(name); }
    public void setBirthDate(int day, int month, int year) {
        birthDay.setValue(day);
        birthMonth.setValue(month);
        birthYear.setValue(year);
    }

    public void setGender(String g) {
        gender.setValue(g);
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public LiveData<String> getFirstName() { return firstName; }
    public LiveData<String> getLastName() { return lastName; }
    public LiveData<String> getGender() { return gender; }
    public String getUsername() { return username;
    }
    public String getPassword() {
        return password;
    }

}

