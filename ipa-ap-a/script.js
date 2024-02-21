const iframe = document.querySelector('#ifcontainer');
const selectNum = document.querySelector('#selectNum');
const selectQ = document.querySelector('#selectQ');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const reset = document.querySelector('#reset');

const nums = [10, 20, 30, 40, 50, 60, 70, 80];
const seasons = [
  '25_haru',
  '26_haru',
  '27_haru',
  '28_haru',
  '29_haru',
  '30_haru',
  '31_haru',
  '03_haru',
  '04_haru',
  '25_aki',
  '26_aki',
  '27_aki',
  '28_aki',
  '29_aki',
  '30_aki',
  '01_aki',
  '02_aki',
  '03_aki',
  '04_aki',
];

nums.forEach((n) => {
  const option = document.createElement('option');
  option.value = n;
  option.innerText = n;
  selectNum.append(option);
});

const params = new URL(window.location.href).searchParams;
if (params.get('selectNum') && nums.includes(params.get('selectNum'))) {
  selectNum.value = params.get('selectNum');
}
if (
  params.get('selectQ') &&
  params.get('selectQ') >= 1 &&
  params.get('selectQ') <= qs[selectNum.value].length
) {
  selectQ.value = params.get('selectQ');
}
applyIFrame(computeUrl());

selectNum.addEventListener('change', (e) => {
  selectQ.value = 1;
  applyIFrame(computeUrl());
});
selectQ.addEventListener('change', (e) => {
  applyIFrame(computeUrl());
});
prev.addEventListener('click', (e) => {
  if (selectQ.value <= 1) return;
  selectQ.value = Number(selectQ.value) - 1;
  applyIFrame(computeUrl());
});
next.addEventListener('click', (e) => {
  if (Number(selectQ.value) >= Number(selectNum.value)) return;
  selectQ.value = Number(selectQ.value) + 1;
  applyIFrame(computeUrl());
});
reset.addEventListener('click', (e) => {
  selectQ.value = 1;
  applyIFrame(computeUrl());
});

function computeUrl() {
  const season = seasons[Math.floor(Math.random() * seasons.length)];
  const rate = nums[nums.length - 1] / selectNum.value;
  const min = Math.floor((selectQ.value - 1) * rate + 1);
  const max = Math.floor(selectQ.value * rate);
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  const url = `https://www.ap-siken.com/kakomon/${season}/q${num}.html`;
  return url;
}

function applyIFrame(url) {
  if (window.matchMedia('(width < 768px)').matches) {
    url = url.replace('/kakomon/', '/s/kakomon/');
  }
  if (iframe.src == url) return;
  iframe.src = url;
}
