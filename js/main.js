// 오늘의 별자리 운세
// 생년월일 → 별자리를 찾고, (오늘 날짜 + 별자리 + 항목 이름) 해시로
// 항목마다 따로 골라서 하루 동안 같은 운세를 보여준다.

const VS = '︎'; // 별자리 기호를 이모지가 아닌 텍스트로 표시

// [이름, 기호, 시작 월, 시작 일, 끝 월, 끝 일]
const SIGNS = [
  ['염소자리', '♑', 12, 25, 1, 19],
  ['물병자리', '♒', 1, 20, 2, 18],
  ['물고기자리', '♓', 2, 19, 3, 20],
  ['양자리', '♈', 3, 21, 4, 19],
  ['황소자리', '♉', 4, 20, 5, 20],
  ['쌍둥이자리', '♊', 5, 21, 6, 21],
  ['게자리', '♋', 6, 22, 7, 22],
  ['사자자리', '♌', 7, 23, 8, 22],
  ['처녀자리', '♍', 8, 23, 9, 23],
  ['천칭자리', '♎', 9, 24, 10, 22],
  ['전갈자리', '♏', 10, 23, 11, 22],
  ['사수자리', '♐', 11, 23, 12, 24],
].map(([name, symbol, sm, sd, em, ed]) => ({
  name,
  symbol: symbol + VS,
  start: [sm, sd],
  end: [em, ed],
  period: `${sm}월 ${sd}일 ~ ${em}월 ${ed}일`,
}));

// 데이터 --------------------------------------------------------------

const VIBE_KEYWORDS = [
  '설렘',
  '반짝임',
  '여유',
  '도전',
  '행운',
  '힐링',
  '자신감',
  '새 출발',
];

// 운세별 [상황 문장 6개, 조언 문장 6개]
const FORTUNES = {
  vibe: {
    situations: [
      '아침부터 기분 좋은 일이 하나둘 생기는 하루예요.',
      '평소보다 감이 좋아서 고르는 것마다 척척 맞아떨어져요.',
      '주변 사람들이 당신의 밝은 에너지에 덩달아 웃게 돼요.',
      '조금 느긋하게 흘러가지만 그만큼 마음이 편안한 날이에요.',
      '생각지도 못한 곳에서 반가운 소식이 날아올 것 같아요.',
      '작은 용기 하나가 하루 전체를 반짝이게 만들어 줘요.',
    ],
    advices: [
      '오늘은 망설이지 말고 하고 싶은 말을 먼저 꺼내 보세요!',
      '마음에 드는 노래를 들으면서 기분을 한껏 올려 봐요.',
      '작은 일에도 "좋다!" 하고 소리 내 말해 보면 운이 더 좋아져요.',
      '바쁘더라도 따뜻한 차 한 잔으로 쉬어 가는 시간을 꼭 챙겨요.',
      '평소 미뤄 둔 일 하나만 끝내도 뿌듯함이 두 배가 될 거예요.',
      '오늘 하루 수고한 나에게 작은 선물을 해 주세요.',
    ],
  },
  love: {
    situations: [
      '다정한 말 한마디가 상대의 마음을 사르르 녹여요.',
      '눈이 자주 마주치는 사람이 있다면 좋은 신호예요.',
      '오랜만에 연락이 닿은 사람과 이야기꽃이 피어요.',
      '솔직한 마음을 꺼내기에 딱 좋은 분위기가 만들어져요.',
      '사소한 오해가 생길 수 있지만 금방 풀리는 날이에요.',
      '혼자만의 시간이 오히려 마음을 단단하게 채워 줘요.',
    ],
    advices: [
      '먼저 안부를 물어보면 생각보다 반가운 답장이 올 거예요.',
      '고마운 마음은 미루지 말고 바로 표현해 보세요.',
      '상대의 이야기를 끝까지 들어 주면 마음이 더 가까워져요.',
      '오늘은 밝은 표정이 최고의 매력 포인트예요!',
      '서두르지 말고 천천히 다가가는 게 더 좋아요.',
      '나를 아껴 주는 시간이 사랑운도 함께 올려 줘요.',
    ],
  },
  money: {
    situations: [
      '잊고 있던 쿠폰이나 포인트를 발견할 수 있어요.',
      '꼭 필요한 물건을 좋은 가격에 만나게 되는 날이에요.',
      '충동구매의 유혹이 살짝 찾아올 수 있어요.',
      '작은 지출이 모여 생각보다 커질 수 있으니 살펴봐요.',
      '누군가에게 맛있는 걸 얻어먹는 행운이 있을지도 몰라요.',
      '계획대로 쓰면 오히려 여유가 남는 알뜰한 하루예요.',
    ],
    advices: [
      '장바구니에 담은 물건은 하루만 더 고민해 보세요.',
      '오늘 쓴 돈을 간단히 적어 두면 금전운이 쑥쑥 올라가요.',
      '지갑 속 영수증을 정리하면 돈이 들어올 자리가 생겨요.',
      '작은 금액이라도 저금통에 넣어 보면 기분까지 든든해져요.',
      '나눠 먹는 간식 하나가 더 큰 행운으로 돌아올 거예요.',
      '꼭 필요한 것과 갖고 싶은 것을 나눠서 생각해 봐요.',
    ],
  },
  study: {
    situations: [
      '집중력이 반짝 살아나서 어려운 내용도 쏙쏙 들어와요.',
      '평소 헷갈리던 부분이 갑자기 이해되는 순간이 와요.',
      '조금 산만해지기 쉬운 날이지만 짧게 끊어 가면 괜찮아요.',
      '함께 공부하는 친구에게서 좋은 아이디어를 얻을 수 있어요.',
      '복습한 내용이 오래오래 기억에 남는 날이에요.',
      '새로운 걸 시작하기에 딱 좋은 기운이 흘러요.',
    ],
    advices: [
      '25분 집중하고 5분 쉬는 방식으로 리듬을 만들어 보세요.',
      '오늘 배운 걸 세 줄로 정리해 두면 큰 도움이 돼요.',
      '책상 위를 깔끔하게 치우고 시작하면 집중력이 두 배예요.',
      '모르는 건 부끄러워하지 말고 바로 물어보세요!',
      '휴대폰은 잠깐 멀리 두고 공부 시간을 지켜 봐요.',
      '작은 목표 하나를 끝낼 때마다 스스로 칭찬해 주세요.',
    ],
  },
};

