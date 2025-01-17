// 外部ファイルからフレーバーを取得
let flavors = [];


fetch('flavors.json')
  .then(response => response.json())
  .then(data => {
    flavors = data;
  })
  .catch(error => {
    console.error('フレーバーの読み込みエラー:', error);
  });


// フォームと結果表示エリア
const flavorForm = document.getElementById('flavorForm');
const flavorCountSelect = document.getElementById('flavorCount');
const resultDiv = document.getElementById('result');
const flavorList = document.getElementById('flavorList');
const retryButton = document.getElementById('retryButton');


// フレーバーミックスを生成
function generateRandomFlavors(count) {
  const shuffled = flavors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


// 結果を表示
function displayResult(randomFlavors) {
  flavorList.innerHTML = '';
  randomFlavors.forEach(flavor => {
    const listItem = document.createElement('li');
    listItem.textContent = flavor;
    flavorList.appendChild(listItem);
  });


  resultDiv.classList.remove('hidden');
}


// フォーム送信時の処理
flavorForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const flavorCount = parseInt(flavorCountSelect.value, 10);


  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    displayResult(randomFlavors);
  }
});


// 再抽選ボタンの処理
retryButton.addEventListener('click', () => {
  const flavorCount = parseInt(flavorCountSelect.value, 10);


  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    displayResult(randomFlavors); // 再抽選結果を表示
  }
});