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

        // Bind Java interface to window.AndroidNative in JavaScript
        webView.addJavascriptInterface(new WebAppInterface(this), "AndroidNative");

        // Load your assets file
        webView.loadUrl("file:///android_asset/index.html");
    }
}