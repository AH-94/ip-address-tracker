const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
const map = L.map('display__map', {
    center: [0, 0],
    zoom: 0,
    layers: L.tileLayer(tileUrl, { attribution })
});
const arrowIcon = L.icon({
    iconUrl: 'icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56]
});

const API_KEY = 'at_iISkD9ai1Id1bKZILgChIYJ22yX2q';
const API_URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;

const ipAddress = document.getElementById('IP__address');
const locationElmnt = document.getElementById('location');
const timeZone = document.getElementById('timezone');
const isp = document.getElementById('ISP');
const ipButton = document.getElementById('IP__button');

const ipForm = document.getElementById('IP__form');
const ipInput = document.getElementById('IP__input');



function updateMarker(coordinates = [42, 42]) {
   map.setView(coordinates, 13);
   L.marker(coordinates, {icon: arrowIcon}).addTo(map);
}

function updateMap(ipInfo) {

    let ip__url = '';

    if (ipInfo === undefined) {
        ip__url = API_URL;
    } else {
        ip__url = `${API_URL}&ipAddress=${ipInfo}`;
    }

    getIpAddress(ip__url);
}


async function getIpAddress(path) {
    const response = await fetch(path);
    const data = await response.json();
    const latitude = data.location.lat;
    const longitude = data.location.lng;
    ipAddress.textContent = data.ip;
    locationElmnt.textContent = data.location.city;
    timeZone.textContent = 'UTC ' + data.location.timezone;
    isp.textContent = data.isp;
    updateMarker([latitude, longitude]);
}


ipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = ipInput.value;
    if (inputValue === null || inputValue === '') return;
    updateMap(inputValue);
})

ipButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = ipInput.value;
    if (inputValue === null || inputValue === '') return;
    updateMap(inputValue);
})


getIpAddress(API_URL);
