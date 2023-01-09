import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'
import { Html5QrcodeScanner } from 'html5-qrcode'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `
// setupCounter(document.querySelector('#counter'))


// QR Code Scanner
const scanner = new Html5QrcodeScanner('reader', {
  qrbox: {
    width: 250,
    height: 250,
  },
  fps: 20,
});

// scanner.render(success, error);

// function success(result) {
//   // console.log(result);
//   document.getElementById('result').innerHTML = `<h2>Success!</h2><p><a href="${result}">${result}</a></p>`;

//   scanner.clear();
//   document.getElementById('reader').remove();
// }

// function error(err) {
//   console.error(err);
// }

// Start button
var startButton = document.querySelector("#js--start");
// Stop button
var stopButton = document.querySelector("#js--stop");
// Reset button
var resetButton = document.querySelector("#js--reset");
// Stopwatch, the element which will show the time
var stopwatch = document.querySelector("#js--stopwatch");

// Variable to use for the stopwatch time
var time = 0; // 78900 => centiseconds: 90 seconds: 18 minutes: 1

// Format and display the time on the screen
function display(time) {
  var centiseconds = Math.floor((time % 1000) / 10);
  var seconds = Math.floor(time / 1000) % 60;
  var minutes = Math.floor(Math.floor(time / 1000) / 60);

  // Format centisecond before shown on the screen
  if (centiseconds < 10) {
    // If centiseconds is less than 10, add a zero before the centiseconds in string
    centiseconds = "0" + centiseconds.toString();
  } else {
    // Otherwise just show the centiseconds
    centiseconds = centiseconds.toString();
  }

  // Format seconds before shown on the screen
  if (seconds < 10) {
    // If seconds is less than 10, add a zero before the seconds in string
    seconds = "0" + seconds.toString();
  } else {
    // Otherwise just show the seconds
    seconds = seconds.toString();
  }

  // Format minutes before shown on the screen
  if (minutes < 10) {
    // If minutes is less than 10, add a zero before the minutes in string
    minutes = "0" + minutes.toString();
  } else {
    // Otherwise just show the minutes
    minutes = minutes.toString();
  }

  // Update the UI
  stopwatch.innerHTML = minutes + ":" + seconds + "." + centiseconds;
}

display(0);

var stopwatchTimerId;


scanner.render(success, error);

function success(result) {
  if(result === "https://samsung.summit.exchange/qr/code/160/redirect/"){
  var startTime = new Date(), currentTime, actualTime, toAdd = 0;
  console.log(startTime);
  
  stopwatchTimerId = setInterval(function () {
    currentTime = new Date();
    actualTime = currentTime - startTime + toAdd;
  
    // Increment our time variable by 10ms (1 centisecond) at each interval
    time = time + 10;
  
    if (actualTime - time !== 0) {
      if (actualTime - time < -10) {
        // We'll run this after we had a pause
        toAdd = time - actualTime;
      } else {
        time = actualTime;
      }
    }
  
    display(time);
  }, 10);} else if (result === "https://samsung.summit.exchange/qr/code/156/redirect/") {
    if (stopwatchTimerId) clearInterval(stopwatchTimerId);
  } else {
    document.getElementById('result').innerHTML = `<h2>Failed!</h2><p><a href="${result}">${result}</a></p>`;
    // scanner.clear();
    // document.getElementById('reader').remove();
  }
}

function error(err) {
    console.error(err);
  }