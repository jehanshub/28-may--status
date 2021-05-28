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


let map, mapEvent;
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition( function (position){
            // console.log(position);
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.co.in/maps/@${latitude},${longitude}`);

            const coords = [latitude,longitude]

            map = L.map('map').setView(coords, 13);

            // console.log(map);
        
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            //Handling clicks on map

            map.on('click', function(mape){ 
                               
         //on is coming form leaflet library
                mapEvent = mape;
                form.classList.remove('hidden');
                inputDistance.focus();
            // console.log(mapEvent);
            
            });
        },

        //error function  
        function (){
            alert(`could not get your Loaction`);
        }
    );

    form.addEventListener('submit', function(e){
        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ' ';
        // Display the marker
        e.preventDefault();
        console.log(mapEvent);
            const {lat , lng} = mapEvent.latlng;


                L.marker([lat , lng]).addTo(map)
                    .bindPopup(L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: 'running-popup',
                    })
                )
                .setPopupContent('WorkOut')
                .openPopup();
    });


    //change cycling & Running
    inputType.addEventListener('change', function(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')//Running
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')//Cycling
    });