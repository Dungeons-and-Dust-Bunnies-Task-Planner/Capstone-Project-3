import * as keys from "./keys";


window.addEventListener('DOMContentLoaded', function(){
    console.log("dom content loaded");
    const client = filestack.init(keys.filePickerApi);
    const picker = client.picker(options);

    const profileOpenButton = document.getElementById('profile-image-add');
    profileOpenButton.addEventListener('click', (e) => {
        console.log("add picture clicked");
        e.preventDefault();
        picker.open();
    });
    const backgroundOpenButton = document.getElementById('background-image-add');
    backgroundOpenButton.addEventListener('click', (e) => {
        console.log("add picture clicked");
        e.preventDefault();
        picker.open();
    });

})

const options = {
    accept: ['image/*'],
    onFileUploadFinished: (file) => {
        console.log('file upload complete')
        console.log(file);
        const imageFormField = document.getElementById("profile-image-url");
        const backgroundImageFormField = document.getElementById("background-image-url")
        imageFormField.value = file.url;
        backgroundImageFormField.value = file.url;
    },
};