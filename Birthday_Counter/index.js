const startBtn = document.getElementById('startBtn');
const birthdayInput = document.getElementById('birthday');
const countdownElement = document.getElementById('countdown');
const timerElement = document.getElementById('timer');

startBtn.addEventListener('click', () => {
  const birthdayValue = birthdayInput.value;
  if (!birthdayValue) {
    alert("Please enter your birthdate.");
    return;
  }

  const birthday = new Date(birthdayValue);
  const today = new Date();

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const birthdayThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

  if (todayMidnight.getTime() === birthdayThisYear.getTime()) {
    countdownElement.style.display = 'block';
    timerElement.innerHTML = "🎉 Happy Birthday! 🎂";
    return;
  }

  let nextBirthday = birthdayThisYear;
  if (todayMidnight > birthdayThisYear) {
    nextBirthday = new Date(today.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
  }

  countdownElement.style.display = 'block';

  function updateCountdown() {
    const now = new Date();
    const timeDifference = nextBirthday - now;

    if (timeDifference <= 0) {
      timerElement.innerHTML = "🎉 Happy Birthday! 🎂";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
