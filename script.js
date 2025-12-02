let currentQuestion = 0;
let selectedChoice = null;
let screen = "start";
let lastAnsweredQuestion = null;

// 問題データ（後から編集可能）
const questions = [
  {
    text: "1問目: サンシャイン水族館のプロジェクトは？",
    choices: ["サンゴプロジェクト", "ペンギンプロジェクト", "太刀魚プロジェクト", "クラゲプロジェクト"],
    correct: 0
  },
  {
    text: "2問目: サンシャインラグーンで泳いでいる生き物は全部で何種類？",
    choices: ["6種", "9種", "11種", "15種"],
    correct: 2
  },
  {
    text: "3問目: 存在しない魚は？",
    choices: ["マンジュウイシモチ", "メガネゴンべ", "デバスズメダイ", "キンモンベラモドキ"],
    correct: 3
  },
  {
    text: "4問目: 梅山さんが好きな寿司のネタ",
    choices: ["炙りイワシ", "サラダ軍艦", "カリフォルニアロール", "サバ"],
    correct: 0
  }
];

// 画面切り替え
function showScreen(id) {
  // すべての画面を非表示
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  // bodyのクラスをリセット
  document.body.className = "";

  // 背景切り替え
  switch (id) {
    case "startScreen":
      document.body.classList.add("start-bg");
      break;

    case "questionScreen":
      if (currentQuestion === 0) document.body.classList.add("q1-bg");
      if (currentQuestion === 1) document.body.classList.add("q2-bg");
      if (currentQuestion === 2) document.body.classList.add("q3-bg");
      if (currentQuestion === 3) document.body.classList.add("q4-bg");
      break;

    case "correctScreen":
      document.body.classList.add("correct-bg");
      break;

    case "wrongScreen":
      document.body.classList.add("wrong-bg");
      break;

    case "lotteryScreen":
      document.body.classList.add("lottery-bg");
      break;
  }
}

// ゲーム開始
function startGame() {
  screen = "question";
  renderQuestion();
  showScreen("questionScreen");
}

// 問題表示
function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionTitle").innerText = q.text;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((text, index) => {
    const div = document.createElement("div");
    div.className = "choice";
    div.innerText = `○ ${text}`;
    div.onclick = () => selectChoice(index, div);
    choicesDiv.appendChild(div);
  });

  // 不正解後ならヒントボタンを表示
if (lastAnsweredQuestion === currentQuestion) {
  document.getElementById("hintButton").style.display = "block";
} else {
  document.getElementById("hintButton").style.display = "none";
}
}

// 選択肢クリック
function selectChoice(index, element) {
  selectedChoice = index;
  document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
  element.classList.add("selected");
}

// 回答送信
function submitAnswer() {
  const correct = questions[currentQuestion].correct;

  // 4問目（配列のインデックスは0始まりなので 3）
  const isFourthQuestion = currentQuestion === 3;

  if (isFourthQuestion || selectedChoice === correct) {
    showScreen("correctScreen");
  } else {
    lastAnsweredQuestion = currentQuestion;
    showScreen("wrongScreen");
  }
}


// 次の問題へ
function goNext() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showScreen("lotteryScreen");
  } else {
    selectedChoice = null;
    renderQuestion();
    showScreen("questionScreen");
  }
}

// 再挑戦
function retry() {
  currentQuestion = lastAnsweredQuestion;
  selectedChoice = null;
  renderQuestion();
  showScreen("questionScreen");
}

const hints = [
  "ヒント：サンシャイン水族館の環境保全活動を調べてみよう！",
  "ヒント：展示パネルに種類数が書いてあるよ。",
  "ヒント：1つだけ“モドキ”という名前がついてます。",
  "ヒント：梅山さんは脂がのった魚が好き…？"
];

// Googleフォーム連携（ここを書き換える）
function goToGoogleForm() {
  // ↓ここを自分のフォームURLに変更
  window.location.href = "https://docs.google.com/forms/d/1YhFsUPtlhUerK0Oz60bH4ayxu4rFuCUbaNaw04zv3qI/edit";
}

// 初期表示
showScreen("startScreen");
document.body.classList.add("start-bg");

function openHint() {
  document.getElementById("hintText").innerText = hints[currentQuestion];
  document.getElementById("hintModal").style.display = "block";
}

function closeHint() {
  document.getElementById("hintModal").style.display = "none";
}