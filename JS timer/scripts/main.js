const jsTimer = document.querySelector(".js-timer-info");
const resetBtn = document.querySelector(".js-reset-button");
const stopBtn = document.querySelector(".js-stop-button");
const startBtn = document.querySelector(".js-start-button");
const jsWarning = document.querySelector(".js-warning");
const jsContinue = document.querySelector(".js-continue");
const jsContainer = document.querySelector(".js-continue-container");
const jsResetMessage = document.querySelector(".js-reset-message");

let timeSeconds = 0;
let timeMinutes = 0;
let timeHours = 0;
let intervalIdSeconds;
let intervalIdMinutes;
let intervalIdHours;

function updateTimerText() {
  jsTimer.innerHTML = `${timeHours} hours, ${timeMinutes} minutes, ${timeSeconds} seconds.`;
}

function timerStart() {
  if (intervalIdHours && intervalIdMinutes && intervalIdSeconds) {
    let timeoutId;

    jsWarning.innerHTML = "Already started timer!";

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      jsWarning.innerHTML = "";
    }, 2000);

    return;
  }

  updateTimer();
}

function updateTimer() {
  intervalIdSeconds = setInterval(() => {
    timeSeconds++;

    if (timeSeconds === 60) {
      timeSeconds = 0;
      timeMinutes++;
    }

    updateTimerText();
  }, 1000);

  intervalIdMinutes = setInterval(() => {
    if (timeMinutes === 60) {
      timeHours++;
      timeMinutes = 0;
    }
    timeSeconds = timeSeconds;
    updateTimerText();
  }, 60000);

  intervalIdHours = setInterval(() => {
    timeMinutes = timeMinutes;
    timeSeconds = timeSeconds;
    timeHours++;
    updateTimerText();
  }, 3600000);
}

function clearAllIds() {
  clearInterval(intervalIdHours);
  clearInterval(intervalIdSeconds);
  clearInterval(intervalIdMinutes);
}

function stopTimer() {
  clearAllIds();

  jsContinue.innerHTML = "Continue";

  jsContinue.addEventListener("click", () => {
    clearAllIds();
    jsContinue.innerHTML = "";
    jsResetMessage.innerHTML = "";
    updateTimer();
  });
}

startBtn.addEventListener("click", () => {
  timerStart();
});

stopBtn.addEventListener("click", () => {
  stopTimer();
});

resetBtn.addEventListener("click", () => {
  let timeoutId;

  jsResetMessage.innerHTML = "Resetted, press continue to start the timer.";

  stopTimer();

  timeHours = 0;
  timeMinutes = 0;
  timeSeconds = 0;
});
