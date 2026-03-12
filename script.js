// Five questions, each with exactly 3 choices and a single correct index
const questions = [
  { q: "What tag creates a heading?", choices: ["<h1>", "<p>", "<div>"], answer: 0 },
  { q: "What is 2 + 2?", choices: ["2", "4", "6"], answer: 1 },
  { q: "What color is an arctic ocean?", choices: ["pink", "blue", "red"], answer: 1 },
  { q: "Which element is used for a paragraph in HTML?", choices: ["<p>", "<span>", "<section>"], answer: 0 },
  { q: "Which tag is semantic for main content?", choices: ["<main>", "<div>", "<b>"], answer: 0 }
];

let idx = 0, score = 0;
const qText = document.getElementById('question-text');
const qNumber = document.getElementById('q-number');
const progress = document.getElementById('progress');
const options = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
const quizCard = document.getElementById('quiz-card');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

function render(){
  const q = questions[idx];
  qNumber.textContent = `Question ${idx+1}`;
  progress.textContent = `${idx+1} / ${questions.length}`;
  qText.textContent = `${idx+1}. ${q.q}`; // numbered question title
  options.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const label = document.createElement('label');
    label.className = 'option';
    label.tabIndex = 0;
    label.setAttribute('role','radio');
    label.setAttribute('aria-checked','false');

    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = `${i+1}.`;

    const radioWrap = document.createElement('span');
    radioWrap.className = 'radio';
    const dot = document.createElement('span');
    dot.className = 'dot';
    radioWrap.appendChild(dot);

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.value = i;
    input.style.display = 'none';

    const span = document.createElement('span');
    span.className = 'label-text';
    span.textContent = choice;

    label.appendChild(num);
    label.appendChild(radioWrap);
    label.appendChild(input);
    label.appendChild(span);

    label.addEventListener('click', () => selectOption(label, input));
    label.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption(label, input); }
    });

    options.appendChild(label);
  });

  nextBtn.textContent = idx === questions.length - 1 ? 'Submit' : 'Next';
  const first = options.querySelector('.option');
  if (first) first.focus();
}

function selectOption(label, input){
  [...options.querySelectorAll('.option')].forEach(el => {
    el.classList.remove('selected');
    el.setAttribute('aria-checked','false');
    const inp = el.querySelector('input');
    if (inp) inp.checked = false;
  });
  label.classList.add('selected');
  label.setAttribute('aria-checked','true');
  input.checked = true;
}

nextBtn.addEventListener('click', () => {
  const selectedInput = options.querySelector('input:checked');
  if (!selectedInput) { alert('Please choose an answer.'); return; }
  const chosen = Number(selectedInput.value);
  if (chosen === questions[idx].answer) score++;
  idx++;
  if (idx < questions.length) render();
  else showResults();
});

function showResults(){
  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  // update results screen
  quizCard.classList.add('hidden');
  result.classList.remove('hidden');
  scoreText.textContent = `You got ${score} out of ${total}`;

  // show modal with percentage
  const modal = document.getElementById('percent-modal');
  const modalText = document.getElementById('modal-text');
  modalText.textContent = `You scored ${percent}% (${score} of ${total})`;
  modal.classList.remove('hidden');

  // focus and keyboard handling
  const ok = document.getElementById('modal-ok');
  ok.focus();
  function closeModal(){
    modal.classList.add('hidden');
    ok.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){
    if(e.key === 'Escape' || e.key === 'Enter') closeModal();
  }
  ok.addEventListener('click', closeModal);
  document.addEventListener('keydown', onKey);
}

restartBtn.addEventListener('click', () => {
  idx = 0; score = 0;
  result.classList.add('hidden');
  quizCard.classList.remove('hidden');
  render();
});

render();