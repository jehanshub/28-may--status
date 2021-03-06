'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position){
    
    //find currunt Location co-ordinates
    let {latitude} = position.coords;
    let {longitude} = position.coords; 

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    //console.log(position);
    const coords = [latitude,longitude];
    //name space 3rd party lib
    const map = L.map('map').setView(coords, 13);
    //theme
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords)
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
},function(){//error function
    alert('colud not get your position ');
});