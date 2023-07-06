
window.addEventListener('DOMContentLoaded', function(){
    const client = filestack.init(filePickerKey);
    const profilePicker = client.picker(profileOptions);
    const backgroundPicker = client.picker(backgroundOptions);

    const profileOpenButton = document.getElementById('profile-image-add');
    profileOpenButton.addEventListener('click', (e) => {
        console.log("add profile pic clicked");
        e.preventDefault();
        profilePicker.open();
    });
    const backgroundOpenButton = document.getElementById('background-image-add');
    backgroundOpenButton.addEventListener('click', (e) => {
        console.log("add background clicked");
        e.preventDefault();
        backgroundPicker.open();
    });
});

const profileOptions = {
    accept: ['image/*'],
    onFileUploadFinished: (file) => {
        console.log('file upload complete')
        console.log(file);
        const imageFormField = document.getElementById("profile-image-url");
        imageFormField.value = file.url;
    },
};
const backgroundOptions = {
    accept: ['image/*'],
    onFileUploadFinished: (file) => {
        console.log('file upload complete')
        console.log(file);
        const backgroundImageFormField = document.getElementById("background-image-url");
        backgroundImageFormField.value = file.url;
    },
};
