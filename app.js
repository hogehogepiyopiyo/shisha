// 外部ファイルからフレーバーを取得
let flavors = [];

// flavors.json のデータを読み込む
fetch('flavors.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    flavors = data;
  })
  .catch(error => {
    console.error('フレーバーの読み込みエラー:', error);
    alert('フレーバーデータの読み込みに失敗しました。');
  });

// フォームと結果表示エリアの取得
const flavorForm = document.getElementById('flavorForm');
const flavorCountSelect = document.getElementById('flavorCount');
const resultDiv = document.getElementById('result');
const flavorList = document.getElementById('flavorList');
const retryButton = document.getElementById('retryButton');

// フレーバーミックスをランダム生成
function generateRandomFlavors(count) {
  const shuffled = flavors.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 結果を表示
function displayResult(randomFlavors) {
  flavorList.innerHTML = ''; // リストを初期化
  randomFlavors.forEach(flavor => {
    const listItem = document.createElement('li');
    listItem.textContent = flavor;
    flavorList.appendChild(listItem);
  });

  resultDiv.classList.remove('hidden'); // 結果エリアを表示
}

// フォーム送信時の処理
flavorForm.addEventListener('submit', (event) => {
  event.preventDefault(); // ページリロードを防止
  const flavorCount = parseInt(flavorCountSelect.value, 10);

  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    displayResult(randomFlavors);
  } else {
    alert('フレーバーの数を選択してください。');
  }
});

// 再抽選ボタンの処理
retryButton.addEventListener('click', () => {
  const flavorCount = parseInt(flavorCountSelect.value, 10);

  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    displayResult(randomFlavors);
  }
});
