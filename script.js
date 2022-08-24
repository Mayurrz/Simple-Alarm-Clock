/*
 * Declaring variables
 */

//Variable for form.
const formDisplay = document.querySelector(".create-alarm");

//Variable to clear alarm.
const clearAlarm = document.querySelector(".cancel");

//Variable for displaying Alarm Time
const Time = document.getElementById("time");

//Variable for displaying alarm name
const Name = document.getElementById("name");

//Variable for displaying alarm description
const Description = document.getElementById("description");

//Variable for initializing Speech Synthesis
const synth = window.speechSynthesis;

//Variable for Audio element
const alarmAudio = document.getElementById("alarm-audio");

/*
 * Handling creating and submission of form
 */
//String value of active alarm
let alarmstring;

// Handle create alarm Submit
const handleSubmit = (event) => {
  event.preventDefault(); //To prevent default reloading
  const { hourInput, minuteInput, secondInput, zone } = document.forms[0];
  alarmstring = getTimeString({
    hours: hourInput.value,
    minutes: minuteInput.value,
    seconds: secondInput.value,
    zone: zone.value,
  });

  //Making the name and description show
  Name.innerText = document.getElementById("nameInput").value;
  Description.innerText = document.getElementById("descriptionInput").value;

  let alarmTime;
  if (minuteInput.value < 10 && secondInput.value < 10) {
    alarmTime = `${hourInput.value}:0${minuteInput.value}:0${secondInput.value} ${zone.value}`;
  } else if (minuteInput.value < 10) {
    alarmTime = `${hourInput.value}:0${minuteInput.value}:${secondInput.value} ${zone.value}`;
  } else if (secondInput.value < 10) {
    alarmTime = `${hourInput.value}:${minuteInput.value}:0${secondInput.value} ${zone.value}`;
  } else {
    alarmTime = `${hourInput.value}:${minuteInput.value}:${secondInput.value} ${zone.value}`;
  }
  Time.innerText = alarmTime;

  //Reset form after submit
  document.forms[0].reset();

  //Hide Form
  formDisplay.style.display = "none";

  //Show Cancel button
  clearAlarm.style.display = "block";

  //Hide .display
  document.querySelector(".details").style.display = "none";
  document.querySelector(".display").style.borderRadius = "15px";
};
document.forms[0].addEventListener("submit", handleSubmit);

/*
 * Clearing the form on button click.
 */
const handleClick = () => {
  Time.innerText = "00:00:00";
  formDisplay.style.display = "block";
  clearAlarm.style.display = "none";
    document.querySelector(".details").style.display = "block";
    document.querySelector(".display").style.borderRadius = "15px 15PX 0 0";
  Name.innerText = "Alarm Name";
  Description.innerText = "Alarm Description";
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
};
clearAlarm.addEventListener("click", handleClick);

/*
* Triggering Alarm
*/
//initializing the alarm sound
alarmAudio.src = "http://soundbible.com/grab.php?id=2061&type=mp3";
alarmAudio.load();

const checkAlarm = (timeString) => {
  if (alarmstring === timeString) {
      console.log("It is time");
      const spak = `Heyyo!! It's ${document.getElementById("time").innerText}, ${
        document.getElementById("description").innerText
      }`;
      let yellThis = new SpeechSynthesisUtterance(spak);
      synth.speak(yellThis);
      window.setTimeout(() => {
      alarmAudio.play();
      }, 6000);
  }
};

/*
 * Creating and initiating the time stamp.
 */
// Converting time to string value
const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

//Displaying the current time
const renderTime = () => {
  let currentTime = document.getElementById("current-time");

  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

// To update it every second
setInterval(renderTime, 1000);
