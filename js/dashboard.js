
const mapStyles = {

    streets:
    "https://api.maptiler.com/maps/streets-v2/style.json?key=qawnxrN9A0uFg13kFZuz",

    dark:
    "https://api.maptiler.com/maps/backdrop/style.json?key=qawnxrN9A0uFg13kFZuz",

    satellite:
    "https://api.maptiler.com/maps/hybrid/style.json?key=qawnxrN9A0uFg13kFZuz"

};
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
const markerElement = document.createElement("div");

markerElement.className = "custom-marker";

const marker = new maplibregl.Marker({
    element: markerElement
})
.setLngLat([15.2429, -4.2634])
.addTo(map);
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            console.log("GPS :", lat, lng);

            map.flyTo({
                center: [lng, lat],
                zoom: 17
            });

            marker.setLngLat([lng, lat]);

            latitude.textContent =
            `Latitude : ${lat}`;

            longitude.textContent =
            `Longitude : ${lng}`;

            accuracy.textContent =
            `Précision : ${Math.round(position.coords.accuracy)} m`;

        },

        (error) => {
            console.error(error);
        }

    );

}
const styleButtons =
document.querySelectorAll(".style-btn");

styleButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        document
        .querySelector(".active-style")
        ?.classList.remove(
            "active-style"
        );

        btn.classList.add(
            "active-style"
        );

        const style =
        btn.dataset.style;

        map.setStyle(
            mapStyles[style]
        );

    });

});