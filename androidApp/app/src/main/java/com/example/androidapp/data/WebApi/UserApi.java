package com.example.androidapp.data.WebApi;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.User;
import com.example.androidapp.ui.login.RegisteredUserView;

import org.json.JSONObject;

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

    public UserApi(Context context, UserDao userDao) {
        this.userDao = userDao;
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
    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUserView>> liveData){
        Log.i("errorType", "verify passed username" + username);

        Call<RegisteredUserView> call = userServiceAPI.verifySignedUsername(username);

        call.enqueue(new Callback<RegisteredUserView>() {
            @Override
            public void onResponse(Call<RegisteredUserView> call, Response<RegisteredUserView> response) {
                Log.i("errorType", "response " + username);

                if(response.isSuccessful() && response.body() != null){
                   RegisteredUserView res = new RegisteredUserView(response.body().getDisplayName(), response.body().getUsername());
                    Log.i("errorType", "response.isSuccessful() && response.body() != null ");

                   if (res.isExists()) {
                       Log.i("errorType", "in isExist if" + res.getUsername());

//                       if (result instanceof Result.Success) {
//                           setLoggedInUser(((Result.Success<User>) result).getData());
//                       }
//                       return result;
//                       RegisteredUserView user = new RegisteredUserView(res.dis);
                       liveData.setValue(new Result.Success<RegisteredUserView>(res));
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
                   Log.i("errorType", errorMsg);
                   liveData.postValue(new Result.Error(new Exception(errorMsg)));
               }


            }

            @Override
            public void onFailure(Call<RegisteredUserView> call, Throwable t) {
                liveData.postValue(new Result.Error(new Exception("שגיאת רשת: " + t.getMessage(), t)));
            }

        });
    }


    // TO-DO: add create user fundtion for register


}
