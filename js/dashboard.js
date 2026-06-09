/*
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
    */
const menuBtn =
document.getElementById("menu-btn");

const sidebar =
document.querySelector(".sidebar");

if(menuBtn){

    menuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "active"
            );

        }
    );

}
document.addEventListener("click", (e) => {

    const isMobile =
    window.innerWidth <= 768;

    if(
        isMobile &&
        sidebar.classList.contains("active") &&
        !sidebar.contains(e.target) &&
        e.target !== menuBtn
    ){

        sidebar.classList.remove("active");

        menuBtn.textContent = "☰";

    }

});
const devices =
document.querySelectorAll(".device-card");

devices.forEach(device => {

    device.addEventListener("click", () => {

        document
        .querySelector(".active-device")
        ?.classList.remove(
            "active-device"
        );

        device.classList.add(
            "active-device"
        );

    });

});
const devicesData = {

    iphone: {
        name: "📱 iPhone Personnel",
        status: "🟢 En ligne",
        battery: "🔋 82%",
        latitude: -4.2634,
        longitude: 15.2429,
        accuracy: "5m"
    },

    samsung: {
        name: "📱 Samsung Test",
        status: "🟢 En ligne",
        battery: "🔋 78%",
        latitude: -4.2678,
        longitude: 15.2510,
        accuracy: "10m"
    },

    tecno: {
        name: "📱 Tecno Spark",
        status: "🔴 Hors ligne",
        battery: "🔋 12%",
        latitude: -4.2750,
        longitude: 15.2350,
        accuracy: "20m"
    }

};
const deviceCards =
document.querySelectorAll(".device-card");

const deviceName =
document.getElementById("device-name");

const deviceStatus =
document.getElementById("device-status");

const deviceBattery =
document.getElementById("device-battery");

const latitude =
document.getElementById("latitude");

const longitude =
document.getElementById("longitude");

const accuracy =
document.getElementById("accuracy");

deviceCards.forEach(card => {

    card.addEventListener("click", () => {

        document
        .querySelector(".active-device")
        ?.classList.remove(
            "active-device"
        );

        card.classList.add(
            "active-device"
        );

        const key =
        card.dataset.device;

        const device =
        devicesData[key];
        map.flyTo({

            center: [
                device.longitude,
                device.latitude
            ],

            zoom: 17,

            speed: 1.2

        });

        marker.setLngLat([
            device.longitude,
            device.latitude
        ]);

        deviceName.textContent =
        device.name;

        deviceStatus.textContent =
        device.status;

        deviceBattery.textContent =
        device.battery;

        latitude.textContent =
        `Latitude : ${device.latitude}`;

        longitude.textContent =
        `Longitude : ${device.longitude}`;

        accuracy.textContent =
        `Précision : ${device.accuracy}`;

    });

});
const map = new maplibregl.Map({

    container: "map",

    style:
    "https://api.maptiler.com/maps/streets-v2/style.json?key=qawnxrN9A0uFg13kFZuz",

    center: [15.2429, -4.2634],

    zoom: 15

});
map.addControl(
    new maplibregl.NavigationControl()
);
new maplibregl.Marker()

.setLngLat([
    15.2429,
    -4.2634
])

.addTo(map);
map.on("load", () => {

map.setPitch(60);

});
const marker = new maplibregl.Marker()
    .setLngLat([15.2429, -4.2634])
    .addTo(map);
