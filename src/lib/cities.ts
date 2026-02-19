export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const CITIES: City[] = [
  { name: "Karachi", country: "Pakistan", lat: 24.8607, lon: 67.0011 },
  { name: "Lahore", country: "Pakistan", lat: 31.5204, lon: 74.3587 },
  { name: "Islamabad", country: "Pakistan", lat: 33.6844, lon: 73.0479 },
  { name: "Rawalpindi", country: "Pakistan", lat: 33.5651, lon: 73.0169 },
  { name: "Faisalabad", country: "Pakistan", lat: 31.4504, lon: 73.135 },
  { name: "Multan", country: "Pakistan", lat: 30.1575, lon: 71.5249 },
  { name: "Peshawar", country: "Pakistan", lat: 34.0151, lon: 71.5249 },
  { name: "Quetta", country: "Pakistan", lat: 30.1798, lon: 66.975 },
  { name: "Hyderabad", country: "Pakistan", lat: 25.396, lon: 68.3578 },
  { name: "Sialkot", country: "Pakistan", lat: 32.4945, lon: 74.5229 },
  { name: "Gujranwala", country: "Pakistan", lat: 32.1877, lon: 74.1945 },
  { name: "Bahawalpur", country: "Pakistan", lat: 29.3544, lon: 71.6911 },
  { name: "Sargodha", country: "Pakistan", lat: 32.0836, lon: 72.6711 },
  { name: "Sukkur", country: "Pakistan", lat: 27.7052, lon: 68.8574 },
  { name: "Abbottabad", country: "Pakistan", lat: 34.1688, lon: 73.2215 },
  { name: "Mardan", country: "Pakistan", lat: 34.1986, lon: 72.0404 },
  { name: "Mingora", country: "Pakistan", lat: 34.7717, lon: 72.36 },
  { name: "Sahiwal", country: "Pakistan", lat: 30.6682, lon: 73.1114 },
  { name: "Larkana", country: "Pakistan", lat: 27.5583, lon: 68.2128 },
  { name: "Dera Ghazi Khan", country: "Pakistan", lat: 30.0489, lon: 70.6455 },

  { name: "New Delhi", country: "India", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", country: "India", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", country: "India", lat: 12.9716, lon: 77.5946 },
  { name: "Ahmedabad", country: "India", lat: 23.0225, lon: 72.5714 },
  { name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707 },
  { name: "Hyderabad", country: "India", lat: 17.385, lon: 78.4867 },
  { name: "Kolkata", country: "India", lat: 22.5726, lon: 88.3639 },
  { name: "Lucknow", country: "India", lat: 26.8467, lon: 80.9462 },
  { name: "Jaipur", country: "India", lat: 26.9124, lon: 75.7873 },
  { name: "Srinagar", country: "India", lat: 34.0837, lon: 74.7973 },

  { name: "Makkah", country: "Saudi Arabia", lat: 21.3891, lon: 39.8579 },
  { name: "Madinah", country: "Saudi Arabia", lat: 24.5247, lon: 39.5692 },
  { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lon: 46.6753 },
  { name: "Jeddah", country: "Saudi Arabia", lat: 21.4858, lon: 39.1925 },
  { name: "Dubai", country: "UAE", lat: 25.2048, lon: 55.2708 },
  { name: "Abu Dhabi", country: "UAE", lat: 24.4539, lon: 54.3773 },
  { name: "Sharjah", country: "UAE", lat: 25.3463, lon: 55.4209 },
  { name: "Doha", country: "Qatar", lat: 25.2854, lon: 51.531 },
  { name: "Kuwait City", country: "Kuwait", lat: 29.3759, lon: 47.9774 },
  { name: "Muscat", country: "Oman", lat: 23.588, lon: 58.3829 },
  { name: "Manama", country: "Bahrain", lat: 26.2285, lon: 50.5860 },

  { name: "Istanbul", country: "Turkey", lat: 41.0082, lon: 28.9784 },
  { name: "Ankara", country: "Turkey", lat: 39.9334, lon: 32.8597 },
  { name: "Baghdad", country: "Iraq", lat: 33.3152, lon: 44.3661 },
  { name: "Tehran", country: "Iran", lat: 35.6892, lon: 51.389 },
  { name: "Amman", country: "Jordan", lat: 31.9454, lon: 35.9284 },
  { name: "Beirut", country: "Lebanon", lat: 33.8938, lon: 35.5018 },
  { name: "Damascus", country: "Syria", lat: 33.5138, lon: 36.2765 },
  { name: "Jerusalem", country: "Palestine", lat: 31.7683, lon: 35.2137 },
  { name: "Gaza", country: "Palestine", lat: 31.5, lon: 34.47 },
  { name: "Sanaa", country: "Yemen", lat: 15.3694, lon: 44.191 },

  { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lon: 90.4125 },
  { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lon: 79.8612 },
  { name: "Kabul", country: "Afghanistan", lat: 34.5553, lon: 69.2075 },
  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lon: 106.8456 },
  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lon: 101.6869 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },

  { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lon: 69.2401 },
  { name: "Bishkek", country: "Kyrgyzstan", lat: 42.8746, lon: 74.5698 },
  { name: "Baku", country: "Azerbaijan", lat: 40.4093, lon: 49.8671 },

  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792 },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898 },
  { name: "Algiers", country: "Algeria", lat: 36.7538, lon: 3.0588 },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lon: 10.1815 },
  { name: "Khartoum", country: "Sudan", lat: 15.5007, lon: 32.5599 },
  { name: "Mogadishu", country: "Somalia", lat: 2.0469, lon: 45.3182 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
  { name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241 },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.187 },

  { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "Birmingham", country: "UK", lat: 52.4862, lon: -1.8904 },
  { name: "Manchester", country: "UK", lat: 53.4808, lon: -2.2426 },
  { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405 },
  { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041 },
  { name: "Brussels", country: "Belgium", lat: 50.8503, lon: 4.3517 },
  { name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964 },
  { name: "Athens", country: "Greece", lat: 37.9838, lon: 23.7275 },
  { name: "Moscow", country: "Russia", lat: 55.7558, lon: 37.6173 },
  { name: "Sarajevo", country: "Bosnia", lat: 43.8563, lon: 18.4131 },
  { name: "Stockholm", country: "Sweden", lat: 59.3293, lon: 18.0686 },
  { name: "Oslo", country: "Norway", lat: 59.9139, lon: 10.7522 },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lon: -6.2603 },

  { name: "New York", country: "USA", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", country: "USA", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", country: "USA", lat: 41.8781, lon: -87.6298 },
  { name: "Houston", country: "USA", lat: 29.7604, lon: -95.3698 },
  { name: "Dallas", country: "USA", lat: 32.7767, lon: -96.797 },
  { name: "Miami", country: "USA", lat: 25.7617, lon: -80.1918 },
  { name: "Toronto", country: "Canada", lat: 43.6532, lon: -79.3832 },
  { name: "Vancouver", country: "Canada", lat: 49.2827, lon: -123.1207 },
  { name: "Montreal", country: "Canada", lat: 45.5017, lon: -73.5673 },

  { name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lon: 144.9631 },
  { name: "Auckland", country: "New Zealand", lat: -36.8485, lon: 174.7633 },

  { name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", country: "South Korea", lat: 37.5665, lon: 126.978 },
  { name: "Beijing", country: "China", lat: 39.9042, lon: 116.4074 },
  { name: "Hong Kong", country: "China", lat: 22.3193, lon: 114.1694 },
];

export function searchCities(query: string): City[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  return CITIES.filter(
    (c) => c.country === "Pakistan" && c.name.toLowerCase().includes(q)
  ).slice(0, 8);
}
