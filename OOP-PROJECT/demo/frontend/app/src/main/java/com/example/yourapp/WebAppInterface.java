package com.example.smarttransit;

import android.content.Context;
import android.content.Intent;
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

    // Launch native MapsActivity
    @JavascriptInterface
    public void openMapsActivity() {
        Intent intent = new Intent(context, MapsActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    // Launch native MapsActivity with selected route details
    @JavascriptInterface
    public void openMapsActivityWithRoute(String fromLocation, String toLocation, String travelTime) {
        Intent intent = new Intent(context, MapsActivity.class);
        intent.putExtra("FROM_LOCATION", fromLocation);
        intent.putExtra("TO_LOCATION", toLocation);
        intent.putExtra("TRAVEL_TIME", travelTime);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    // Switch App Locale natively
    @JavascriptInterface
    public void setAppLanguage(String langCode) {
        new Handler(Looper.getMainLooper()).post(() -> {
            LocaleListCompat appLocales = LocaleListCompat.forLanguageTags(langCode);
            AppCompatDelegate.setApplicationLocales(appLocales);
        });
    }

    // Returns native string translations as JSON to WebView
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