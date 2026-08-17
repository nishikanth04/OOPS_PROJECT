package com.example.smarttransit;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PolylineOptions;

import java.util.ArrayList;
import java.util.List;

public class MapsActivity extends AppCompatActivity implements OnMapReadyCallback {

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;
    private GoogleMap mMap;

    // Define Strict Geographic Boundaries for Kerala
    private static final LatLng KERALA_SOUTH_WEST = new LatLng(8.1800, 74.8500); // Near Kasaragod Sea Coast
    private static final LatLng KERALA_NORTH_EAST = new LatLng(12.8000, 77.5000); // Near Wayanad/Kannur Borders
    private static final LatLngBounds KERALA_BOUNDS = new LatLngBounds(KERALA_SOUTH_WEST, KERALA_NORTH_EAST);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        if (mapFragment != null) {
            mapFragment.getMapAsync(this);
        }
    }

    @Override
    public void onMapReady(@NonNull GoogleMap googleMap) {
        mMap = googleMap;

        // 1. Restrict map camera movement strictly to Kerala boundaries
        mMap.setLatLngBoundsForCameraTarget(KERALA_BOUNDS);
        mMap.setMinZoomPreference(7.2f); // Prevent zooming out to entire India/World
        mMap.setMaxZoomPreference(18.0f);

        // Center map over Kerala
        LatLng keralaCenter = new LatLng(10.8505, 76.2711);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(keralaCenter, 7.5f));

        // 2. Check & enable user location permissions
        checkLocationPermission();

        // 3. Draw Major KSRTC Highway Bus Routes across Kerala
        drawKsrtcMajorNetworkRoutes();

        // 4. Add Key KSRTC Depot Markers
        addKsrtcMajorDepotMarkers();
    }

    // =========================================================
    // Draw Major KSRTC Route Polylines
    // =========================================================
    private void drawKsrtcMajorNetworkRoutes() {
        // Route 1: Main Central Road / NH 66 Coastal (Trivandrum -> Ernakulam -> Kozhikode -> Kasaragod)
        List<LatLng> mainCorridor = new ArrayList<>();
        mainCorridor.add(new LatLng(8.5241, 76.9366));  // Trivandrum Central
        mainCorridor.add(new LatLng(8.8932, 76.6141));  // Kollam
        mainCorridor.add(new LatLng(9.5916, 76.5222));  // Alappuzha
        mainCorridor.add(new LatLng(9.9816, 76.2999));  // Ernakulam / Vytilla Mobility Hub
        mainCorridor.add(new LatLng(10.5276, 76.2144)); // Thrissur
        mainCorridor.add(new LatLng(11.2588, 75.7804)); // Kozhikode
        mainCorridor.add(new LatLng(11.8745, 75.3704)); // Kannur
        mainCorridor.add(new LatLng(12.4996, 74.9869)); // Kasaragod

        PolylineOptions mainRouteOptions = new PolylineOptions()
                .addAll(mainCorridor)
                .width(10f)
                .color(Color.parseColor("#C3372C")) // KSRTC Red Theme
                .geodesic(true);
        mMap.addPolyline(mainRouteOptions);

        // Route 2: MC Road Inland Route (Trivandrum -> Kottayam -> Angamaly)
        List<LatLng> mcRoadCorridor = new ArrayList<>();
        mcRoadCorridor.add(new LatLng(8.5241, 76.9366)); // Trivandrum
        mcRoadCorridor.add(new LatLng(8.8800, 76.8800)); // Kottarakkara
        mcRoadCorridor.add(new LatLng(9.1530, 76.7323)); // Adoor
        mcRoadCorridor.add(new LatLng(9.5915, 76.5222)); // Tiruvalla
        mcRoadCorridor.add(new LatLng(9.5916, 76.5222)); // Kottayam
        mcRoadCorridor.add(new LatLng(9.8500, 76.5300)); // Muvattupuzha
        mcRoadCorridor.add(new LatLng(10.1960, 76.3860)); // Angamaly

        PolylineOptions mcRoadOptions = new PolylineOptions()
                .addAll(mcRoadCorridor)
                .width(8f)
                .color(Color.parseColor("#F0B23E")) // Gold/Yellow Line
                .geodesic(true);
        mMap.addPolyline(mcRoadOptions);

        // Route 3: Hill Highway Route (Thrissur -> Palakkad -> Malappuram -> Wayanad)
        List<LatLng> hillCorridor = new ArrayList<>();
        hillCorridor.add(new LatLng(10.5276, 76.2144)); // Thrissur
        hillCorridor.add(new LatLng(10.7867, 76.6548)); // Palakkad
        hillCorridor.add(new LatLng(11.0732, 76.0740)); // Malappuram
        hillCorridor.add(new LatLng(11.6050, 76.0830)); // Kalpetta (Wayanad)

        PolylineOptions hillOptions = new PolylineOptions()
                .addAll(hillCorridor)
                .width(8f)
                .color(Color.parseColor("#39B6A0")) // Teal Line
                .geodesic(true);
        mMap.addPolyline(hillOptions);
    }

    // =========================================================
    // Add KSRTC Major Hub Markers
    // =========================================================
    private void addKsrtcMajorDepotMarkers() {
        mMap.addMarker(new MarkerOptions()
                .position(new LatLng(8.5241, 76.9366))
                .title("Trivandrum Central KSRTC Bus Station")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)));

        mMap.addMarker(new MarkerOptions()
                .position(new LatLng(9.9816, 76.2999))
                .title("Ernakulam / Vytilla Mobility Hub")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)));

        mMap.addMarker(new MarkerOptions()
                .position(new LatLng(11.2588, 75.7804))
                .title("Kozhikode KSRTC Bus Terminal")
                .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)));
    }

    private void checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            mMap.setMyLocationEnabled(true);
        } else {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    LOCATION_PERMISSION_REQUEST_CODE);
        }
    }
}