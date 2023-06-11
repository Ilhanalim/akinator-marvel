const question = document.querySelector('.question');
const btnAll = document.querySelectorAll('.btn');
const btnYes = document.querySelector('.btnYes');
const btnNo = document.querySelector('.btnNo');
const number = document.querySelector('.number');
const noQuestion = document.querySelector('.number-count');
const subTitle = document.querySelector('.sub-title');
const buttonParent = document.querySelector('.button-parent');

//card
let card = document.querySelector('.card');
let cardContent = document.querySelector('.card-content');
let cardCloseButton = document.querySelector('.card-close-button');
let cardViewButton = document.querySelector('.card-view-button');

database.forEach((e) => {
  let newSpan = document.createElement('span');
  newSpan.innerText = e.name;
  cardContent.appendChild(newSpan);
});

let currentQuestionData = 0;
let currentProperty = 0;
let noQues = 1;
let ans = true;
let yes = btnYes.getAttribute('data-val');
let no = btnNo.getAttribute('data-val');

loadQuestion();

function loadQuestion() {
  let currentQuestion = questionData[currentQuestionData];
  noQuestion.innerText = noQues;
  question.innerText = currentQuestion;
}

btnYes.addEventListener('click', () => {
  getAnswer(yes, property[currentProperty]);
  currentQuestionData++;
  currentProperty++;
  noQues++;
  if (database.length !== 1 && database.length !== 0) loadQuestion();
});

btnNo.addEventListener('click', () => {
  getAnswer(no, property[currentProperty]);
  currentQuestionData++;
  currentProperty++;
  noQues++;
  if (database.length !== 1 && database.length !== 0) loadQuestion();
});

cardCloseButton.addEventListener('click', () => {
  // card.classList.add('d-none');
  // card.classList.remove('d-block');
  card.classList.remove('active');
});

cardViewButton.addEventListener('click', () => {
  card.classList.add('active');
  // card.classList.add('d-block');
  // card.classList.remove('d-none');
});

function getAnswer(answer, property) {
  if (answer === 'y') {
    ans = true;
  } else {
    ans = false;
  }

  let toRemove = [];
  database.forEach((d) => {
    if (d[property] !== ans) {
      toRemove.push(d);
    }
  });

  toRemove.forEach((e) => {
    const index = database.indexOf(e);
    console.log(e);
    if (index > -1) {
      database.splice(index, 1);
      console.log(database);
    }
  });

  if (database.length === 1) {
    resultName = database[0].name;
    resultImg = database[0].img;
    sessionStorage.setItem('resultName', resultName);
    sessionStorage.setItem('resultImg', resultImg);
    window.location.href = `pages/result.html`;
    // window.location.href = `pages/${database[0].link}`;
  } else if (database.length === 0) {
    question.innerText =
      'Sorry the superhero you are thinking of is not available';
    subTitle.classList.add('d-none');
    number.classList.add('d-none');
    btnAll.forEach((e) => {
      e.classList.add('d-none');
    });

    let tryAgain = document.createElement('a');
    tryAgain.innerText = 'Try Again';
    tryAgain.classList.add('btnLink');
    tryAgain.setAttribute('href', 'index.html');
    buttonParent.appendChild(tryAgain);
  }
}