// 0~39 / 40~69 / 70~100
const ENERGY_COMMENTS = [
  '오늘은 충전이 필요한 날! 무리하지 말고 푹 쉬어 주세요 ☾',
  '딱 알맞은 컨디션이에요. 내 속도대로 차근차근 가 봐요 ☆',
  '에너지가 넘치는 날! 하고 싶던 일에 마음껏 도전해 보세요 ✦',
];

const LUCKY_COLORS = [
  { name: '라벤더', hex: '#C8B6E2' },
  { name: '벚꽃 핑크', hex: '#F6D6E0' },
  { name: '레몬 옐로', hex: '#FFE9A8' },
  { name: '민트', hex: '#BFE6D6' },
  { name: '하늘색', hex: '#BBD8F2' },
  { name: '복숭아색', hex: '#FFD3B8' },
  { name: '연보라', hex: '#8E7CC3' },
  { name: '크림 화이트', hex: '#FFF3D6' },
];

const LUCKY_ITEMS = [
  '손거울',
  '머리끈',
  '손수건',
  '립밤',
  '이어폰',
  '작은 노트',
  '달달한 사탕',
  '책갈피',
];

// "○○해 보세요" 앞에 들어갈 행동
const ACTIONS = [
  '가벼운 스트레칭',
  '10분 산책',
  '친구에게 먼저 안부 연락',
  '책상 위 정리 정돈',
  '좋아하는 노래로 기분 전환',
  '오늘 할 일 세 줄 메모',
  '고마운 사람에게 감사 인사',
  '평소보다 30분 일찍 잠자리 준비',
];

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// DOM ----------------------------------------------------------------

const form = document.querySelector('.input-card');
const yearSelect = document.querySelector('#birth-y');
const monthSelect = document.querySelector('#birth-m');
const daySelect = document.querySelector('#birth-d');
const hint = document.querySelector('.birth__hint');
const hintSymbol = document.querySelector('.birth__hint-symbol');
const hintText = document.querySelector('.birth__hint-text');
const resultCard = document.querySelector('.result');

