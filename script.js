let alarmTime = null;
let alarmTimeout = null;
let isAlarmRinging = false;

const timeDisplay = document.getElementById("time");
const alarmSound = document.getElementById("alarmSound");

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  timeDisplay.textContent = timeString;

  if (alarmTime && timeString === alarmTime && !isAlarmRinging) {
   ringAlarm();
  }
}

setInterval(updateTime, 1000);

function setAlarm() {
  const input = document.getElementById("alarmTime").value;
  if (!input) {
    alert("Please select a time first!");
    return;
  } 

  const [hours, minutes] = input.split(":");
  alarmTime = `${hours}:${minutes}:00`;
  document.getElementById("message").textContent = `Alarm set for ${alarmTime} 💡`;

    // UNLOCK audio by calling play on interaction
  alarmSound.play().then(() => {
    alarmSound.pause(); // Pause right away
    alarmSound.currentTime = 0; // Reset
  }).catch((err) => {
    console.log("Audio not allowed yet, will try again later.");
  });
}

const verses = [
  "Philippians 4:13 — I can do all things through Christ who strengthens me.",
  "Jeremiah 29:11 — 'For I know the plans I have for you,' declares the Lord.",
  "Proverbs 3:5-6 — Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight. Trust in the Lord with all your heart and lean not on your own understanding.",
  "Isaiah 40:31 — Those who hope in the Lord will renew their strength.",
  "Psalm 46:5 — God is within her, she will not fall.",
  "Psalm 119:143 - As pressure and stress bear down on me, I find joy in your commands.",
  "Romans 8:28 — All things work together for good to those who love God.",
  "Matthew 6:34 — Do not worry about tomorrow, for tomorrow will worry about itself.",
  "Psalm 23:4 — Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
  "Mathew 19:26 - Jesus looked at them intently and said, 'Humanely speaking, it is impossible. But with God, everything is possible.'",
  "Psalm 16:8 - I know the Lord is always with me. I will not be shaken, for he is right beside me."
];

function getVerse() {
  const verseDisplay = document.getElementById("verse");
  const randomIndex = Math.floor(Math.random() * verses.length);
  verseDisplay.textContent = verses[randomIndex];
}

getVerse(); // show a verse on load

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.getElementById("modeToggle").checked = isDark;
}

// Load saved theme on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("modeToggle").checked = true;
  }
  getVerse(); // also show verse on load if enabled
};

function playAlarmSound() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.play();
}

function stopAlarm() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.pause();
  alarmSound.currentTime = 0;
  isAlarmRinging = false;
  document.getElementById("alarm-controls").style.display = "none";
  message.textContent = "🌷 Alarm stopped. You’ve got this!";
}

function snoozeAlarm() {
  stopAlarm();
  const snoozeMinutes = 10;

  const [hour, minute] = alarmTime.split(":").map(Number);
  const snoozedDate = new Date();
  snoozedDate.setHours(hour, minute + snoozeMinutes); // Add 10 minutes

  const newHour = String(snoozedDate.getHours()).padStart(2, "0");
  const newMinute = String(snoozedDate.getMinutes()).padStart(2, "0");
  alarmTime = `${newHour}:${newMinute}:00`; // Keep full format with seconds

  document.getElementById("message").textContent = `😴 Snoozed until ${alarmTime}`;
}

// Save alarm
localStorage.setItem("alarmTime", alarmTime);

// On load
const savedAlarm = localStorage.getItem("alarmTime");
if (savedAlarm) alarmTime = savedAlarm;

function ringAlarm() {
  isAlarmRinging = true;
  document.getElementById("message").textContent = "⏰ Time to slay your studies!";
  playAlarmSound();
  document.getElementById("alarm-controls").style.display = "block";

  if ("vibrate" in navigator) {
    navigator.vibrate([300, 100, 300]);
  }
}
