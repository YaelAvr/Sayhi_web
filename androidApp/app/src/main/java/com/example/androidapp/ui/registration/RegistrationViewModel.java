package com.example.androidapp.ui.registration;

import android.net.Uri;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.io.File;

public class RegistrationViewModel extends ViewModel {

    private final MutableLiveData<String> firstName = new MutableLiveData<>();
    private final MutableLiveData<String> lastName = new MutableLiveData<>();

    // Birthday (day, month, year)
    private final MutableLiveData<Integer> birthDay = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthMonth = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthYear = new MutableLiveData<>();

    // Gender
    private final MutableLiveData<String> gender = new MutableLiveData<>();

    private String username;
    private String password;
    private File profilePictureFile;

    // === Setters ===
    public void setFirstName(String name) { firstName.setValue(name); }
    public void setLastName(String name) { lastName.setValue(name); }
    public void setBirthDate(int day, int month, int year) {
        birthDay.setValue(day);
        birthMonth.setValue(month);
        birthYear.setValue(year);
    }
    public void setGender(String g) { gender.setValue(g); }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setProfilePictureFile(File file) { this.profilePictureFile = file; }

    // === Getters ===
    public LiveData<String> getFirstName() { return firstName; }
    public LiveData<String> getLastName() { return lastName; }
    public LiveData<String> getGender() { return gender; }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public File getProfilePictureFile() { return profilePictureFile; }

    public Integer getBirthDay() { return birthDay.getValue(); }
    public Integer getBirthMonth() { return birthMonth.getValue(); }
    public Integer getBirthYear() { return birthYear.getValue(); }

    // Returns a formatted string for the birthdate, like "25/12/2000"
    public String getFormattedBirthDate() {
        Integer day = getBirthDay();
        Integer month = getBirthMonth();
        Integer year = getBirthYear();
        if (day == null || month == null || year == null) return "";
        return String.format("%02d/%02d/%04d", day, month, year);
    }

    // Reset all fields (used when restarting the registration)
    public void clearAll() {
        firstName.setValue(null);
        lastName.setValue(null);
        birthDay.setValue(null);
        birthMonth.setValue(null);
        birthYear.setValue(null);
        gender.setValue(null);
        username = null;
        password = null;
        profilePictureFile = null;
    }
}