const today = new Date();

// 유틸 ----------------------------------------------------------------

const pad = (n) => String(n).padStart(2, '0');

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

// 맨 앞에 빈 "선택" 칸을 두고, selected 가 없으면 빈 칸이 선택된 상태로 둔다.
// from > to 이면 큰 수부터 내림차순으로 만든다. (년도: 올해 → 과거)
function createOptions(select, from, to, format, selected = null) {
  const placeholder = new Option('선택', '');
  placeholder.disabled = true;
  placeholder.selected = selected === null;

  const options = [placeholder];
  const step = from <= to ? 1 : -1;
  for (let i = from; i !== to + step; i += step) {
    const option = new Option(format(i), i);
    option.selected = i === selected;
    options.push(option);
  }
  select.replaceChildren(...options);
}

// 문자열 → 32비트 정수 해시 (FNV-1a + 섞기)
function hash(text) {
  let h = 2166136261;
  for (const char of text) {
    h ^= char.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return h >>> 0;
}

// 항목 이름(key)을 섞어서 항목마다 다른 숫자를 만든다.
// 같은 날·같은 별자리·같은 key → 항상 같은 숫자
function makePicker(seedBase) {
  const number = (key, max) => hash(`${seedBase}|${key}`) % max;
  return {
    number,
    pick: (key, list) => list[number(key, list.length)],
    stars: (key) => number(key, 5) + 1, // 1 ~ 5
  };
}

// 받침 유무에 따라 조사 고르기: josa('라벤더', '을', '를') → '라벤더를'
function josa(word, withFinal, withoutFinal) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const hasFinal = code >= 0 && code <= 11171 && code % 28 !== 0;
  return word + (hasFinal ? withFinal : withoutFinal);
}

function findSign(month, day) {
  const value = month * 100 + day;
  return SIGNS.find(({ start, end }) => {
    const from = start[0] * 100 + start[1];
    const to = end[0] * 100 + end[1];
    // 염소자리처럼 해를 넘기는 경우
    return from <= to
      ? value >= from && value <= to
      : value >= from || value <= to;
  });
}

function renderStars(el, count) {
  el.innerHTML =
    `<span class="stars__on">${'★'.repeat(count)}</span>` +
    `<span class="stars__off">${'★'.repeat(5 - count)}</span>`;
  el.setAttribute('aria-label', `5점 만점에 ${count}점`);
}

// 렌더링 --------------------------------------------------------------

function renderToday() {
  const time = document.querySelector('.today');
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  time.dateTime = `${y}-${pad(m)}-${pad(d)}`;
  time.textContent = `${y}년 ${m}월 ${d}일 ${WEEKDAYS[today.getDay()]}요일`;
}

function updateDayOptions() {
  // 아직 안 고른 값은 가장 넉넉하게: 년도 없으면 윤년(2월 29일), 월 없으면 31일
  const year = Number(yearSelect.value) || 2000;
  const month = Number(monthSelect.value) || 1;
  const max = daysInMonth(year, month);
  const day = Number(daySelect.value);
  createOptions(daySelect, 1, max, (i) => `${pad(i)}일`, day ? Math.min(day, max) : null);
}

const isComplete = () =>
  Boolean(yearSelect.value && monthSelect.value && daySelect.value);

// 월·일을 다 골라야 별자리를 알 수 있음
function getSelectedSign() {
  if (!monthSelect.value || !daySelect.value) return null;
  return findSign(Number(monthSelect.value), Number(daySelect.value));
}

function updateHint() {
  const sign = getSelectedSign();
  hint.classList.remove('birth__hint--error');
  hintSymbol.textContent = sign ? sign.symbol : '☆';
  hintText.textContent = sign
    ? `${sign.name} · ${sign.period}`
    : '생년월일을 고르면 별자리를 알려 드려요';
}

function showIncompleteMessage() {
  hint.classList.add('birth__hint--error');
  hintSymbol.textContent = '!';
  hintText.textContent = '년·월·일을 모두 골라 주세요';
  // 비어 있는 첫 칸으로 이동
  [yearSelect, monthSelect, daySelect].find((el) => !el.value).focus();
}

