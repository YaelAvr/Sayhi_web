package com.example.androidapp.data.WebApi;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.androidapp.R;
import com.example.androidapp.data.Result;
import com.example.androidapp.data.auth.AuthInterceptor;
import com.example.androidapp.data.auth.SessionExpiredException;
import com.example.androidapp.data.auth.TokenManager;
import com.example.androidapp.data.dao.RegisteredUserDao;
import com.example.androidapp.data.dao.UserDao;
import com.example.androidapp.data.model.RegisteredUser;
import com.example.androidapp.data.model.Registration.DisplayNameRequest;
import com.example.androidapp.data.model.Registration.DisplayNameResponse;
import com.example.androidapp.data.model.Registration.UsernameRequest;
import com.example.androidapp.data.model.Registration.UsernameResponse;
import com.example.androidapp.data.model.User;

import org.json.JSONObject;

import java.util.List;

import okhttp3.OkHttpClient;
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

    private MutableLiveData<List<RegisteredUser>> usersListData;

    public UserApi(Context context, UserDao userDao,RegisteredUserDao regDao, MutableLiveData<List<RegisteredUser>> usersListData) {
        this.userDao = userDao;
        this.regDao = regDao;
        this.context = context;
        this.usersListData=usersListData;


        TokenManager tokenManager = new TokenManager(context);
        AuthInterceptor authInterceptor = new AuthInterceptor(tokenManager);
        OkHttpClient client = new OkHttpClient.Builder().addInterceptor(authInterceptor).build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(context.getString(R.string.BaseUrl))
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userServiceAPI = retrofit.create(UserServicesAPI.class);
    }

    public LiveData<Result<User>> getUserById(String id) {
        MutableLiveData<Result<User>> userLiveData = new MutableLiveData<>();

        Call<User> call = userServiceAPI.getUser(id);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful() && response.body() != null) {
                    userLiveData.postValue(new Result.Success<>(response.body()));

                    new Thread(()->{
                        userDao.deleteAllUsers();
                        userDao.insertUser(response.body());
                    }).start();
                } else {
                    // Check if the error code is 401 (Unauthorized) or 403 (Forbidden).
                    if (response.code() == 401 || response.code() == 403) {
                        // This is a special error that means the session has expired.
                        userLiveData.postValue(new Result.Error(new SessionExpiredException()));
                    } else {
                        userLiveData.postValue(new Result.Error(new Exception(response.message())));
                    }
                }

            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                userLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
        return userLiveData;
    }
    public void verifySignedUsername(String username, MutableLiveData<Result<RegisteredUser>> liveData){
        new Thread(() -> {
            try {
                RegisteredUser user = regDao.getUserByUsername(username);
                if (user != null) {
                    liveData.postValue(new Result.Success<>(user));
                    Log.i("verifySignedUsername", "reg name" + user.getDisplayName());

                } else {
                    Log.i("verifySignedUsername", "null");

                    liveData.postValue(new Result.Error(new Exception("Username does not exist.")));
                }
            } catch (Exception e) {
                Log.i("verifySignedUsername", "other error");

                liveData.postValue(new Result.Error(e));
            }
        }).start();
    }

    public void fetchAllUsersToDao() {
        Log.i("UserApi", "get all func" );

        Call<List<RegisteredUser>> call = userServiceAPI.getAllUsers();
        call.enqueue(new Callback<List<RegisteredUser>>() {
            @Override
            public void onResponse(Call<List<RegisteredUser>> call, Response<List<RegisteredUser>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<RegisteredUser> registeredUserList =response.body();
                    // ךמחוק בסוף
                    for (RegisteredUser user : registeredUserList) {
                        Log.i("UserApi", "User: " + user.getUserName() + ", Name: " + user.getDisplayName());
                    }

                    new Thread(() -> {
                        regDao.deleteAllUsers();
                        for (RegisteredUser user : registeredUserList) {
                            regDao.insertRegisteredUser(user);
                        }
                        usersListData.postValue(regDao.index());
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

    //sign in:
    public void validateDisplayName(String firstName, String lastName, MutableLiveData<Result<String>> liveData) {
        DisplayNameRequest request = new DisplayNameRequest(firstName, lastName == null ? "" : lastName);

        Call<DisplayNameResponse> call = userServiceAPI.validateDisplayName(request);
        call.enqueue(new Callback<DisplayNameResponse>() {
            @Override
            public void onResponse(Call<DisplayNameResponse> call, Response<DisplayNameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    liveData.postValue(new Result.Success<>(response.body().getDisplayName()));
                } else {
                    String errorMsg = "Unknown error";
                    try {
                        String errorBody = response.errorBody().string();
                        JSONObject jsonObject = new JSONObject(errorBody);
                        errorMsg = jsonObject.optString("error", errorMsg);
                    } catch (Exception ignored) {}
                    liveData.postValue(new Result.Error(new Exception(errorMsg)));
                }
            }

            @Override
            public void onFailure(Call<DisplayNameResponse> call, Throwable t) {
                liveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
    }

    public void validateUsername(String username, MutableLiveData<Result<String>> resultLiveData) {
        UsernameRequest request = new UsernameRequest(username);

        Call<UsernameResponse> call = userServiceAPI.validateUserName(request);
        call.enqueue(new Callback<UsernameResponse>() {
            @Override
            public void onResponse(Call<UsernameResponse> call, Response<UsernameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    resultLiveData.postValue(new Result.Success<>(response.body().getUsername()));
                } else {
                    String errorMsg = "Username invalid";
                    try {
                        String errorBody = response.errorBody().string();
                        JSONObject jsonObject = new JSONObject(errorBody);
                        errorMsg = jsonObject.optString("error", errorMsg);
                    } catch (Exception ignored) {}
                    resultLiveData.postValue(new Result.Error(new Exception(errorMsg)));
                }
            }

            @Override
            public void onFailure(Call<UsernameResponse> call, Throwable t) {
                resultLiveData.postValue(new Result.Error(new Exception(t.getMessage())));
            }
        });
    }
}
