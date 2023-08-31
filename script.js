const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const setAlarmBtn = document.querySelector('#setBtn');
const content = document.querySelector('#content');
const ringTone = new Audio('Music/alarm.mp3');
const secondBtn = document.querySelector('#secondBtn');
const body = document.querySelector('body');
const resumeBtn = document.querySelector('#resumeBtn');
const welcomeBackScreen = document.querySelector('#welcomeBack');
const alarmTimeIndicator = document.querySelector('#alarmText');
let CurrentTime = document.querySelector('#currentTime');

if 
(!localStorage.getItem('userExited')) 
{
    localStorage.setItem('userExited', 'false');
} else 
   {
    
    //  if user has returned to webpage and previously set-up an alarm then show resume button
    if (localStorage.getItem('userExited') == 'true' && localStorage.getItem('isAlarmSet') == 'true') {
        welcomeBackScreen.className = 'welcomeBack flex';
    }
}

// Play ring continous for resume
if (!localStorage.getItem('wantToPlay')) {
    localStorage.setItem('wantToPlay', 'no');
}

// Hide Alarm indicator if not set-up
if (localStorage.getItem('alarmTime') == "00:00:AM")
    alarmTimeIndicator.className = "d-none";


if (!localStorage.getItem('contentClass')) 
{
    localStorage.setItem('contentClass', 'content flex');
    content.className = localStorage.getItem('contentClass');
} else 
{
    content.className = localStorage.getItem('contentClass');
}

// button text
if (!localStorage.getItem('btnText'))
 {
    localStorage.setItem('btnText', 'Set Alarm');
    setAlarmBtn.textContent = localStorage.getItem('btnText');
} else
{
    setAlarmBtn.textContent = localStorage.getItem('btnText');
}

//  defualt isAlarm
if (!localStorage.getItem('isAlarmSet')) 
{
    localStorage.setItem('isAlarmSet', 'false');
}

//  default alarm time
if (!localStorage.getItem('alarmTime')) 
{
    localStorage.setItem('alarmTime', '00:00:PM');
}

// Set-up hour value
for (let i = 12; i > 0; i--) 
{
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    hour.firstElementChild.insertAdjacentHTML("afterend", option);
}

//  Minute value
for (let i = 59; i >= 0; i--) 
{
    i = i < 10 ? "0" + i : i;
    let option = ` <option value="${i}">${i}</option>`;
    minute.firstElementChild.insertAdjacentHTML("afterend", option);
}

// AM/PM value
for (let i = 2; i > 0; i--) 
{
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend", option);
}


// Play Alarm function
const playAlarm = () => 
{
    if ((localStorage.getItem('userExited') == 'xxx') || (localStorage.getItem('wantToPlay' == 'yes'))) {
        ringTone.play();
    }
   
    ringTone.loop = true;
}

setInterval(() => 
{
    let date = new Date();

    let h = date.getHours(); 
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    // 12 Hour Format
    if (h > 11) 
    {
    h = h - 12;
  
    ampm = 'PM'
    }

    // if hour value is 0 then set it to 12
    h = h == 0 ? h = 12 : h;
    
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // Update time every second
    currentTime.textContent = `${h}:${m}:${s} ${ampm}`;

    // Play ringtone if alarm time mathces with current time
    if ((localStorage.getItem('alarmTime') == `${h}:${m}:${ampm}`) || (localStorage.getItem('wantToPlay') == 'yes')) {
        playAlarm();
    }
}, 1000);



 
const setAlarm = () =>
 {

    
    if (localStorage.getItem('isAlarmSet') == 'true')
     {
        // Reset Alarm time
        localStorage.setItem('alarmTime', "00:00:AM");
        ringTone.pause();
     
        localStorage.setItem('contentClass', 'content flex')
        content.className = localStorage.getItem('contentClass');
        
        // change button text to "Set alarm"
        localStorage.setItem('btnText', 'Set Alarm')
        setAlarmBtn.textContent = localStorage.getItem('btnText');
        
        // Hide resume button
        resumeBtn.hidden = true
        
        // Reset alarm indicator
        alarmTimeIndicator.textContent = "Alarm Time set to: ";
        alarmTimeIndicator.className = "d-none";
        
        // Set want to play to no to stop alarm
        localStorage.setItem('wantToPlay', 'no')
    
        return localStorage.setItem('isAlarmSet', 'false');
    }

    // alarm time from user
    let time = `${hour.value}:${minute.value}:${AmPm.value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM"))
    {
        alert("Please select a valid time");
        return;
    }

    // Set-up alarm to true
    localStorage.setItem('isAlarmSet', 'true');
    
    // Se-upt alarm time
    localStorage.setItem('alarmTime', time);
    
    // Disable selection of time when alarm is set
    localStorage.setItem('contentClass', 'content flex disable');
    content.className = localStorage.getItem('contentClass');
    
    // Set-up button text to "Clear Alarm";
    localStorage.setItem('btnText', 'Clear Alarm')
    setAlarmBtn.textContent = localStorage.getItem('btnText');
    
    // Set-up Alarm Time indicator
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    alarmTimeIndicator.className = "";
    
    // Set-up user exited to false to avoid DOM exception
    localStorage.setItem('userExited', 'xxx');
}




const hideWelcomeScreen = () => 
{
    // hide WelcomeScreen
    welcomeBackScreen.className = 'd-none';
    
    // Set-up alarm time indicator
    alarmTimeIndicator.textContent = "Alarm Time set to: " + localStorage.getItem('alarmTime');
    
    // Set-up userExited to xxx to avoid DomException
    localStorage.setItem('userExited', 'xxx');
    
}



// Set-up Button
setAlarmBtn.addEventListener('click', setAlarm);

// Resume Button
resumeBtn.addEventListener('click', hideWelcomeScreen);

//  if user has exited the page or refreshed
const beforeUnloadListener = (event) => {
    localStorage.setItem('userExited', 'true');
};
window.addEventListener("beforeunload", beforeUnloadListener);