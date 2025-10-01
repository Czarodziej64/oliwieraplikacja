const characters = [
  { name: 'Darth Vader', image: 'vader.jpg' },
  { name: 'Luke Skywalker', image: 'luke.jpg' },
  { name: 'Leia Organa', image: 'leia.jpg' },
  { name: 'Yoda', image: 'yoda.jpg' }
];

let currentIndex = 0,
    errors = 0,
    timer,
    timeLeft = 30,
    correctAnswers = 0;

function startGame() {
  errors = correctAnswers = currentIndex = 0;
  timeLeft = 30;
  updateUI();
  startTimer();
}

function updateUI() {
  const character = characters[currentIndex];
  const img = document.getElementById('character-image');
  img.src = character.image;
  img.alt = character.name;

  document.getElementById('errors').textContent = `Błędy: ${errors}/2`;
  document.getElementById('time').textContent = timeLeft;

  const buttonsDiv = document.getElementById('buttons');
  buttonsDiv.innerHTML = '';

  const options = shuffle([
    ...characters.filter(c => c.name !== character.name).map(c => c.name).slice(0, 3),
    character.name
  ]);

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'answer';
    btn.onclick = () => checkAnswer(option);
    buttonsDiv.appendChild(btn);
  });
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function checkAnswer(selected) {
  if (selected === characters[currentIndex].name) {
    correctAnswers++;
    if (correctAnswers === characters.length) {
      clearInterval(timer);
      alert('Wszystkie odpowiedzi poprawne! Gratulacje!');
      return startGame();
    }
    currentIndex++;
  } else {
    errors++;
    if (errors >= 2) {
      clearInterval(timer);
      alert('Przegrałeś! Zbyt wiele błędów.');
      return startGame();
    }
  }
  updateUI();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert('Czas minął! Gra zakończona.');
      startGame();
    }
  }, 1000);
}

startGame();
