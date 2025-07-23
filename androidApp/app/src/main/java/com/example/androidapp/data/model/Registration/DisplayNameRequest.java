package com.example.androidapp.data.model.Registration;

public class DisplayNameRequest {
    private String firstWord;
    private String secondWord;

    public DisplayNameRequest(String firstWord, String secondWord) {
        this.firstWord = firstWord;
        this.secondWord = secondWord;
    }

    // Getters & setters
    public String getFirstWord() {
        return firstWord;
    }

    public void setFirstWord(String firstWord) {
        this.firstWord = firstWord;
    }

    public String getSecondWord() {
        return secondWord;
    }

    public void setSecondWord(String secondWord) {
        this.secondWord = secondWord;
    }
}
