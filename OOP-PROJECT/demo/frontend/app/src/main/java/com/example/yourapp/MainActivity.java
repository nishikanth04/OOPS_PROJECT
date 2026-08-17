package com.example.smarttransit;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webview);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        // The app includes Malayalam, Hindi, Tamil, Kannada and Bengali text in
        // local HTML assets.  Make the asset encoding explicit so WebView never
        // falls back to a legacy single-byte encoding (which displays text as
        // sequences such as "à´..." instead of the selected language).
        webSettings.setDefaultTextEncodingName("UTF-8");

        // Bind Java interface to window.AndroidNative in JavaScript
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidNative");

        // Load your assets file
        webView.loadUrl("file:///android_asset/index.html");
    }
}
