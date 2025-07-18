package com.example.androidapp.data.repository;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import com.example.androidapp.data.Result;
import com.example.androidapp.data.WebApi.UserApi;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.db.AppDB;
import com.example.androidapp.data.model.User;
import com.example.androidapp.ui.login.RegisteredUserView;

import java.util.LinkedList;
import java.util.List;

public class UserRepository {
    private UserDao userDao;
    private UserApi userApi;

    private UsersData usersData;
    public UserRepository(Context context) {
        AppDB db = Room.databaseBuilder(context, AppDB.class, "UsersDB")
                .allowMainThreadQueries()
                .build();
        this.userDao = db.userDao();
        this.userApi= new UserApi(context, userDao);
    }

    class UsersData extends MutableLiveData<List<User>>{
        public UsersData(){
            super();
            setValue(new LinkedList<User>());
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
    public User getUserById(String id) {
        return userDao.getUserById(id);
    }

    public void insertUser(User user) {
        userDao.insertUser(user);
    }

    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }

    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUserView>> loginResult ){
        userApi.verifySignedUsername(username, loginResult);
    }
    public void getAllUsers() {userApi.getAllUsers();}
    public void reload(){
        userApi.getAllUsers();
    }
}
