const MODE_SEQUENCE = ["pair", "upper", "lower"];
const BACKGROUND_SEQUENCE = ["default", "sepia", "paper"];

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
  { letter: "W", word: "well" },
  { letter: "X", word: "xylophone" },
  { letter: "Y", word: "yawn" },
  { letter: "Z", word: "zebra" },
];

const card = document.getElementById("card");
const picture = document.getElementById("picture");
const caption = document.getElementById("caption");
const choices = document.getElementById("choices");
const appRoot = document.querySelector(".app");
const modeToggle = document.getElementById("modeToggle");
const soundToggle = document.getElementById("soundToggle");
const backgroundToggle = document.getElementById("backgroundToggle");
const menuToggle = document.getElementById("menuToggle");
const optionsMenu = document.getElementById("optionsMenu");

const audioCache = new Map();
let currentAudio = null;
let debugOverlay = null;

const state = {
  order: [],
  index: 0,
  mode: "pair",
  solved: false,
  current: null,
  soundEnabled: true,
  voice: null,
  background: "default",
  menuOpen: false,
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

function formatLetterMarkup(letter) {
  return `<span class="letter-pair"><span class="letter-upper">${letter.toUpperCase()}</span><span class="letter-lower">${letter.toLowerCase()}</span></span>`;
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

function buildAudioSrc(letter, word) {
  return `sound/${encodeURIComponent(letter)}-${encodeURIComponent(word)}.mp3`;
}

function getAudio(letter, word) {
  const key = `${letter}-${word}`;
  if (audioCache.has(key)) return audioCache.get(key);
  const audio = new Audio(buildAudioSrc(letter, word));
  audio.preload = "auto";
  audio.addEventListener("ended", () => {
    if (currentAudio === audio) currentAudio = null;
  });
  audioCache.set(key, audio);
  return audio;
}

function preloadAudio() {
  ITEMS.forEach((item) => {
    const audio = getAudio(item.letter, item.word);
    if (typeof audio.load === "function") {
      audio.load();
    }
  });
}

function stopAudio() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
}

function playAudio(letter, word) {
  if (!state.soundEnabled || !letter || !word) return;
  const audio = getAudio(letter, word);
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = audio;
  audio.currentTime = 0;
  const playAttempt = audio.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(() => {});
  }
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
    const label = formatLetter(letter, state.mode);
    if (state.mode === "pair") {
      button.innerHTML = formatLetterMarkup(letter);
    } else {
      button.textContent = label;
    }
    button.setAttribute("aria-label", `Letter ${label}`);
    choices.appendChild(button);
  });

  if (state.solved && state.current) {
    const correct = choices.querySelector(`[data-letter=\"${state.current.letter}\"]`);
    if (correct) correct.classList.add("correct");
  }

  updateDebugOverlay();
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

  updateDebugOverlay();
}

function playCurrent() {
  if (!state.current) return;
  playAudio(state.current.letter, state.current.word);
}

function playWordOnly(word) {
  if (!state.current || !word) return;
  playAudio(state.current.letter, word);
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
  playCurrent();

  window.setTimeout(() => {
    nextRound();
  }, 5000);
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
  if (!state.soundEnabled) stopAudio();
}

function applyBackground() {
  document.body.dataset.background = state.background;
  if (backgroundToggle) {
    backgroundToggle.dataset.mode = state.background;
    backgroundToggle.setAttribute("aria-label", `Background: ${state.background}`);
  }
}

function cycleBackground() {
  const currentIndex = BACKGROUND_SEQUENCE.indexOf(state.background);
  const next = BACKGROUND_SEQUENCE[(currentIndex + 1) % BACKGROUND_SEQUENCE.length];
  state.background = next;
  applyBackground();
}

function applyMenuState() {
  if (!menuToggle || !optionsMenu) return;
  const isOpen = state.menuOpen;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Hide options" : "Show options");
  optionsMenu.setAttribute("aria-hidden", String(!isOpen));
  menuToggle.closest(".controls")?.classList.toggle("is-open", isOpen);
}

function toggleMenu() {
  state.menuOpen = !state.menuOpen;
  applyMenuState();
  updateDebugOverlay();
}

function formatRect(rect) {
  if (!rect) return "n/a";
  return `${Math.round(rect.width)}x${Math.round(rect.height)} @ ${Math.round(rect.left)},${Math.round(
    rect.top
  )}`;
}

function updateDebugOverlay() {
  if (!debugOverlay) return;
  const appRect = appRoot?.getBoundingClientRect();
  const layoutRect = document.querySelector(".layout")?.getBoundingClientRect();
  const pictureRect = picture?.getBoundingClientRect();
  const choicesRect = choices?.getBoundingClientRect();
  const viewport = window.visualViewport;
  const appStyles = appRoot ? getComputedStyle(appRoot) : null;
  const pad = appStyles
    ? `t ${appStyles.paddingTop} r ${appStyles.paddingRight} b ${appStyles.paddingBottom} l ${appStyles.paddingLeft}`
    : "n/a";
  const lines = [
    `vw/vh: ${Math.round(window.innerWidth)}x${Math.round(window.innerHeight)}`,
    viewport
      ? `visual: ${Math.round(viewport.width)}x${Math.round(viewport.height)} off ${Math.round(
          viewport.offsetLeft
        )},${Math.round(viewport.offsetTop)} scale ${viewport.scale?.toFixed(2) ?? "n/a"}`
      : "visual: n/a",
    `dpr: ${window.devicePixelRatio}`,
    `app pad: ${pad}`,
    `app: ${formatRect(appRect)}`,
    `layout: ${formatRect(layoutRect)}`,
    `picture: ${formatRect(pictureRect)}`,
    `choices: ${formatRect(choicesRect)}`,
  ];
  debugOverlay.textContent = lines.join("\n");
}

function initDebugOverlay() {
  debugOverlay = document.createElement("pre");
  debugOverlay.className = "debug-overlay is-hidden";
  debugOverlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(debugOverlay);
  updateDebugOverlay();

  window.addEventListener("resize", updateDebugOverlay);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateDebugOverlay);
    window.visualViewport.addEventListener("scroll", updateDebugOverlay);
  }
}

choices.addEventListener("click", handleChoice);
modeToggle.addEventListener("click", cycleMode);
soundToggle.addEventListener("click", toggleSound);
if (backgroundToggle) backgroundToggle.addEventListener("click", cycleBackground);
if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
if (picture) picture.addEventListener("click", () => playWordOnly(state.current?.word));

applyBackground();
applyMenuState();
initDebugOverlay();
preloadAudio();
nextRound();