// 1~4. 바이브·애정·금전·학업 카드
function renderFortuneCards(picker) {
  resultCard.querySelectorAll('.fortune-card[data-key]').forEach((card) => {
    const key = card.dataset.key;
    const { situations, advices } = FORTUNES[key];
    const text = card.querySelector('.fortune-card__text');
    const situation = picker.pick(`${key}-situation`, situations);
    const advice = picker.pick(`${key}-advice`, advices);

    renderStars(card.querySelector('.stars'), picker.stars(`${key}-stars`));

    if (key === 'vibe') {
      const keyword = picker.pick('vibe-keyword', VIBE_KEYWORDS);
      // '설렘'이에요 / '여유'예요
      const ending = josa(keyword, '이에요', '예요').slice(keyword.length);
      text.innerHTML =
        `오늘의 키워드는 <strong class="keyword">'${keyword}'</strong>${ending}. ` +
        `${situation} ${advice}`;
    } else {
      text.textContent = `${situation} ${advice}`;
    }
  });
}

// 5. 에너지 지수
function renderEnergy(picker) {
  const energy = picker.number('energy', 101); // 0 ~ 100
  const level = energy < 40 ? 0 : energy < 70 ? 1 : 2;
  const gauge = resultCard.querySelector('.energy__gauge');
  const fill = resultCard.querySelector('.energy__fill');

  resultCard.querySelector('.energy__value').textContent = `${energy}%`;
  resultCard.querySelector('.energy__comment').textContent =
    ENERGY_COMMENTS[level];
  gauge.setAttribute('aria-valuenow', energy);

  // 게이지가 0 에서 차오르도록 한 프레임 뒤에 너비 지정
  fill.style.setProperty('--energy', '0%');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => fill.style.setProperty('--energy', `${energy}%`));
  });
}

// 6. 오늘의 솔루션
function renderSolution(picker) {
  const color = picker.pick('lucky-color', LUCKY_COLORS);
  const item = picker.pick('lucky-item', LUCKY_ITEMS);
  const action = picker.pick('action', ACTIONS);

  // 7. 오늘의 색 / 행운의 물건 (솔루션 문장과 같은 값)
  resultCard.querySelector('.lucky-color').textContent = color.name;
  resultCard
    .querySelector('.lucky-card__swatch')
    .style.setProperty('--swatch', color.hex);
  resultCard.querySelector('.lucky-item').textContent = item;

  resultCard.querySelector('.solution__text').textContent =
    `행운의 색 ${josa(color.name, '을', '를')} 지니고 ` +
    `${josa(item, '을', '를')} 챙겨, ${action}해 보세요.`;
}

function renderResult(sign) {
  const dateKey = `${today.getFullYear()}${pad(today.getMonth() + 1)}${pad(today.getDate())}`;
  const picker = makePicker(`${dateKey}-${sign.name}`);

  resultCard.querySelector('.sign__symbol').textContent = sign.symbol;
  resultCard.querySelector('.sign__name').textContent = sign.name;
  resultCard.querySelector('.sign__period').textContent = sign.period;

  renderFortuneCards(picker);
  renderEnergy(picker);
  renderSolution(picker);
}

function showResult() {
  renderResult(getSelectedSign());

  // 다시 눌러도 등장 효과가 재생되도록 초기화 후 .show
  resultCard.hidden = false;
  resultCard.classList.remove('show');
  void resultCard.offsetWidth; // 강제 리플로우

  resultCard.classList.add('show');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 초기화 --------------------------------------------------------------

function init() {
  renderToday();

  // 처음엔 모두 빈 칸("선택")
  createOptions(yearSelect, today.getFullYear(), 1940, (i) => `${i}년`);
  createOptions(monthSelect, 1, 12, (i) => `${pad(i)}월`);
  createOptions(daySelect, 1, 31, (i) => `${pad(i)}일`);
  updateHint();

  yearSelect.addEventListener('change', () => {
    updateDayOptions();
    updateHint();
  });
  monthSelect.addEventListener('change', () => {
    updateDayOptions();
    updateHint();
  });
  daySelect.addEventListener('change', updateHint);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isComplete()) {
      showIncompleteMessage();
      return;
    }
    showResult();
  });
}

init();
