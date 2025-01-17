// 外部ファイルからフレーバーを取得
let flavors = [];

// flavors.json のデータを読み込む
fetch('flavors.json')
  .then(response => {
    console.log('レスポンスステータス:', response.status); // ステータスコードを表示
    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    flavors = data;
    console.log('フレーバーデータ:', flavors); // デバッグ用
  })
  .catch(error => {
    console.error('フレーバーデータ読み込みエラー:', error);
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

  // Xに投稿するボタンを更新
  const tweetButton = document.getElementById('tweetButton');
  const tweetText = `シーシャミックスおみくじリザルト: ${randomFlavors.join(', ')} `;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  tweetButton.href = tweetUrl;
  tweetButton.classList.remove('hidden'); // ボタンを表示

  // 結果エリアを表示
  resultDiv.classList.remove('hidden');
}

// フォーム送信時の処理
flavorForm.addEventListener('submit', (event) => {
  event.preventDefault(); // ページリロードを防止
  console.log('フォームが送信されました'); // デバッグ用

  const flavorCount = parseInt(flavorCountSelect.value, 10);
  console.log('選択されたフレーバー数:', flavorCount); // デバッグ用

  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    displayResult(randomFlavors);
  } else {
    alert('フレーバーの数を選択してください。');
  }
});

// 再抽選ボタンの処理
retryButton.addEventListener('click', () => {
  console.log('再抽選ボタンが押されました'); // デバッグ用

  const flavorCount = parseInt(flavorCountSelect.value, 10);
  console.log('選択されたフレーバー数:', flavorCount); // デバッグ用

  if (flavorCount && flavors.length > 0) {
    const randomFlavors = generateRandomFlavors(flavorCount);
    console.log('再抽選結果:', randomFlavors); // デバッグ用
    displayResult(randomFlavors);
  }
});

