package com.example.smarttransit;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.core.os.LocaleListCompat;
import org.json.JSONObject;

public class WebAppInterface {
    private Context context;

    public WebAppInterface(Context context) {
        this.context = context;
    }

    // Called from JavaScript inside index.html
    @JavascriptInterface
    public void setAppLanguage(String langCode) {
        new Handler(Looper.getMainLooper()).post(() -> {
            // Update Android Locale natively
            LocaleListCompat appLocales = LocaleListCompat.forLanguageTags(langCode);
            AppCompatDelegate.setApplicationLocales(appLocales);
        });
    }

    // Returns all native string translations as JSON to WebView
    @JavascriptInterface
    public String getLocalizedStrings() {
        try {
            JSONObject json = new JSONObject();
            json.put("navHome", context.getString(R.string.nav_home));
            json.put("navFeatures", context.getString(R.string.nav_features));
            json.put("navAbout", context.getString(R.string.nav_about));
            json.put("navSettings", context.getString(R.string.nav_settings));
            json.put("heroTitle", context.getString(R.string.hero_title));
            json.put("heroLead", context.getString(R.string.hero_lead));
            return json.toString();
        } catch (Exception e) {
            return "{}";
        }
    }
}