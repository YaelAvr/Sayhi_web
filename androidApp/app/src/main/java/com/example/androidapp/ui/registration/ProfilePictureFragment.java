package com.example.androidapp.ui.registration;

import android.content.ContentResolver;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.androidapp.R;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ProfilePictureFragment extends Fragment {

    private RegistrationViewModel registrationViewModel;
    private ImageView imageViewProfile;
    private Uri selectedImageUri;

    // Launcher for the image picker
    private final ActivityResultLauncher<String> imagePickerLauncher = registerForActivityResult(
            new ActivityResultContracts.GetContent(),
            uri -> {
                if (uri != null) {
                    selectedImageUri = uri;
                    imageViewProfile.setImageURI(uri); // Display the selected image
                    handleImageSelection(uri); // Convert and store it
                }
            }
    );

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_profile_picture, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        registrationViewModel = new ViewModelProvider(requireActivity()).get(RegistrationViewModel.class);

        imageViewProfile = view.findViewById(R.id.imageViewProfile);
        Button buttonChooseImage = view.findViewById(R.id.buttonChooseImage);
        Button buttonNext = view.findViewById(R.id.buttonNext);

        // Launch image picker on click
        buttonChooseImage.setOnClickListener(v -> imagePickerLauncher.launch("image/*"));

        buttonNext.setOnClickListener(v -> {
            // Check that a file was selected
            if (registrationViewModel.getProfilePictureFile() == null) {
                Toast.makeText(requireContext(), "Please choose a profile picture", Toast.LENGTH_SHORT).show();
                return;
            }

            // TODO: Later - send the file to the API using Retrofit

            // Example navigation:
            // NavController navController = NavHostFragment.findNavController(this);
            // navController.navigate(R.id.action_profilePictureFragment_to_nextStepFragment);
        });
    }

    // Convert the selected Uri to a local File and store it in the ViewModel
    private void handleImageSelection(Uri uri) {
        try {
            File file = createTempFileFromUri(uri);
            registrationViewModel.setProfilePictureFile(file);
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(requireContext(), "Failed to process image", Toast.LENGTH_SHORT).show();
        }
    }

    // Helper to copy file from Uri to cache directory
    private File createTempFileFromUri(Uri uri) throws IOException {
        InputStream inputStream = requireContext().getContentResolver().openInputStream(uri);
        String fileName = "profile_" + System.currentTimeMillis() + ".jpg";
        File tempFile = new File(requireContext().getCacheDir(), fileName);

        FileOutputStream outStream = new FileOutputStream(tempFile);
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, bytesRead);
        }

        outStream.close();
        inputStream.close();

        return tempFile;
    }
}
