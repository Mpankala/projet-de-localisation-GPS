
let map;
let marker;
let circle;

const gpsStatus =
document.getElementById("gps-status");

const lastUpdate =
document.getElementById("last-update");
const latitudeElement =
document.getElementById("latitude");

const longitudeElement =
document.getElementById("longitude");

const accuracyElement =
document.getElementById("accuracy");
if (!navigator.geolocation) {
    alert("La géolocalisation n'est pas supportée.");
} else {

    navigator.geolocation.watchPosition(

        (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            latitudeElement.textContent =
`Latitude : ${latitude.toFixed(6)}`;

longitudeElement.textContent =
`Longitude : ${longitude.toFixed(6)}`;

accuracyElement.textContent =
`Précision : ${Math.round(accuracy)} m`;
            console.log("Latitude :", latitude);
            console.log("Longitude :", longitude);
            console.log("Précision :", accuracy);
            gpsStatus.textContent = "🟢 Actif";

lastUpdate.textContent =
new Date().toLocaleTimeString();

            // Première position
            if (!map) {

                map = L.map('map').setView(
                    [latitude, longitude],
                    15
                );

                L.tileLayer(
                    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        attribution:
                        '&copy; OpenStreetMap contributors'
                    }
                ).addTo(map);

                marker = L.marker(
                    [latitude, longitude]
                ).addTo(map);

                circle = L.circle(
                    [latitude, longitude],
                    {
                        radius: accuracy
                    }
                ).addTo(map);

            }

            // Mises à jour suivantes
            else {

                marker.setLatLng(
                    [latitude, longitude]
                );

                circle.setLatLng(
                    [latitude, longitude]
                );

                circle.setRadius(
                    accuracy
                );

                map.setView(
                    [latitude, longitude]
                );

            }

        },

        (error) => {
            console.error(error);
            gpsStatus.textContent = "🔴 Inactif";
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}