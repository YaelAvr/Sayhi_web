package com.example.androidapp.ui.registration;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.model.NewUserRequest;
import com.example.androidapp.data.model.User;
import com.example.androidapp.data.repository.UserRepository;

import java.io.File;



public class RegistrationViewModel extends ViewModel {
    private UserRepository userRepository;
    private final MutableLiveData<Result<User>> createUserResult = new MutableLiveData<>();

    private final MutableLiveData<String> firstName = new MutableLiveData<>();
    private final MutableLiveData<String> lastName = new MutableLiveData<>();
    private final MutableLiveData<Result<String>> displayNameResult = new MutableLiveData<>();

    // Birthday (day, month, year)
    private final MutableLiveData<Integer> birthDay = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthMonth = new MutableLiveData<>();
    private final MutableLiveData<Integer> birthYear = new MutableLiveData<>();

    // Gender
    private final MutableLiveData<String> gender = new MutableLiveData<>();

    private String username;
    private final MutableLiveData<Result<String>> usernameResult = new MutableLiveData<>();
    private String password;
    private final MutableLiveData<Result<String>> passwordResult = new MutableLiveData<>();

    private File profilePictureFile;
    private final MutableLiveData<Result<String>> pictureResult = new MutableLiveData<>();
    private String profilePictureUrl;

    public void initRepo(Context context) {
        if (userRepository == null) {
            userRepository = new UserRepository(context.getApplicationContext());
        }
    }
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

    // === Getters ===
    public LiveData<String> getFirstName() { return firstName; }
    public LiveData<String> getLastName() { return lastName; }
    public LiveData<String> getGender() { return gender; }

    public String getUsername() { return username; }
    public String getPassword() { return password; }

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
    //API format
    public String getFormattedBirthdayWithMonthName() {
        Integer day = getBirthDay();
        Integer month = getBirthMonth();
        Integer year = getBirthYear();

        if (day == null || month == null || year == null) return "";

        String[] monthNames = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        String monthName = monthNames[month];
        return String.format("%d %s %d", day, monthName, year);
    }

    // Reset all fields (used when restarting the registration)
    public void clearAll() {
        firstName.setValue(null);
        lastName.setValue(null);
        displayNameResult.setValue(null);

        birthDay.setValue(null);
        birthMonth.setValue(null);
        birthYear.setValue(null);

        gender.setValue(null);

        username = null;
        usernameResult.setValue(null);

        password = null;
        passwordResult.setValue(null);

        profilePictureFile = null;
    }

    public void validateDisplayName() {
        String first = firstName.getValue();
        String last = lastName.getValue() != null ? lastName.getValue() : "";
        if (first == null) {
            displayNameResult.setValue(new Result.Error(new Exception("First name is required")));
            return;
        }
        userRepository.validateDisplayName(first, last, displayNameResult);
    }

    public LiveData<Result<String>> getDisplayNameResult() {
        return displayNameResult;
    }
    public void validateUsername() {
        if (username == null || username.isEmpty()) {
            usernameResult.setValue(new Result.Error(new Exception("Username is required")));
            return;
        }
        userRepository.validateUsername(username, usernameResult);
    }

    public LiveData<Result<String>> getUsernameResult() {
        return usernameResult;
    }

    public void validatePassword(String password, String confirm) {
        if (password == null || confirm == null) {
            passwordResult.setValue(new Result.Error(new Exception("Password fields are required")));
            return;
        }

        userRepository.validatePassword(password, confirm, passwordResult);
    }
    public LiveData<Result<String>> getPasswordResult() {
        return passwordResult;
    }

    public void setProfilePictureFile(File file) {
        this.profilePictureFile = file;
        pictureResult.setValue(null); // Reset
        userRepository.validatePicture(file, pictureResult);
    }

    public File getProfilePictureFile() {
        return profilePictureFile;
    }

    public MutableLiveData<Result<String>> getPictureResult() {
        return pictureResult;
    }

    public void setProfilePictureUrl(String url) {
        this.profilePictureUrl = url;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void validatePicture(File pictureFile) {
        userRepository.validatePicture(pictureFile, pictureResult);
    }

    public LiveData<Result<User>> getCreateUserResult() { return createUserResult; }
    public void createUser(NewUserRequest newUser) {
        userRepository.createUser(newUser, createUserResult);
    }

}
