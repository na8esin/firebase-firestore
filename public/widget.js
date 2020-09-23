// FirebaseUI config.
var uiConfig = {
    // Url to redirect to after a successful sign-in.
    'signInSuccessUrl': '/',
    'callbacks': {
        'signInSuccess': function (user, credential, redirectUrl) {
            if (window.opener) {
                // The widget has been opened in a popup, so close the window
                // and return false to not redirect the opener.
                window.close();
                return false;
            } else {
                // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
                return true;
            }
        }
    },
    'signInOptions': [
        // TODO(developer): Remove the providers you don't need for your app.
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // Required to enable ID token credentials for this provider.
            clientId: CLIENT_ID
        },
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: getEmailSignInMethod()
        },
        {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            recaptchaParameters: {
                size: getRecaptchaMode()
            }
        },
        {
            provider: 'microsoft.com',
            loginHintKey: 'login_hint'
        },
        {
            provider: 'apple.com',
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com',
    'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
        firebaseui.auth.CredentialHelper.GOOGLE_YOLO :
        firebaseui.auth.CredentialHelper.NONE
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded to include the FirebaseUI sign-in widget
// within the element corresponding to the selector specified.
ui.start('#firebaseui-auth-container', uiConfig);