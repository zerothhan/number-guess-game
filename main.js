// 랜덤번호 지정
// 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play); // 함수를 매개변수로 넘길 때는 () 괄호를 넣지 않는다. () 넣는 순간 실행이 되기 때문.
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
}); // 익명함수로 사용. 함수 선언하면 메모리 차지 됨.

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // Math.random() : 0 ~ 1 사이 소수점 숫자
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이의 숫자를 입력해 주세요.";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
  }

  chances--;
  chanceArea.textContent = `남은 찬스 : ${chances}회`; // 백틱(backtick) 센텐스 (Backquote, backtick, grave accent 등으로 불린다.)
  console.log(chances);

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!!";
  } else {
    resultArea.textContent = "정답입니다!!!";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver === true) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input 창이 깨끗하게 정리되고
  userInput.value = "";
  // 새로운 번호가 생성되고
  pickRandomNum();

  resultArea.textContent = "결과값이 여기 나옵니다.";
}

pickRandomNum();
