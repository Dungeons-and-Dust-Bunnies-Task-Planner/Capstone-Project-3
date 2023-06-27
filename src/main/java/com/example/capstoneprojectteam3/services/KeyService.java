package com.example.capstoneprojectteam3.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class KeyService {

    @Value("${OPENAI.API.KEY}")
    private String openAiKey;

    @Value("${FILEPICKERAPI.KEY}")
    private String filePickerKey;

    public String getFilePickerKey() {
        return filePickerKey;
    }

    public void setFilePickerKey(String filePickerKey) {
        this.filePickerKey = filePickerKey;
    }

    public String getOpenAiKey() {
        return openAiKey;
    }

    public void setOpenAiKey(String openAiKey) {
        this.openAiKey = openAiKey;
    }
}
