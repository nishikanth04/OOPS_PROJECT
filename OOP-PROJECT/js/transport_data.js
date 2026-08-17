/**
 * Kerala Public Transport Comprehensive Unified Data Engine
 * Bundled for SmartTransit Web & Android Application
 */

const KeralaTransitData = (function() {

  const districts = [
    {"code": "TVM", "name": "Thiruvananthapuram", "headquarters": "Thiruvananthapuram", "lat": 8.5241, "lng": 76.9366},
    {"code": "KLM", "name": "Kollam", "headquarters": "Kollam", "lat": 8.8932, "lng": 76.6141},
    {"code": "PTA", "name": "Pathanamthitta", "headquarters": "Pathanamthitta", "lat": 9.2648, "lng": 76.7870},
    {"code": "ALP", "name": "Alappuzha", "headquarters": "Alappuzha", "lat": 9.4981, "lng": 76.3388},
    {"code": "KTM", "name": "Kottayam", "headquarters": "Kottayam", "lat": 9.5916, "lng": 76.5222},
    {"code": "IDK", "name": "Idukki", "headquarters": "Painavu", "lat": 9.8494, "lng": 76.9710},
    {"code": "EKM", "name": "Ernakulam", "headquarters": "Kochi", "lat": 9.9312, "lng": 76.2673},
    {"code": "TSR", "name": "Thrissur", "headquarters": "Thrissur", "lat": 10.5276, "lng": 76.2144},
    {"code": "PKD", "name": "Palakkad", "headquarters": "Palakkad", "lat": 10.7867, "lng": 76.6548},
    {"code": "MLP", "name": "Malappuram", "headquarters": "Malappuram", "lat": 11.0510, "lng": 76.0711},
    {"code": "KKD", "name": "Kozhikode", "headquarters": "Kozhikode", "lat": 11.2588, "lng": 75.7804},
    {"code": "WYD", "name": "Wayanad", "headquarters": "Kalpetta", "lat": 11.6854, "lng": 76.0839},
    {"code": "KNR", "name": "Kannur", "headquarters": "Kannur", "lat": 11.8745, "lng": 75.3704},
    {"code": "KSD", "name": "Kasaragod", "headquarters": "Kasaragod", "lat": 12.4996, "lng": 74.9869}
  ];

  const ksrtcDepots = [
    {
      "code": "TVM-C",
      "name": "Thiruvananthapuram Central",
      "district": "Thiruvananthapuram",
      "lat": 8.4875,
      "lng": 76.9525,
      "bus_count": 180,
      "routes_operated": 85,
      "types": ["ordinary", "fast", "superfast", "superdeluxe", "ac", "volvo"]
    },
    {
      "code": "EKM",
      "name": "Ernakulam",
      "district": "Ernakulam",
      "lat": 9.9816,
      "lng": 76.2999,
      "bus_count": 160,
      "routes_operated": 75,
      "types": ["ordinary", "fast", "superfast", "superdeluxe", "ac", "volvo"]
    },
    {
      "code": "KKD",
      "name": "Kozhikode",
      "district": "Kozhikode",
      "lat": 11.2588,
      "lng": 75.7804,
      "bus_count": 140,
      "routes_operated": 65,
      "types": ["ordinary", "fast", "superfast", "superdeluxe", "ac"]
    },
    {
      "code": "TSR",
      "name": "Thrissur",
      "district": "Thrissur",
      "lat": 10.5210,
      "lng": 76.2108,
      "bus_count": 120,
      "routes_operated": 55,
      "types": ["ordinary", "fast", "superfast", "superdeluxe"]
    },
    {
      "code": "PKD",
      "name": "Palakkad",
      "district": "Palakkad",
      "lat": 10.7750,
      "lng": 76.6515,
      "bus_count": 90,
      "routes_operated": 40,
      "types": ["ordinary", "fast", "superfast"]
    },
    {
      "code": "KNR",
      "name": "Kannur",
      "district": "Kannur",
      "lat": 11.8650,
      "lng": 75.3700,
      "bus_count": 100,
      "routes_operated": 48,
      "types": ["ordinary", "fast", "superfast", "superdeluxe"]
    },
    {
      "code": "KTM",
      "name": "Kottayam",
      "district": "Kottayam",
      "lat": 9.5930,
      "lng": 76.5210,
      "bus_count": 85,
      "routes_operated": 38,
      "types": ["ordinary", "fast", "superfast"]
    },
    {
      "code": "KLM",
      "name": "Kollam",
      "district": "Kollam",
      "lat": 8.8878,
      "lng": 76.5985,
      "bus_count": 80,
      "routes_operated": 35,
      "types": ["ordinary", "fast", "superfast"]
    },
    {
      "code": "ALP",
      "name": "Alappuzha",
      "district": "Alappuzha",
      "lat": 9.4981,
      "lng": 76.3388,
      "bus_count": 65,
      "routes_operated": 30,
      "types": ["ordinary", "fast", "superfast"]
    },
    {
      "code": "KSD",
      "name": "Kasaragod",
      "district": "Kasaragod",
      "lat": 12.5000,
      "lng": 74.9900,
      "bus_count": 55,
      "routes_operated": 25,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "MLP",
      "name": "Malappuram",
      "district": "Malappuram",
      "lat": 11.0510,
      "lng": 76.0711,
      "bus_count": 75,
      "routes_operated": 33,
      "types": ["ordinary", "fast", "superfast"]
    },
    {
      "code": "IDK",
      "name": "Idukki",
      "district": "Idukki",
      "lat": 9.8494,
      "lng": 76.9710,
      "bus_count": 40,
      "routes_operated": 18,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "WYD",
      "name": "Wayanad",
      "district": "Wayanad",
      "lat": 11.6854,
      "lng": 76.0839,
      "bus_count": 35,
      "routes_operated": 15,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "PTA",
      "name": "Pathanamthitta",
      "district": "Pathanamthitta",
      "lat": 9.2648,
      "lng": 76.7870,
      "bus_count": 50,
      "routes_operated": 22,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "GVR",
      "name": "Guruvayoor",
      "district": "Thrissur",
      "lat": 10.5935,
      "lng": 76.0417,
      "bus_count": 45,
      "routes_operated": 20,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "VDK",
      "name": "Vadakara",
      "district": "Kozhikode",
      "lat": 11.5950,
      "lng": 75.4917,
      "bus_count": 40,
      "routes_operated": 18,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "MNK",
      "name": "Mannarkkad",
      "district": "Palakkad",
      "lat": 11.0020,
      "lng": 76.4530,
      "bus_count": 30,
      "routes_operated": 14,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "ADR",
      "name": "Adoor",
      "district": "Pathanamthitta",
      "lat": 9.1553,
      "lng": 76.7325,
      "bus_count": 35,
      "routes_operated": 16,
      "types": ["ordinary", "fast"]
    },
    {
      "code": "MVK",
      "name": "Mavelikara",
      "district": "Alappuzha",
      "lat": 9.2578,
      "lng": 76.5506,
      "bus_count": 30,
      "routes_operated": 14,
      "types": ["ordinary", "fast"]
    }
  ];

  const majorStops = [
    {"name": "Thampanoor Bus Station", "code": "TMP", "district": "Thiruvananthapuram", "lat": 8.4875, "lng": 76.9525, "type": "bus_stand", "is_major": true},
    {"name": "East Fort", "code": "EFT", "district": "Thiruvananthapuram", "lat": 8.4895, "lng": 76.9490, "type": "bus_stop", "is_major": true},
    {"name": "Thiruvananthapuram Central Railway Station", "code": "TVC", "district": "Thiruvananthapuram", "lat": 8.4880, "lng": 76.9520, "type": "railway", "is_major": true},
    {"name": "Kazhakoottam", "code": "KZK", "district": "Thiruvananthapuram", "lat": 8.5627, "lng": 76.8776, "type": "bus_stop", "is_major": false},
    {"name": "Attingal", "code": "ATG", "district": "Thiruvananthapuram", "lat": 8.6967, "lng": 76.8156, "type": "bus_stop", "is_major": false},
    {"name": "Neyyattinkara", "code": "NYT", "district": "Thiruvananthapuram", "lat": 8.3988, "lng": 77.0845, "type": "bus_stop", "is_major": false},
    {"name": "Kollam KSRTC", "code": "KLM-K", "district": "Kollam", "lat": 8.8878, "lng": 76.5985, "type": "bus_stand", "is_major": true},
    {"name": "Kollam Private Bus Stand", "code": "KLM-P", "district": "Kollam", "lat": 8.8868, "lng": 76.5950, "type": "bus_stand", "is_major": true},
    {"name": "Punalur", "code": "PNR", "district": "Kollam", "lat": 9.0206, "lng": 76.9245, "type": "bus_stop", "is_major": false},
    {"name": "Pathanamthitta KSRTC", "code": "PTA-K", "district": "Pathanamthitta", "lat": 9.2648, "lng": 76.7870, "type": "bus_stand", "is_major": true},
    {"name": "Adoor", "code": "ADR", "district": "Pathanamthitta", "lat": 9.1553, "lng": 76.7325, "type": "bus_stop", "is_major": false},
    {"name": "Alappuzha Boat Jetty", "code": "ALP-BJ", "district": "Alappuzha", "lat": 9.4906, "lng": 76.3265, "type": "boat_jetty", "is_major": true},
    {"name": "Alappuzha KSRTC", "code": "ALP-K", "district": "Alappuzha", "lat": 9.4981, "lng": 76.3388, "type": "bus_stand", "is_major": true},
    {"name": "Cherthala", "code": "CHT", "district": "Alappuzha", "lat": 9.6838, "lng": 76.3358, "type": "bus_stop", "is_major": false},
    {"name": "Mavelikara", "code": "MVK", "district": "Alappuzha", "lat": 9.2578, "lng": 76.5506, "type": "bus_stop", "is_major": false},
    {"name": "Kottayam Private Bus Stand", "code": "KTM-P", "district": "Kottayam", "lat": 9.5916, "lng": 76.5222, "type": "bus_stand", "is_major": true},
    {"name": "Kottayam KSRTC", "code": "KTM-K", "district": "Kottayam", "lat": 9.5930, "lng": 76.5210, "type": "bus_stand", "is_major": true},
    {"name": "Pala", "code": "PLA", "district": "Kottayam", "lat": 9.7134, "lng": 76.6835, "type": "bus_stop", "is_major": false},
    {"name": "Changanassery", "code": "CGY", "district": "Kottayam", "lat": 9.4439, "lng": 76.5393, "type": "bus_stop", "is_major": false},
    {"name": "Idukki", "code": "IDK", "district": "Idukki", "lat": 9.8494, "lng": 76.9710, "type": "bus_stop", "is_major": true},
    {"name": "Thodupuzha", "code": "TDP", "district": "Idukki", "lat": 9.8955, "lng": 76.7178, "type": "bus_stop", "is_major": true},
    {"name": "Munnar", "code": "MNR", "district": "Idukki", "lat": 10.0889, "lng": 77.0595, "type": "bus_stop", "is_major": true},
    {"name": "Ernakulam South", "code": "EKS", "district": "Ernakulam", "lat": 9.9790, "lng": 76.2890, "type": "bus_stand", "is_major": true},
    {"name": "Ernakulam KSRTC Bus Stand", "code": "EKM-K", "district": "Ernakulam", "lat": 9.9816, "lng": 76.2999, "type": "bus_stand", "is_major": true},
    {"name": "Vyttila Mobility Hub", "code": "VYT", "district": "Ernakulam", "lat": 9.9674, "lng": 76.3204, "type": "bus_stand", "is_major": true},
    {"name": "Aluva Bus Stand", "code": "ALV", "district": "Ernakulam", "lat": 10.1099, "lng": 76.3495, "type": "bus_stand", "is_major": true},
    {"name": "Perumbavoor", "code": "PMB", "district": "Ernakulam", "lat": 10.1097, "lng": 76.4745, "type": "bus_stop", "is_major": true},
    {"name": "Muvattupuzha", "code": "MVP", "district": "Ernakulam", "lat": 9.9875, "lng": 76.5757, "type": "bus_stop", "is_major": true},
    {"name": "Angamaly", "code": "AGL", "district": "Ernakulam", "lat": 10.1960, "lng": 76.3860, "type": "bus_stop", "is_major": true},
    {"name": "North Paravur", "code": "NPR", "district": "Ernakulam", "lat": 10.1452, "lng": 76.2284, "type": "bus_stop", "is_major": false},
    {"name": "Thrissur Swaraj Round", "code": "TSR-SR", "district": "Thrissur", "lat": 10.5276, "lng": 76.2144, "type": "bus_stand", "is_major": true},
    {"name": "Thrissur KSRTC", "code": "TSR-K", "district": "Thrissur", "lat": 10.5210, "lng": 76.2108, "type": "bus_stand", "is_major": true},
    {"name": "Guruvayoor", "code": "GVR", "district": "Thrissur", "lat": 10.5935, "lng": 76.0417, "type": "bus_stop", "is_major": true},
    {"name": "Chalakudy", "code": "CKD", "district": "Thrissur", "lat": 10.3070, "lng": 76.3310, "type": "bus_stop", "is_major": true},
    {"name": "Irinjalakuda", "code": "IJK", "district": "Thrissur", "lat": 10.3440, "lng": 76.2137, "type": "bus_stop", "is_major": true},
    {"name": "Wadakkanchery", "code": "WDK", "district": "Thrissur", "lat": 10.6587, "lng": 76.2425, "type": "bus_stop", "is_major": false},
    {"name": "Palakkad Town Bus Stand", "code": "PKD-T", "district": "Palakkad", "lat": 10.7867, "lng": 76.6548, "type": "bus_stand", "is_major": true},
    {"name": "Palakkad KSRTC", "code": "PKD-K", "district": "Palakkad", "lat": 10.7750, "lng": 76.6515, "type": "bus_stand", "is_major": true},
    {"name": "Ottapalam", "code": "OTP", "district": "Palakkad", "lat": 10.7725, "lng": 76.3760, "type": "bus_stop", "is_major": true},
    {"name": "Mannarkkad", "code": "MNK", "district": "Palakkad", "lat": 11.0020, "lng": 76.4530, "type": "bus_stop", "is_major": false},
    {"name": "Malappuram KSRTC", "code": "MLP-K", "district": "Malappuram", "lat": 11.0510, "lng": 76.0711, "type": "bus_stand", "is_major": true},
    {"name": "Manjeri", "code": "MJR", "district": "Malappuram", "lat": 11.1204, "lng": 76.1190, "type": "bus_stop", "is_major": true},
    {"name": "Nilambur", "code": "NLB", "district": "Malappuram", "lat": 11.2783, "lng": 76.2261, "type": "bus_stop", "is_major": true},
    {"name": "Tirur", "code": "TRR", "district": "Malappuram", "lat": 10.9148, "lng": 75.9225, "type": "bus_stop", "is_major": false},
    {"name": "Kozhikode Mofussil Bus Stand", "code": "KKD-M", "district": "Kozhikode", "lat": 11.2500, "lng": 75.7700, "type": "bus_stand", "is_major": true},
    {"name": "Kozhikode KSRTC", "code": "KKD-K", "district": "Kozhikode", "lat": 11.2588, "lng": 75.7804, "type": "bus_stand", "is_major": true},
    {"name": "Kozhikode Palayam", "code": "KKD-P", "district": "Kozhikode", "lat": 11.2480, "lng": 75.7730, "type": "bus_stop", "is_major": true},
    {"name": "Vadakara", "code": "VDK", "district": "Kozhikode", "lat": 11.5950, "lng": 75.4917, "type": "bus_stop", "is_major": false},
    {"name": "Wayanad Kalpetta", "code": "WYD-KLP", "district": "Wayanad", "lat": 11.6854, "lng": 76.0839, "type": "bus_stand", "is_major": true},
    {"name": "Sulthan Bathery", "code": "SBY", "district": "Wayanad", "lat": 11.6647, "lng": 76.2530, "type": "bus_stop", "is_major": true},
    {"name": "Mananthavady", "code": "MNT", "district": "Wayanad", "lat": 11.8014, "lng": 76.0036, "type": "bus_stop", "is_major": true},
    {"name": "Kannur Central Bus Stand", "code": "KNR-C", "district": "Kannur", "lat": 11.8745, "lng": 75.3704, "type": "bus_stand", "is_major": true},
    {"name": "Kannur KSRTC", "code": "KNR-K", "district": "Kannur", "lat": 11.8650, "lng": 75.3700, "type": "bus_stand", "is_major": true},
    {"name": "Thalassery", "code": "TLY", "district": "Kannur", "lat": 11.7490, "lng": 75.4904, "type": "bus_stop", "is_major": true},
    {"name": "Payyanur", "code": "PYR", "district": "Kannur", "lat": 12.0939, "lng": 75.2060, "type": "bus_stop", "is_major": true},
    {"name": "Kasaragod Bus Stand", "code": "KSD-B", "district": "Kasaragod", "lat": 12.4996, "lng": 74.9869, "type": "bus_stand", "is_major": true},
    {"name": "Kasaragod KSRTC", "code": "KSD-K", "district": "Kasaragod", "lat": 12.5000, "lng": 74.9900, "type": "bus_stand", "is_major": true},
    {"name": "Kanhangad", "code": "KHD", "district": "Kasaragod", "lat": 12.3066, "lng": 75.0898, "type": "bus_stop", "is_major": false}
  ];

  const sampleRoutes = [
    {
      "route_id": "TVM-EKM-SF01",
      "name": "Thiruvananthapuram - Kochi SuperFast",
      "origin": "Thampanoor Bus Station",
      "destination": "Ernakulam KSRTC Bus Stand",
      "type": "superfast",
      "operator": "KSRTC",
      "distance_km": 220,
      "duration_minutes": 270,
      "via": ["Kollam KSRTC", "Alappuzha KSRTC", "Cherthala"],
      "departure_times": ["05:00", "06:30", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
      "fare_inr": 210,
      "color": "#C3372C"
    },
    {
      "route_id": "TVM-EKM-AC01",
      "name": "Thiruvananthapuram - Kochi AC Volvo",
      "origin": "Thampanoor Bus Station",
      "destination": "Vyttila Mobility Hub",
      "type": "volvo",
      "operator": "KSRTC SWIFT",
      "distance_km": 220,
      "duration_minutes": 240,
      "via": ["Kollam KSRTC", "Alappuzha KSRTC"],
      "departure_times": ["06:00", "10:00", "14:00", "18:00", "22:00"],
      "fare_inr": 580,
      "color": "#F0B23E"
    },
    {
      "route_id": "EKM-KKD-SF01",
      "name": "Kochi - Kozhikode SuperFast",
      "origin": "Ernakulam KSRTC Bus Stand",
      "destination": "Kozhikode KSRTC",
      "type": "superfast",
      "operator": "KSRTC",
      "distance_km": 250,
      "duration_minutes": 330,
      "via": ["Thrissur KSRTC", "Malappuram KSRTC"],
      "departure_times": ["05:30", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
      "fare_inr": 240,
      "color": "#C3372C"
    },
    {
      "route_id": "TVM-KLM-ORD01",
      "name": "Thiruvananthapuram - Kollam Ordinary",
      "origin": "Thampanoor Bus Station",
      "destination": "Kollam KSRTC",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 72,
      "duration_minutes": 120,
      "via": ["Kazhakoottam", "Attingal"],
      "departure_times": ["05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00"],
      "fare_inr": 55,
      "color": "#39B6A0"
    },
    {
      "route_id": "EKM-TSR-FP01",
      "name": "Kochi - Thrissur Fast Passenger",
      "origin": "Ernakulam KSRTC Bus Stand",
      "destination": "Thrissur KSRTC",
      "type": "fast",
      "operator": "KSRTC",
      "distance_km": 80,
      "duration_minutes": 120,
      "via": ["Aluva Bus Stand", "Angamaly", "Chalakudy"],
      "departure_times": ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
      "fare_inr": 72,
      "color": "#4A90E2"
    },
    {
      "route_id": "EKM-MNR-ORD01",
      "name": "Kochi - Munnar Ordinary",
      "origin": "Ernakulam KSRTC Bus Stand",
      "destination": "Munnar",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 130,
      "duration_minutes": 270,
      "via": ["Perumbavoor", "Muvattupuzha", "Thodupuzha"],
      "departure_times": ["06:00", "08:00", "10:00", "12:00", "14:30"],
      "fare_inr": 95,
      "color": "#27AE60"
    },
    {
      "route_id": "TVM-KKD-SD01",
      "name": "Thiruvananthapuram - Kozhikode Super Deluxe",
      "origin": "Thampanoor Bus Station",
      "destination": "Kozhikode KSRTC",
      "type": "superdeluxe",
      "operator": "KSRTC",
      "distance_km": 400,
      "duration_minutes": 540,
      "via": ["Kollam KSRTC", "Alappuzha KSRTC", "Ernakulam KSRTC Bus Stand", "Thrissur KSRTC"],
      "departure_times": ["06:00", "14:00", "20:00"],
      "fare_inr": 450,
      "color": "#9B59B6"
    },
    {
      "route_id": "KKD-WYD-ORD01",
      "name": "Kozhikode - Wayanad Ordinary",
      "origin": "Kozhikode KSRTC",
      "destination": "Wayanad Kalpetta",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 100,
      "duration_minutes": 180,
      "via": [],
      "departure_times": ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00"],
      "fare_inr": 70,
      "color": "#39B6A0"
    },
    {
      "route_id": "KKD-KNR-FP01",
      "name": "Kozhikode - Kannur Fast Passenger",
      "origin": "Kozhikode KSRTC",
      "destination": "Kannur KSRTC",
      "type": "fast",
      "operator": "KSRTC",
      "distance_km": 92,
      "duration_minutes": 150,
      "via": ["Vadakara", "Thalassery"],
      "departure_times": ["05:30", "06:30", "07:30", "08:30", "09:30", "10:30"],
      "fare_inr": 80,
      "color": "#4A90E2"
    },
    {
      "route_id": "KNR-KSD-ORD01",
      "name": "Kannur - Kasaragod Ordinary",
      "origin": "Kannur KSRTC",
      "destination": "Kasaragod KSRTC",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 108,
      "duration_minutes": 180,
      "via": ["Payyanur", "Kanhangad"],
      "departure_times": ["05:00", "06:30", "08:00", "10:00", "12:00", "14:00"],
      "fare_inr": 75,
      "color": "#39B6A0"
    },
    {
      "route_id": "EKM-KTM-FP01",
      "name": "Kochi - Kottayam Fast Passenger",
      "origin": "Ernakulam KSRTC Bus Stand",
      "destination": "Kottayam KSRTC",
      "type": "fast",
      "operator": "KSRTC",
      "distance_km": 60,
      "duration_minutes": 90,
      "via": ["Vyttila Mobility Hub"],
      "departure_times": ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
      "fare_inr": 55,
      "color": "#4A90E2"
    },
    {
      "route_id": "TSR-PKD-FP01",
      "name": "Thrissur - Palakkad Fast Passenger",
      "origin": "Thrissur KSRTC",
      "destination": "Palakkad KSRTC",
      "type": "fast",
      "operator": "KSRTC",
      "distance_km": 65,
      "duration_minutes": 100,
      "via": ["Wadakkanchery", "Ottapalam"],
      "departure_times": ["06:00", "07:30", "09:00", "10:30", "12:00", "14:00", "16:00"],
      "fare_inr": 58,
      "color": "#4A90E2"
    },
    {
      "route_id": "TSR-GVR-ORD01",
      "name": "Thrissur - Guruvayoor Ordinary",
      "origin": "Thrissur Swaraj Round",
      "destination": "Guruvayoor",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 30,
      "duration_minutes": 50,
      "via": [],
      "departure_times": ["05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00"],
      "fare_inr": 25,
      "color": "#39B6A0"
    },
    {
      "route_id": "KTM-PTA-ORD01",
      "name": "Kottayam - Pathanamthitta Ordinary",
      "origin": "Kottayam KSRTC",
      "destination": "Pathanamthitta KSRTC",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 75,
      "duration_minutes": 130,
      "via": ["Changanassery", "Adoor"],
      "departure_times": ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00"],
      "fare_inr": 55,
      "color": "#39B6A0"
    },
    {
      "route_id": "TVM-KSD-SF01",
      "name": "Thiruvananthapuram - Kasaragod SuperFast",
      "origin": "Thampanoor Bus Station",
      "destination": "Kasaragod KSRTC",
      "type": "superfast",
      "operator": "KSRTC",
      "distance_km": 590,
      "duration_minutes": 720,
      "via": ["Kollam KSRTC", "Alappuzha KSRTC", "Ernakulam KSRTC Bus Stand", "Thrissur KSRTC", "Kozhikode KSRTC", "Kannur KSRTC"],
      "departure_times": ["05:00", "17:00", "19:00"],
      "fare_inr": 540,
      "color": "#C3372C"
    },
    {
      "route_id": "MLP-KKD-ORD01",
      "name": "Malappuram - Kozhikode Ordinary",
      "origin": "Malappuram KSRTC",
      "destination": "Kozhikode KSRTC",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 50,
      "duration_minutes": 90,
      "via": [],
      "departure_times": ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
      "fare_inr": 38,
      "color": "#39B6A0"
    },
    {
      "route_id": "MLP-MJR-ORD01",
      "name": "Malappuram - Manjeri Ordinary",
      "origin": "Malappuram KSRTC",
      "destination": "Manjeri",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 18,
      "duration_minutes": 35,
      "via": [],
      "departure_times": ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30"],
      "fare_inr": 15,
      "color": "#39B6A0"
    },
    {
      "route_id": "MJR-NLB-ORD01",
      "name": "Manjeri - Nilambur Ordinary",
      "origin": "Manjeri",
      "destination": "Nilambur",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 35,
      "duration_minutes": 60,
      "via": [],
      "departure_times": ["06:30", "08:00", "10:00", "12:00", "14:00", "16:00"],
      "fare_inr": 28,
      "color": "#39B6A0"
    },
    {
      "route_id": "WYD-SBY-ORD01",
      "name": "Kalpetta - Sulthan Bathery Ordinary",
      "origin": "Wayanad Kalpetta",
      "destination": "Sulthan Bathery",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 30,
      "duration_minutes": 50,
      "via": [],
      "departure_times": ["06:00", "07:30", "09:00", "10:30", "12:00", "14:00", "16:00"],
      "fare_inr": 22,
      "color": "#39B6A0"
    },
    {
      "route_id": "WYD-MNT-ORD01",
      "name": "Kalpetta - Mananthavady Ordinary",
      "origin": "Wayanad Kalpetta",
      "destination": "Mananthavady",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 32,
      "duration_minutes": 55,
      "via": [],
      "departure_times": ["06:30", "08:00", "10:00", "12:00", "14:00", "16:30"],
      "fare_inr": 24,
      "color": "#39B6A0"
    },
    {
      "route_id": "KNR-TLY-ORD01",
      "name": "Kannur - Thalassery Ordinary",
      "origin": "Kannur Central Bus Stand",
      "destination": "Thalassery",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 22,
      "duration_minutes": 40,
      "via": [],
      "departure_times": ["05:30", "06:00", "06:30", "07:00", "07:30", "08:00"],
      "fare_inr": 18,
      "color": "#39B6A0"
    },
    {
      "route_id": "EKM-ALP-FP01",
      "name": "Kochi - Alappuzha Fast Passenger",
      "origin": "Ernakulam KSRTC Bus Stand",
      "destination": "Alappuzha KSRTC",
      "type": "fast",
      "operator": "KSRTC",
      "distance_km": 55,
      "duration_minutes": 90,
      "via": ["Cherthala"],
      "departure_times": ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
      "fare_inr": 50,
      "color": "#4A90E2"
    },
    {
      "route_id": "PKD-OTP-ORD01",
      "name": "Palakkad - Ottapalam Ordinary",
      "origin": "Palakkad KSRTC",
      "destination": "Ottapalam",
      "type": "ordinary",
      "operator": "KSRTC",
      "distance_km": 42,
      "duration_minutes": 70,
      "via": [],
      "departure_times": ["06:00", "07:30", "09:00", "10:30", "12:00", "14:00"],
      "fare_inr": 32,
      "color": "#39B6A0"
    }
  ];

  const metroStations = [
    {"id": 1, "name": "Aluva", "code": "ALV", "lat": 10.1099, "lng": 76.3495, "zone": 1, "type": "metro_terminal"},
    {"id": 2, "name": "Pulinchodu", "code": "PLC", "lat": 10.0973, "lng": 76.3468, "zone": 1, "type": "metro_station"},
    {"id": 3, "name": "Companypady", "code": "CMP", "lat": 10.0878, "lng": 76.3398, "zone": 1, "type": "metro_station"},
    {"id": 4, "name": "Ambattukavu", "code": "AMB", "lat": 10.0791, "lng": 76.3335, "zone": 1, "type": "metro_station"},
    {"id": 5, "name": "Muttom", "code": "MTM", "lat": 10.0700, "lng": 76.3280, "zone": 2, "type": "metro_station"},
    {"id": 6, "name": "Kalamassery", "code": "KLM", "lat": 10.0583, "lng": 76.3218, "zone": 2, "type": "metro_station"},
    {"id": 7, "name": "CUSAT", "code": "CUS", "lat": 10.0467, "lng": 76.3185, "zone": 2, "type": "metro_station"},
    {"id": 8, "name": "Pathadipalam", "code": "PTD", "lat": 10.0390, "lng": 76.3120, "zone": 2, "type": "metro_station"},
    {"id": 9, "name": "Edapally", "code": "EDP", "lat": 10.0256, "lng": 76.3083, "zone": 3, "type": "metro_station"},
    {"id": 10, "name": "Changampuzha Park", "code": "CGP", "lat": 10.0155, "lng": 76.3048, "zone": 3, "type": "metro_station"},
    {"id": 11, "name": "Palarivattom", "code": "PLR", "lat": 10.0065, "lng": 76.3048, "zone": 3, "type": "metro_station"},
    {"id": 12, "name": "JLN Stadium", "code": "JLN", "lat": 9.9988, "lng": 76.2998, "zone": 3, "type": "metro_station"},
    {"id": 13, "name": "Kaloor", "code": "KLR", "lat": 9.9944, "lng": 76.2913, "zone": 4, "type": "metro_station"},
    {"id": 14, "name": "Town Hall", "code": "TWH", "lat": 9.9912, "lng": 76.2882, "zone": 4, "type": "metro_station"},
    {"id": 15, "name": "MG Road", "code": "MGR", "lat": 9.9833, "lng": 76.2823, "zone": 4, "type": "metro_station"},
    {"id": 16, "name": "Maharaja's College", "code": "MHC", "lat": 9.9800, "lng": 76.2850, "zone": 4, "type": "metro_station"},
    {"id": 17, "name": "Ernakulam South", "code": "EKS", "lat": 9.9790, "lng": 76.2890, "zone": 5, "type": "metro_station"},
    {"id": 18, "name": "Kadavanthra", "code": "KDV", "lat": 9.9720, "lng": 76.2930, "zone": 5, "type": "metro_station"},
    {"id": 19, "name": "Elamkulam", "code": "ELK", "lat": 9.9680, "lng": 76.2990, "zone": 5, "type": "metro_station"},
    {"id": 20, "name": "Vyttila", "code": "VYT", "lat": 9.9674, "lng": 76.3204, "zone": 5, "type": "metro_interchange"},
    {"id": 21, "name": "Thaikoodam", "code": "TKD", "lat": 9.9600, "lng": 76.3150, "zone": 6, "type": "metro_station"},
    {"id": 22, "name": "Pettah", "code": "PTH", "lat": 9.9530, "lng": 76.3100, "zone": 6, "type": "metro_station"},
    {"id": 23, "name": "SN Junction", "code": "SNJ", "lat": 9.9480, "lng": 76.3320, "zone": 6, "type": "metro_station"},
    {"id": 24, "name": "Tripunithura", "code": "TRP", "lat": 9.9467, "lng": 76.3437, "zone": 6, "type": "metro_terminal"}
  ];

  const ferryServices = [
    {
      "id": "FRY-EKM-VYP-01",
      "route": "Ernakulam - Vypin",
      "origin": "Ernakulam Boat Jetty",
      "origin_lat": 9.9701,
      "origin_lng": 76.2804,
      "destination": "Vypin Boat Jetty",
      "dest_lat": 9.9856,
      "dest_lng": 76.2412,
      "operator": "KSWTD",
      "district": "Ernakulam",
      "frequency_minutes": 20,
      "first_service": "06:00",
      "last_service": "21:30",
      "fare_inr": 7,
      "duration_minutes": 15,
      "type": "ferry"
    },
    {
      "id": "FRY-EKM-FWB-01",
      "route": "Ernakulam - Fort Kochi",
      "origin": "Ernakulam Boat Jetty",
      "origin_lat": 9.9701,
      "origin_lng": 76.2804,
      "destination": "Fort Kochi Customs Jetty",
      "dest_lat": 9.9658,
      "dest_lng": 76.2435,
      "operator": "KSWTD",
      "district": "Ernakulam",
      "frequency_minutes": 25,
      "first_service": "06:30",
      "last_service": "21:00",
      "fare_inr": 7,
      "duration_minutes": 20,
      "type": "ferry"
    },
    {
      "id": "FRY-EKM-MAT-01",
      "route": "Ernakulam - Mattancherry",
      "origin": "Ernakulam Boat Jetty",
      "origin_lat": 9.9701,
      "origin_lng": 76.2804,
      "destination": "Mattancherry Jetty",
      "dest_lat": 9.9577,
      "dest_lng": 76.2570,
      "operator": "KSWTD",
      "district": "Ernakulam",
      "frequency_minutes": 30,
      "first_service": "07:00",
      "last_service": "20:00",
      "fare_inr": 8,
      "duration_minutes": 25,
      "type": "ferry"
    },
    {
      "id": "FRY-ALP-KTN-01",
      "route": "Alappuzha - Kottayam",
      "origin": "Alappuzha Boat Jetty",
      "origin_lat": 9.4906,
      "origin_lng": 76.3265,
      "destination": "Kottayam Kodimatha Jetty",
      "dest_lat": 9.5890,
      "dest_lng": 76.5180,
      "operator": "KSWTD",
      "district": "Alappuzha",
      "frequency_minutes": 60,
      "first_service": "07:30",
      "last_service": "17:30",
      "fare_inr": 30,
      "duration_minutes": 150,
      "type": "ferry"
    },
    {
      "id": "FRY-ALP-CHG-01",
      "route": "Alappuzha - Changanassery",
      "origin": "Alappuzha Boat Jetty",
      "origin_lat": 9.4906,
      "origin_lng": 76.3265,
      "destination": "Changanassery Jetty",
      "dest_lat": 9.4420,
      "dest_lng": 76.5350,
      "operator": "KSWTD",
      "district": "Alappuzha",
      "frequency_minutes": 90,
      "first_service": "08:00",
      "last_service": "16:00",
      "fare_inr": 25,
      "duration_minutes": 120,
      "type": "ferry"
    },
    {
      "id": "FRY-KLM-GUR-01",
      "route": "Kollam - Guhanandapuram",
      "origin": "Kollam Boat Jetty",
      "origin_lat": 8.8890,
      "origin_lng": 76.5920,
      "destination": "Guhanandapuram Jetty",
      "dest_lat": 8.9450,
      "dest_lng": 76.6210,
      "operator": "KSWTD",
      "district": "Kollam",
      "frequency_minutes": 45,
      "first_service": "07:00",
      "last_service": "18:00",
      "fare_inr": 15,
      "duration_minutes": 40,
      "type": "ferry"
    },
    {
      "id": "FRY-ALP-KLM-01",
      "route": "Alappuzha - Kollam Backwater Cruise",
      "origin": "Alappuzha Boat Jetty",
      "origin_lat": 9.4906,
      "origin_lng": 76.3265,
      "destination": "Kollam Boat Jetty",
      "dest_lat": 8.8890,
      "dest_lng": 76.5920,
      "operator": "KSWTD",
      "district": "Alappuzha",
      "frequency_minutes": 0,
      "first_service": "10:30",
      "last_service": "10:30",
      "fare_inr": 400,
      "duration_minutes": 480,
      "note": "Daily scenic backwater tourist cruise",
      "type": "tourist_ferry"
    }
  ];

  const fareRates = {
    "ordinary": { "base": 10.0, "per_km": 0.90, "minimum": 10.0, "label": "Ordinary / City Bus" },
    "fast": { "base": 15.0, "per_km": 1.05, "minimum": 15.0, "label": "Fast Passenger (FP)" },
    "superfast": { "base": 22.0, "per_km": 1.15, "minimum": 22.0, "label": "SuperFast (SF)" },
    "superdeluxe": { "base": 30.0, "per_km": 1.30, "minimum": 30.0, "label": "Super Deluxe Air Express" },
    "ac": { "base": 40.0, "per_km": 1.50, "minimum": 40.0, "label": "AC Low Floor / Minnal" },
    "volvo": { "base": 50.0, "per_km": 1.80, "minimum": 50.0, "label": "KSRTC SWIFT / Volvo / Scania" }
  };

  const concessionRates = {
    "none": { "discount": 0.0, "label": "General Passenger (No Concession)" },
    "student": { "discount": 0.50, "label": "Student Concession (50% Off)" },
    "senior": { "discount": 0.30, "label": "Senior Citizen (30% Off)" },
    "disabled": { "discount": 0.50, "label": "Differently Abled (50% Off)" },
    "freedom_fighter": { "discount": 1.00, "label": "Freedom Fighter / Honoree (100% Free)" }
  };

  // Haversine Distance Formula in Kilometers
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const ALIAS_MAP = {
    'trivandrum': 'thiruvananthapuram',
    'thampanoor': 'thiruvananthapuram',
    'tvm': 'thiruvananthapuram',
    'cochin': 'kochi',
    'ernakulam': 'ernakulam',
    'vytilla': 'ernakulam',
    'vyttila': 'ernakulam',
    'ekm': 'ernakulam',
    'calicut': 'kozhikode',
    'kkd': 'kozhikode',
    'alleppey': 'alappuzha',
    'alp': 'alappuzha',
    'quilon': 'kollam',
    'klm': 'kollam',
    'trichur': 'thrissur',
    'tsr': 'thrissur',
    'palghat': 'palakkad',
    'pkd': 'palakkad',
    'cannanore': 'kannur',
    'knr': 'kannur'
  };

  function normalizeKey(str) {
    if (!str) return '';
    let s = str.toLowerCase()
      .replace(/[\(\)\/\-\,\.]/g, ' ')
      .replace(/\b(bus|stand|station|stop|depot|ksrtc|central|terminal|private|railway|junction|hub|boat|jetty)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    for (const [alias, real] of Object.entries(ALIAS_MAP)) {
      if (s.includes(alias)) {
        s = s.replace(alias, real);
      }
    }
    return s;
  }

  // Find stop / depot / station by exact or partial name
  function findStop(name) {
    if (!name) return null;
    const clean = name.toLowerCase().trim();
    const norm = normalizeKey(name);
    
    // 1. Exact Name/Code matches
    let found = majorStops.find(s => s.name.toLowerCase() === clean || s.code.toLowerCase() === clean);
    if (found) return { ...found, category: 'bus_stop' };

    found = ksrtcDepots.find(d => d.name.toLowerCase() === clean || d.code.toLowerCase() === clean || (d.name + ' KSRTC').toLowerCase() === clean);
    if (found) return { ...found, category: 'ksrtc_depot' };

    found = metroStations.find(m => m.name.toLowerCase() === clean || m.code.toLowerCase() === clean);
    if (found) return { ...found, category: 'metro_station' };

    found = ferryServices.find(f => f.origin.toLowerCase() === clean || f.destination.toLowerCase() === clean);
    if (found) {
      if (found.origin.toLowerCase() === clean) {
        return { name: found.origin, lat: found.origin_lat, lng: found.origin_lng, district: found.district, category: 'ferry_jetty' };
      } else {
        return { name: found.destination, lat: found.dest_lat, lng: found.dest_lng, district: found.district, category: 'ferry_jetty' };
      }
    }

    // 2. Normalized matches
    if (norm) {
      found = majorStops.find(s => normalizeKey(s.name).includes(norm) || norm.includes(normalizeKey(s.name)));
      if (found) return { ...found, category: 'bus_stop' };

      found = ksrtcDepots.find(d => normalizeKey(d.name).includes(norm) || norm.includes(normalizeKey(d.name)));
      if (found) return { ...found, category: 'ksrtc_depot' };

      found = districts.find(d => normalizeKey(d.name).includes(norm) || norm.includes(normalizeKey(d.name)));
      if (found) return { name: found.name + ' Central', lat: found.lat, lng: found.lng, district: found.name, category: 'district_hq' };
    }

    // 3. Fallback partial substring
    found = majorStops.find(s => s.name.toLowerCase().includes(clean) || clean.includes(s.name.toLowerCase()));
    if (found) return { ...found, category: 'bus_stop' };

    found = ksrtcDepots.find(d => d.name.toLowerCase().includes(clean) || clean.includes(d.name.toLowerCase()));
    if (found) return { ...found, category: 'ksrtc_depot' };

    return null;
  }

  // Calculate fare between any two stops with bus type and concession
  function calculateFare(fromStopName, toStopName, busType = 'ordinary', concession = 'none') {
    const fromStop = findStop(fromStopName);
    const toStop = findStop(toStopName);

    if (!fromStop || !toStop) {
      return {
        error: `Could not locate coordinates for '${fromStopName}' and/or '${toStopName}'.`
      };
    }

    const bType = busType.toLowerCase();
    const rates = fareRates[bType] || fareRates['ordinary'];
    const straightDist = haversineDistance(fromStop.lat, fromStop.lng, toStop.lat, toStop.lng);
    const roadDist = Math.round(straightDist * 1.3 * 10) / 10; // road winding factor

    const baseFare = rates.base;
    const perKm = rates.per_km;
    const calcFare = baseFare + (roadDist * perKm);
    const rawFare = Math.max(calcFare, rates.minimum);

    const conc = concessionRates[concession] || concessionRates['none'];
    const discountAmount = Math.round(rawFare * conc.discount * 100) / 100;
    const finalFare = Math.max(0, Math.round((rawFare - discountAmount)));

    return {
      from: fromStop.name,
      to: toStop.name,
      fromCoords: [fromStop.lat, fromStop.lng],
      toCoords: [toStop.lat, toStop.lng],
      bus_type: bType,
      bus_type_label: rates.label,
      straight_distance_km: Math.round(straightDist * 10) / 10,
      road_distance_km: roadDist,
      base_fare_inr: baseFare,
      per_km_rate_inr: perKm,
      fare_before_discount: Math.round(rawFare),
      concession: concession,
      concession_label: conc.label,
      discount_inr: discountAmount,
      total_fare_inr: finalFare,
      currency: "INR"
    };
  }

  // Find Route (Bus, Metro, or Ferry)
  function planRoute(fromName, toName, modeFilter = 'all') {
    if (!fromName || !toName) return [];
    const fromClean = fromName.toLowerCase().trim();
    const toClean = toName.toLowerCase().trim();
    const fromNorm = normalizeKey(fromName);
    const toNorm = normalizeKey(toName);
    const results = [];

    // 1. Check direct or matching bus routes
    sampleRoutes.forEach(r => {
      const matchOrigin = r.origin.toLowerCase().includes(fromClean) || fromClean.includes(r.origin.toLowerCase());
      const matchDest = r.destination.toLowerCase().includes(toClean) || toClean.includes(r.destination.toLowerCase());
      const matchViaFrom = r.via.some(v => v.toLowerCase().includes(fromClean) || fromClean.includes(v.toLowerCase()));
      const matchViaTo = r.via.some(v => v.toLowerCase().includes(toClean) || toClean.includes(v.toLowerCase()));

      if ((matchOrigin || matchViaFrom) && (matchDest || matchViaTo)) {
        // Collect sequence of stops
        const fullStops = [r.origin, ...r.via, r.destination];
        const fromIdx = fullStops.findIndex(s => s.toLowerCase().includes(fromClean) || fromClean.includes(s.toLowerCase()));
        const toIdx = fullStops.findIndex(s => s.toLowerCase().includes(toClean) || toClean.includes(s.toLowerCase()));

        if (fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx) {
          const subStops = fullStops.slice(fromIdx, toIdx + 1);
          const stopCoords = subStops.map(s => {
            const stopObj = findStop(s);
            return stopObj ? [stopObj.lat, stopObj.lng] : null;
          }).filter(c => c !== null);

          results.push({
            mode: 'bus',
            operator: r.operator,
            route_id: r.route_id,
            name: r.name,
            service_type: r.type,
            from: fullStops[fromIdx],
            to: fullStops[toIdx],
            stops_list: subStops,
            stop_count: subStops.length,
            coords: stopCoords,
            distance_km: r.distance_km,
            duration_minutes: r.duration_minutes,
            fare_inr: r.fare_inr,
            departures: r.departure_times,
            color: r.color || '#C3372C'
          });
        }
      }
    });

    // 2. Check Kochi Metro
    const metroFromIdx = metroStations.findIndex(m => m.name.toLowerCase() === fromClean);
    const metroToIdx = metroStations.findIndex(m => m.name.toLowerCase() === toClean);
    if (metroFromIdx !== -1 && metroToIdx !== -1) {
      let routeStations = [];
      if (metroFromIdx <= metroToIdx) {
        routeStations = metroStations.slice(metroFromIdx, metroToIdx + 1);
      } else {
        routeStations = metroStations.slice(metroToIdx, metroFromIdx + 1).reverse();
      }
      const numStops = Math.abs(metroToIdx - metroFromIdx);
      const zonesCrossed = Math.abs(metroStations[metroToIdx].zone - metroStations[metroFromIdx].zone);
      const fare = 10 + (zonesCrossed * 10);
      const timeMin = Math.round(numStops * 2.2);

      results.push({
        mode: 'metro',
        operator: 'Kochi Metro Rail Ltd (KMRL)',
        route_id: 'KMRL-BLUE-01',
        name: `Kochi Metro: ${metroStations[metroFromIdx].name} → ${metroStations[metroToIdx].name}`,
        service_type: 'metro',
        from: metroStations[metroFromIdx].name,
        to: metroStations[metroToIdx].name,
        stops_list: routeStations.map(s => s.name),
        stop_count: routeStations.length,
        coords: routeStations.map(s => [s.lat, s.lng]),
        distance_km: Math.round(numStops * 1.1 * 10) / 10,
        duration_minutes: timeMin,
        fare_inr: fare,
        departures: ["Every 5 to 7 mins (06:00 AM - 10:30 PM)"],
        color: '#00A8FF'
      });
    }

    // 3. Check Ferries (Bidirectional & fuzzy)
    ferryServices.forEach(f => {
      const o = f.origin.toLowerCase();
      const d = f.destination.toLowerCase();
      const matchForward = (o.includes(fromClean) || fromClean.includes(o) || (fromNorm && o.includes(fromNorm))) &&
                           (d.includes(toClean) || toClean.includes(d) || (toNorm && d.includes(toNorm)));
      const matchReverse = (o.includes(toClean) || toClean.includes(o) || (toNorm && o.includes(toNorm))) &&
                           (d.includes(fromClean) || fromClean.includes(d) || (fromNorm && d.includes(fromNorm)));

      if (matchForward || matchReverse) {
        const fromStopName = matchForward ? f.origin : f.destination;
        const toStopName = matchForward ? f.destination : f.origin;
        const coords = matchForward ? [[f.origin_lat, f.origin_lng], [f.dest_lat, f.dest_lng]] : [[f.dest_lat, f.dest_lng], [f.origin_lat, f.origin_lng]];
        results.push({
          mode: 'ferry',
          operator: f.operator,
          route_id: f.id,
          name: `Water Transport: ${fromStopName} ↔ ${toStopName}`,
          service_type: f.type,
          from: fromStopName,
          to: toStopName,
          stops_list: [fromStopName, toStopName],
          stop_count: 2,
          coords: coords,
          distance_km: Math.round(haversineDistance(f.origin_lat, f.origin_lng, f.dest_lat, f.dest_lng) * 10) / 10,
          duration_minutes: f.duration_minutes,
          fare_inr: f.fare_inr,
          departures: [`Frequency: every ${f.frequency_minutes || 'daily'} mins (${f.first_service} to ${f.last_service})`],
          color: '#39B6A0'
        });
      }
    });
    // If no direct route found in sample routes, compute estimated intercity road route between the 2 stops!
    if (results.length === 0) {
      const startStop = findStop(fromName);
      const endStop = findStop(toName);
      if (startStop && endStop) {
        const dist = Math.round(haversineDistance(startStop.lat, startStop.lng, endStop.lat, endStop.lng) * 1.3 * 10) / 10;
        const estMinutes = Math.round(dist * 1.4); // approx 45 km/h avg speed with stops
        const fare = calculateFare(startStop.name, endStop.name, 'fast', 'none');

        results.push({
          mode: 'bus',
          operator: 'KSRTC Intercity Network',
          route_id: `KSRTC-${startStop.code || 'ORG'}-${endStop.code || 'DST'}`,
          name: `${startStop.name} to ${endStop.name} Connected Service`,
          service_type: 'fast',
          from: startStop.name,
          to: endStop.name,
          stops_list: [startStop.name, "En Route Kerala Transport Hub", endStop.name],
          stop_count: 3,
          coords: [[startStop.lat, startStop.lng], [endStop.lat, endStop.lng]],
          distance_km: dist,
          duration_minutes: estMinutes,
          fare_inr: fare.total_fare_inr,
          departures: ["06:00", "08:30", "11:00", "13:30", "16:00", "18:30", "21:00"],
          color: '#C3372C',
          is_estimated: true
        });
      }
    }

    if (modeFilter && modeFilter !== 'all') {
      return results.filter(r => r.mode === modeFilter);
    }
    return results;
  }

  // Get nearest stops to a latitude/longitude
  function getNearbyStops(lat, lng, limit = 5) {
    const allStops = [
      ...majorStops.map(s => ({ ...s, category: 'bus_stop' })),
      ...ksrtcDepots.map(d => ({ ...d, category: 'ksrtc_depot' })),
      ...metroStations.map(m => ({ ...m, category: 'metro_station' }))
    ];

    const withDist = allStops.map(s => ({
      ...s,
      distance_km: Math.round(haversineDistance(lat, lng, s.lat, s.lng) * 10) / 10
    }));

    withDist.sort((a, b) => a.distance_km - b.distance_km);
    return withDist.slice(0, limit);
  }

  // Return public API
  const api = {
    districts,
    ksrtcDepots,
    majorStops,
    sampleRoutes,
    metroStations,
    ferryServices,
    fareRates,
    concessionRates,
    haversineDistance,
    findStop,
    calculateFare,
    planRoute,
    getNearbyStops
  };

  if (typeof window !== 'undefined') {
    window.KeralaTransitData = api;
  }

  return api;
})();

// Export for Node/CommonJS if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KeralaTransitData;
}
