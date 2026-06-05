const latitudeElement = document.getElementById("latitude");
const longitudeElement = document.getElementById("longitude");
const accuracyElement = document.getElementById("accuracy");
const lastUpdateElement = document.getElementById("last-update");

navigator.geolocation.watchPosition(

    (position) => {

        alert("Position reçue !");

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        latitudeElement.textContent =
        `Latitude : ${latitude}`;

        longitudeElement.textContent =
        `Longitude : ${longitude}`;

        accuracyElement.textContent =
        `Précision : ${Math.round(accuracy)} m`;

        lastUpdateElement.textContent =
        `Dernière mise à jour : ${new Date().toLocaleTimeString()}`;
    },

    (error) => {

        alert(
            `Erreur GPS : ${error.code} - ${error.message}`
        );

    },

    {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }
);