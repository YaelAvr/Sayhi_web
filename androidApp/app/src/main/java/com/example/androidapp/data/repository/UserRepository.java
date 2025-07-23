package com.example.androidapp.data.repository;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.WebApi.TokenApi;
import com.example.androidapp.data.WebApi.UserApi;
import com.example.androidapp.data.dao.RegisteredUserDao;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.model.User;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

public class UserRepository {
    private UserDao userDao;
    private RegisteredUserDao regDao;
    private UserApi userApi;

    private TokenApi tokenApi;

    private User user = null;

    private UsersData usersData;
    private Context context;
    public UserRepository(Context context) {
        this.context = context;
        AppDB db = Room.databaseBuilder(context, AppDB.class, "UsersDB")
                .allowMainThreadQueries()
                .build();
        this.userDao = db.userDao();
        this.regDao=db.registeredUserDao();
        usersData = new UsersData();
        this.userApi= new UserApi(context, userDao, regDao, usersData);
        this.tokenApi= new TokenApi(context);
    }

    class UsersData extends MutableLiveData<List<RegisteredUser>>{
        public UsersData(){
            super();
            setValue(new LinkedList<RegisteredUser>());
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

    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUser>> loginResult ){
        userApi.verifySignedUsername(username, loginResult);
    }
    public void getAllUsers() { userApi.fetchAllUsersToDao();}
    public void reload(){
        userApi.fetchAllUsersToDao();
    }

    private void setLoggedInUser(User user) {
        this.user = user;
    }

    public MutableLiveData<Result<String>> login(String username, String password) {
        return tokenApi.login(username, password);
    }
    public LiveData<Result<User>> getUserById(String userId) {
        return userApi.getUserById(userId);
    }

    //sign in:
    public void validateDisplayName(String firstName, String lastName, MutableLiveData<Result<String>> resultLiveData) {
        userApi.validateDisplayName(firstName, lastName, resultLiveData);
    }
    public void validateUsername(String username, MutableLiveData<Result<String>> resultLiveData) {
        userApi.validateUsername(username, resultLiveData);
    }
    public void validatePassword(String password, String confirm, MutableLiveData<Result<String>> resultLiveData) {
        userApi.validatePassword(password, confirm, resultLiveData);
    }
    public void validatePicture(File file, MutableLiveData<Result<String>> liveData) {
        userApi.validatePicture(file, liveData);
    }
}
