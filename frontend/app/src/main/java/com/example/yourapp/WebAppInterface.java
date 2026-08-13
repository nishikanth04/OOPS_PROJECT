package com.example.smarttransit;

import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;

public class WebAppInterface {
    private Context context;

    public WebAppInterface(Context context) {
        this.context = context;
    }

    // 📍 ADD THIS METHOD TO LAUNCH MAPS ACTIVITY
    @JavascriptInterface
    public void openMapsActivity() {
        Intent intent = new Intent(context, MapsActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    // ... existing methods (setAppLanguage, getLocalizedStrings, etc.)
}
@JavascriptInterface
public void openMapsActivityWithRoute(String fromLocation, String toLocation, String travelTime) {
    Intent intent = new Intent(context, MapsActivity.class);
    intent.putExtra("FROM_LOCATION", fromLocation);
    intent.putExtra("TO_LOCATION", toLocation);
    intent.putExtra("TRAVEL_TIME", travelTime);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(intent);
}