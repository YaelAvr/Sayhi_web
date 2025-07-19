package com.example.androidapp.data.WebApi;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.dao.RegisteredUserDao;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.model.User;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserApi {
    private Retrofit retrofit;
    private Context context;
    private UserServicesAPI userServiceAPI;
    private UserDao userDao;
    private RegisteredUserDao regDao;


    public UserApi(Context context, UserDao userDao,RegisteredUserDao regDao) {
        this.userDao = userDao;
        this.regDao = regDao;
        this.context = context;
        String baseUrl = this.context.getString(R.string.BaseUrl);

        retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userServiceAPI = retrofit.create(UserServicesAPI.class);

    }

    public void getUser(String id) {
        Call<User> call = userServiceAPI.getUser(id);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                new Thread(()->{
                    userDao.deleteAllUsers();
                    userDao.insertUser(response.body());
                }).start();
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
//        return userServiceAPI.getUser(id);
    }
    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUser>> liveData){
        Log.i("errorType", "verify passed username" + username);

        new Thread(() -> {
            try {
                RegisteredUser user = regDao.getUserByUsername(username);
                if (user != null) {
                    liveData.postValue(new Result.Success<>(user));
                    Log.i("verifySignedUsername", "reg name" + user.getDisplayName());

////                    RegisteredUser view = new RegisteredUser(user.getDisplayName(), user.getUsername());
//                    // עדכון לייב דאטה על ה־main thread
//                    new Handler(Looper.getMainLooper()).post(() ->
//                            liveData.setValue(new Result.Success<>(view))
//                    );
                } else {
                    Log.i("verifySignedUsername", "null");

                    liveData.postValue(new Result.Error(new Exception("Username does not exist.")));
                }
            } catch (Exception e) {
                Log.i("verifySignedUsername", "other error");

                liveData.postValue(new Result.Error(e));
            }
        }).start();

/*        Call<RegisteredUserView> call = userServiceAPI.verifySignedUsername(username);

        call.enqueue(new Callback<RegisteredUserView>() {
            @Override
            public void onResponse(Call<RegisteredUserView> call, Response<RegisteredUserView> response) {
                Log.i("errorType", "UserApi: response " + username);

                if(response.isSuccessful() && response.body() != null){
                   RegisteredUserView res = new RegisteredUserView(response.body().getDisplayName(), response.body().getUsername());
                    Log.i("errorType", "UserApi: response.isSuccessful() && response.body() != null ");

                   if (res.isExists()) {
                       Log.i("errorType", "UserApi: in isExist if" + res.getUsername());

//                       if (result instanceof Result.Success) {
//                           setLoggedInUser(((Result.Success<User>) result).getData());
//                       }
//                       return result;
//                       RegisteredUserView user = new RegisteredUserView(res.dis);
                       liveData.postValue(new Result.Success<RegisteredUserView>(res));
                   }
               } else {
                   String errorMsg =""+ response.code();
                   try {
                       if (response.errorBody() != null) {
                           String errorJson = response.errorBody().string();
                           JSONObject jsonObject = new JSONObject(errorJson);
                           errorMsg = jsonObject.optString("error", errorMsg);
                       }
                   } catch (Exception e) {
                   }
                   Log.i("UserApi: errorType", errorMsg);
                   liveData.postValue(new Result.Error(new Exception(errorMsg)));
               }
            }

            @Override
            public void onFailure(Call<RegisteredUserView> call, Throwable t) {
                liveData.postValue(new Result.Error(new Exception("Network error: " + t.getMessage(), t)));
            }
        });*/
    }

    public void fetchAllUsersToDao() {
        Log.i("UserApi", "get all func" );
        //TO-DO: fix get username in DAO and then fix this func to match

        Call<List<RegisteredUser>> call = userServiceAPI.getAllUsers();
        call.enqueue(new Callback<List<RegisteredUser>>() {
            @Override
            public void onResponse(Call<List<RegisteredUser>> call, Response<List<RegisteredUser>> response) {
                Log.i("UserApi", "get all in responce");

                if (response.isSuccessful() && response.body() != null) {
                    Log.i("UserApi", "get all in if");

//                    List<User> users = response.body();
//                    List<RegisteredUser> registeredUserList = new ArrayList<RegisteredUser>();
//                    List<User> users = response.body();
                    List<RegisteredUser> registeredUserList =response.body();

                    for (RegisteredUser user : registeredUserList) {
                        Log.i("UserApi", "User: " + user.getUserName() + ", Name: " + user.getDisplayName());
//                        registeredUserList.add(new RegisteredUser(user.getId(), user.getDisplayName(), user.getUserName()));
                    }

                    new Thread(() -> {
                        regDao.deleteAllUsers();
                        for (RegisteredUser user : registeredUserList) {
                            regDao.insertRegisteredUser(user);
                        }
                    }).start();

                } else {
                    Log.e("UserApi", "Failed to fetch users: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<List<RegisteredUser>> call, Throwable t) {
                Log.e("UserApi", "Network error: " + t.getMessage(), t);
            }
        });

    }

    public Result<User> login(String username, String password) {

        try {
            // TODO: handle loggedInUser authentication
            User fakeUser =
                    new User(
                            java.util.UUID.randomUUID().toString(),
                            "Jane Doe");
            return new Result.Success<>(fakeUser);
        } catch (Exception e) {
            return new Result.Error(new IOException("Error logging in", e));
        }
    }

    public void logout() {
        // TODO: revoke authentication
    }

    // TO-DO: add create user fundtion for register


}
