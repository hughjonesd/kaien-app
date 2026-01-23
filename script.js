const MODE_SEQUENCE = ["pair", "upper", "lower"];

const ITEMS = [
  { letter: "A", word: "apple" },
  { letter: "B", word: "box" },
  { letter: "C", word: "cat" },
  { letter: "D", word: "dog" },
  { letter: "E", word: "egg" },
  { letter: "F", word: "fish" },
  { letter: "G", word: "goose" },
  { letter: "H", word: "hand" },
  { letter: "I", word: "ill" },
  { letter: "J", word: "jump" },
  { letter: "K", word: "key" },
  { letter: "L", word: "lion" },
  { letter: "M", word: "mug" },
  { letter: "N", word: "nose" },
  { letter: "O", word: "owl" },
  { letter: "P", word: "pen" },
  { letter: "Q", word: "queen" },
  { letter: "R", word: "rose" },
  { letter: "S", word: "swing" },
  { letter: "T", word: "toad" },
  { letter: "U", word: "umbrella" },
  { letter: "V", word: "van" },
  { letter: "W", word: "wheel" },
  { letter: "X", word: "xylophone" },
  { letter: "Y", word: "yawn" },
  { letter: "Z", word: "zebra" },
];

const card = document.getElementById("card");
const picture = document.getElementById("picture");
const caption = document.getElementById("caption");
const choices = document.getElementById("choices");
const modeToggle = document.getElementById("modeToggle");
const soundToggle = document.getElementById("soundToggle");

const state = {
  order: [],
  index: 0,
  mode: "pair",
  solved: false,
  current: null,
  soundEnabled: true,
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatLetter(letter, mode) {
  if (mode === "upper") return letter.toUpperCase();
  if (mode === "lower") return letter.toLowerCase();
  return `${letter.toUpperCase()}${letter.toLowerCase()}`;
}

function highlightCaption(text, letter) {
  const regex = new RegExp(letter, "gi");
  return text.replace(regex, (match) => `<span class="hit">${match}</span>`);
}

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getCaption(word) {
  if (state.mode === "lower") return word.toLowerCase();
  return titleCase(word);
}

function pickChoices(correctLetter) {
  const letters = ITEMS.map((item) => item.letter);
  const pool = letters.filter((letter) => letter !== correctLetter);
  const shuffled = shuffle(pool).slice(0, 2);
  return shuffle([correctLetter, ...shuffled]);
}

function renderChoices(letters) {
  choices.innerHTML = "";
  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.letter = letter;
    button.textContent = formatLetter(letter, state.mode);
    button.setAttribute("aria-label", `Letter ${formatLetter(letter, state.mode)}`);
    choices.appendChild(button);
  });

  if (state.solved && state.current) {
    const correct = choices.querySelector(`[data-letter=\"${state.current.letter}\"]`);
    if (correct) correct.classList.add("correct");
  }
}

function renderCard() {
  if (!state.current) return;
  card.classList.toggle("solved", state.solved);
  picture.src = `images/${state.current.letter}-${state.current.word}.png`;
  picture.alt = state.current.word;

  if (state.solved) {
    const text = getCaption(state.current.word);
    caption.innerHTML = highlightCaption(text, state.current.letter);
  } else {
    caption.textContent = "";
  }
}

function speakCurrent() {
  if (!state.soundEnabled || !state.current) return;
  if (!("speechSynthesis" in window)) return;

  const spokenLetter =
    state.mode === "lower" ? state.current.letter.toLowerCase() : state.current.letter.toUpperCase();
  const phrase = `${spokenLetter} for ${state.current.word}`;
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.rate = 0.8;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function nextRound() {
  if (state.order.length === 0 || state.index >= state.order.length) {
    state.order = shuffle(ITEMS.map((item) => item.letter));
    state.index = 0;
  }

  const letter = state.order[state.index];
  state.current = ITEMS.find((item) => item.letter === letter);
  state.solved = false;
  state.index += 1;

  const choiceLetters = pickChoices(letter);
  renderChoices(choiceLetters);
  renderCard();
}

function handleChoice(event) {
  const button = event.target.closest("button");
  if (!button || state.solved) return;

  const chosen = button.dataset.letter;
  if (chosen !== state.current.letter) {
    button.classList.add("faded");
    return;
  }

  state.solved = true;
  button.classList.add("correct");
  renderCard();
  speakCurrent();

  window.setTimeout(() => {
    nextRound();
  }, 3000);
}

function cycleMode() {
  const currentIndex = MODE_SEQUENCE.indexOf(state.mode);
  const next = MODE_SEQUENCE[(currentIndex + 1) % MODE_SEQUENCE.length];
  state.mode = next;
  modeToggle.textContent = next === "pair" ? "Aa" : next === "upper" ? "A" : "a";

  const letter = state.current?.letter;
  if (letter) {
    const choiceLetters = Array.from(choices.querySelectorAll("button")).map(
      (btn) => btn.dataset.letter
    );
    renderChoices(choiceLetters);
  }
  renderCard();
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  soundToggle.setAttribute("aria-label", state.soundEnabled ? "Sound on" : "Sound off");
  soundToggle.setAttribute("aria-pressed", String(!state.soundEnabled));
  soundToggle.classList.toggle("is-off", !state.soundEnabled);
  if (!state.soundEnabled && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

choices.addEventListener("click", handleChoice);
modeToggle.addEventListener("click", cycleMode);
soundToggle.addEventListener("click", toggleSound);

nextRound();
