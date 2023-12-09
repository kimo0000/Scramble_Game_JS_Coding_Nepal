const wordEl = document.querySelector(".word");
const hintEl = document.querySelector(".hint");
const inputEl = document.querySelector(".inp input");
const timer = document.querySelector(".timer");
const btns = document.querySelectorAll(".btns button");

let counter = 10;
let interval;
let correctWord;

const initTimer = (maxTime) => {
  clearInterval(interval);
  interval = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timer.innerText = maxTime);
    }

    clearInterval(interval);
    alert(`Your Time Has expired! The correct Word Is "${correctWord}"`);
    updateWord();
  }, 1000);
};

const updateWord = () => {
  initTimer(15);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  const { word, hint } = randomObj;
  console.log(word);

  let wordArray = word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordEl.innerText = wordArray.join("").toUpperCase();
  hintEl.innerText = hint;
  correctWord = word.toLowerCase();
  console.log(correctWord);
  inputEl.value = "";
  inputEl.setAttribute("maxlength", correctWord.length);
};

updateWord();

const CheckWord = () => {
  let value = inputEl.value;
  if (!value) return alert("please Insert A Word, Input Do Not Empty!");
  if (value !== correctWord)
    return alert(`Oops! "${value}" Is Not A Correct word!`);
  alert(`Congrats, "${correctWord}" Is A Valid Word`);
  updateWord();
};

const refreshCheckWord = (btn) =>
  btn.id === "refresh" ? updateWord() : CheckWord();
btns.forEach((btn) =>
  btn.addEventListener("click", () => refreshCheckWord(btn))
);
