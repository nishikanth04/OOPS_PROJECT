# SmartTransit local configuration

1. Copy `app_config.example.js` to `app_config.js` in this folder.
2. Add your Gemini API key to `geminiApiKey`.
3. Add your Google OAuth Web Client ID to `googleClientId`.

`app_config.js` is ignored by Git and is the only place where those values
should be saved. Do not put credentials in `ksrtc_overlay.js` or `index.html`.

For Google Sign-In, create a Web OAuth client in Google Cloud Console and add
the address where you run the site (for example `http://127.0.0.1:8080`) to
its **Authorized JavaScript origins**. The current implementation is a
front-end sign-in flow: a production backend must verify Google's credential
before granting access to protected data or actions.
