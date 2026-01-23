const MODE_SEQUENCE = ["pair", "upper", "lower"];

const ITEMS = [
  { letter: "A", word: "apple" },
  { letter: "B", word: "box" },
  { letter: "C", word: "cat" },
  { letter: "D", word: "dog" },
  { letter: "E", word: "egg" },
  { letter: "F", word: "fly" },
  { letter: "G", word: "goose" },
  { letter: "H", word: "hand" },
  { letter: "I", word: "ill" },
  { letter: "J", word: "jump" },
  { letter: "K", word: "key" },
  { letter: "L", word: "lion" },
  { letter: "M", word: "man" },
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

const DRAWINGS = {
  A: `
    <circle class="fill" cx="100" cy="118" r="44" />
    <path d="M100 78 C96 60 106 42 125 36" />
    <path class="fill" d="M106 62 C120 48 150 52 150 74 C130 76 118 72 106 62 Z" />
    <circle cx="85" cy="112" r="6" />
  `,
  B: `
    <rect class="fill" x="50" y="66" width="84" height="84" rx="10" />
    <line x1="50" y1="66" x2="82" y2="44" />
    <line x1="134" y1="66" x2="166" y2="44" />
    <line x1="82" y1="44" x2="166" y2="44" />
    <line x1="134" y1="66" x2="166" y2="44" />
    <line x1="134" y1="150" x2="166" y2="128" />
  `,
  C: `
    <circle class="fill" cx="100" cy="112" r="42" />
    <path d="M70 86 L58 58 L84 74" />
    <path d="M130 86 L142 58 L116 74" />
    <circle cx="86" cy="112" r="4" />
    <circle cx="114" cy="112" r="4" />
    <path d="M86 128 Q100 140 114 128" />
    <line x1="58" y1="120" x2="30" y2="114" />
    <line x1="142" y1="120" x2="170" y2="114" />
  `,
  D: `
    <circle class="fill" cx="100" cy="112" r="38" />
    <path d="M68 100 Q48 104 50 124 Q56 138 72 132" />
    <path d="M132 100 Q152 104 150 124 Q144 138 128 132" />
    <circle cx="90" cy="110" r="4" />
    <circle cx="110" cy="110" r="4" />
    <circle cx="100" cy="124" r="5" />
  `,
  E: `
    <ellipse class="fill" cx="100" cy="112" rx="44" ry="56" />
    <path d="M84 80 Q100 70 116 80" />
  `,
  F: `
    <ellipse class="fill" cx="100" cy="120" rx="20" ry="40" />
    <ellipse class="fill" cx="64" cy="98" rx="28" ry="20" />
    <ellipse class="fill" cx="136" cy="98" rx="28" ry="20" />
    <line x1="100" y1="74" x2="100" y2="54" />
    <circle cx="100" cy="52" r="4" />
  `,
  G: `
    <ellipse class="fill" cx="96" cy="126" rx="46" ry="30" />
    <path d="M120 122 Q144 108 146 80 Q148 52 126 46" />
    <circle class="fill" cx="120" cy="46" r="12" />
    <circle cx="122" cy="44" r="2" />
  `,
  H: `
    <rect class="fill" x="60" y="80" width="70" height="70" rx="18" />
    <line x1="60" y1="92" x2="46" y2="78" />
    <line x1="76" y1="70" x2="76" y2="54" />
    <line x1="94" y1="68" x2="94" y2="52" />
    <line x1="112" y1="70" x2="112" y2="54" />
    <line x1="130" y1="80" x2="130" y2="60" />
  `,
  I: `
    <rect class="fill" x="42" y="110" width="116" height="50" rx="10" />
    <rect x="48" y="116" width="48" height="22" rx="6" />
    <circle class="fill" cx="70" cy="96" r="18" />
    <line x1="42" y1="110" x2="158" y2="110" />
    <line x1="88" y1="134" x2="146" y2="134" />
  `,
  J: `
    <circle class="fill" cx="100" cy="70" r="16" />
    <line x1="100" y1="86" x2="100" y2="132" />
    <line x1="80" y1="108" x2="100" y2="94" />
    <line x1="120" y1="108" x2="100" y2="94" />
    <line x1="100" y1="132" x2="80" y2="160" />
    <line x1="100" y1="132" x2="122" y2="156" />
    <path d="M46 64 Q62 52 78 58" />
  `,
  K: `
    <circle class="fill" cx="84" cy="96" r="22" />
    <circle cx="84" cy="96" r="6" />
    <rect class="fill" x="104" y="92" width="60" height="16" rx="6" />
    <line x1="134" y1="108" x2="134" y2="126" />
    <line x1="150" y1="108" x2="150" y2="126" />
  `,
  L: `
    <circle class="fill" cx="100" cy="110" r="34" />
    <circle cx="100" cy="110" r="50" />
    <path d="M86 118 Q100 130 114 118" />
    <circle cx="90" cy="106" r="4" />
    <circle cx="110" cy="106" r="4" />
  `,
  M: `
    <circle class="fill" cx="100" cy="76" r="18" />
    <line x1="100" y1="94" x2="100" y2="138" />
    <line x1="100" y1="108" x2="78" y2="128" />
    <line x1="100" y1="108" x2="122" y2="128" />
    <line x1="100" y1="138" x2="84" y2="168" />
    <line x1="100" y1="138" x2="118" y2="168" />
  `,
  N: `
    <path class="fill" d="M70 124 Q88 86 130 92" />
    <path d="M70 124 Q104 132 130 120" />
    <circle cx="130" cy="122" r="4" />
  `,
  O: `
    <ellipse class="fill" cx="100" cy="118" rx="44" ry="52" />
    <circle class="fill" cx="76" cy="106" r="18" />
    <circle class="fill" cx="124" cy="106" r="18" />
    <circle cx="76" cy="106" r="6" />
    <circle cx="124" cy="106" r="6" />
    <path d="M86 134 Q100 146 114 134" />
  `,
  P: `
    <rect class="fill" x="56" y="60" width="88" height="28" rx="8" transform="rotate(35 56 60)" />
    <rect class="fill" x="96" y="88" width="30" height="80" rx="6" transform="rotate(35 96 88)" />
    <path d="M136 140 L154 156 L140 168" />
  `,
  Q: `
    <circle class="fill" cx="100" cy="114" r="36" />
    <path d="M68 92 L80 64 L100 80 L120 64 L132 92" />
    <circle cx="100" cy="112" r="4" />
    <line x1="120" y1="140" x2="140" y2="160" />
  `,
  R: `
    <path class="fill" d="M100 66 C82 76 78 96 92 108 C106 120 126 112 130 94 C134 74 118 58 100 66 Z" />
    <line x1="100" y1="120" x2="100" y2="168" />
    <path d="M100 138 Q116 132 126 146" />
    <path d="M100 150 Q84 144 74 158" />
  `,
  S: `
    <line x1="50" y1="70" x2="150" y2="70" />
    <line x1="70" y1="70" x2="70" y2="120" />
    <line x1="130" y1="70" x2="130" y2="120" />
    <rect class="fill" x="72" y="120" width="56" height="18" rx="6" />
    <line x1="50" y1="60" x2="50" y2="70" />
    <line x1="150" y1="60" x2="150" y2="70" />
  `,
  T: `
    <ellipse class="fill" cx="100" cy="128" rx="46" ry="28" />
    <circle class="fill" cx="76" cy="96" r="16" />
    <circle class="fill" cx="124" cy="96" r="16" />
    <circle cx="76" cy="96" r="4" />
    <circle cx="124" cy="96" r="4" />
    <path d="M88 132 Q100 140 112 132" />
  `,
  U: `
    <path class="fill" d="M40 98 Q100 32 160 98" />
    <line x1="40" y1="98" x2="160" y2="98" />
    <line x1="100" y1="98" x2="100" y2="150" />
    <path d="M100 150 Q98 170 118 174" />
  `,
  V: `
    <rect class="fill" x="40" y="92" width="120" height="52" rx="12" />
    <rect x="60" y="72" width="44" height="20" rx="6" />
    <circle cx="70" cy="150" r="10" />
    <circle cx="130" cy="150" r="10" />
  `,
  W: `
    <circle class="fill" cx="100" cy="120" r="46" />
    <circle cx="100" cy="120" r="16" />
    <line x1="100" y1="74" x2="100" y2="166" />
    <line x1="56" y1="120" x2="144" y2="120" />
    <line x1="70" y1="88" x2="130" y2="152" />
    <line x1="130" y1="88" x2="70" y2="152" />
  `,
  X: `
    <rect class="fill" x="50" y="64" width="100" height="16" rx="6" />
    <rect class="fill" x="56" y="88" width="88" height="16" rx="6" />
    <rect class="fill" x="62" y="112" width="76" height="16" rx="6" />
    <rect class="fill" x="68" y="136" width="64" height="16" rx="6" />
    <line x1="50" y1="64" x2="68" y2="136" />
  `,
  Y: `
    <circle class="fill" cx="100" cy="108" r="44" />
    <circle class="fill" cx="100" cy="128" r="20" />
    <circle cx="86" cy="100" r="4" />
    <circle cx="114" cy="100" r="4" />
    <path d="M86 118 Q100 130 114 118" />
  `,
  Z: `
    <path class="fill" d="M60 120 Q84 92 122 98 Q146 102 150 128 Q152 150 132 158 Q108 166 76 152" />
    <line x1="86" y1="104" x2="96" y2="134" />
    <line x1="108" y1="102" x2="118" y2="132" />
    <line x1="130" y1="112" x2="138" y2="140" />
    <circle cx="150" cy="120" r="6" />
  `,
};

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

function svgWrap(content) {
  return `
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      ${content}
    </svg>
  `;
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

  const svg = svgWrap(DRAWINGS[state.current.letter]);
  picture.innerHTML = svg;
  picture.setAttribute("aria-label", state.current.word);

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
