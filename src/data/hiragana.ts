export interface HiraganaChar {
  char: string;
  romaji: string;
  sound: string; // Korean pronunciation
  story: string; // Mnemonic story
  strokeOrder: string; // Description
  row: string;
}

export interface Chapter {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  characters: HiraganaChar[];
  order: number;
}

// あ행
const aRow: HiraganaChar[] = [
  {
    char: 'あ',
    romaji: 'a',
    sound: '아',
    story: '"아!" 하고 놀란 표정 — 글자 모양이 놀라서 입을 벌린 얼굴 같아요',
    strokeOrder: '3획: 가로 → 세로+꺾기 → 동그라미',
    row: 'あ행',
  },
  {
    char: 'い',
    romaji: 'i',
    sound: '이',
    story: '두 사람이 나란히 서 있는 모양 — "이" 사람과 "이" 사람, 둘이서!',
    strokeOrder: '2획: 왼쪽 삐침 → 오른쪽 삐침',
    row: 'あ행',
  },
  {
    char: 'う',
    romaji: 'u',
    sound: '우',
    story: '"우~" 하고 입을 내미는 모양 — 위에 점이 코, 아래가 내민 입술',
    strokeOrder: '2획: 점 → 곡선',
    row: 'あ행',
  },
  {
    char: 'え',
    romaji: 'e',
    sound: '에',
    story: '에? 하고 고개를 갸우뚱한 사람 모양이에요',
    strokeOrder: '2획: 짧은 가로 → 긴 세로+꺾기',
    row: 'あ행',
  },
  {
    char: 'お',
    romaji: 'o',
    sound: '오',
    story: '"오!" 놀라서 모자가 날아간 사람 — 위에 점이 날아간 모자',
    strokeOrder: '3획: 가로 → 세로+꺾기 → 점',
    row: 'あ행',
  },
];

// か행
const kaRow: HiraganaChar[] = [
  {
    char: 'か',
    romaji: 'ka',
    sound: '카',
    story: '카! 하고 칼을 휘두르는 모양 — 왼쪽이 칼날, 오른쪽이 손잡이',
    strokeOrder: '3획: 가로 → 세로+꺾기 → 삐침',
    row: 'か행',
  },
  {
    char: 'き',
    romaji: 'ki',
    sound: '키',
    story: '열쇠(키) 모양이에요 — 위에 두 줄이 열쇠 손잡이, 아래가 열쇠 이빨',
    strokeOrder: '4획: 가로 → 가로 → 세로 → 곡선',
    row: 'か행',
  },
  {
    char: 'く',
    romaji: 'ku',
    sound: '쿠',
    story: '새의 부리 모양 — 쿠쿠! 하고 우는 뻐꾸기 부리',
    strokeOrder: '1획: 꺾인 선',
    row: 'か행',
  },
  {
    char: 'け',
    romaji: 'ke',
    sound: '케',
    story: '케이크를 자르는 칼 — 세로가 칼, 오른쪽이 잘린 케이크 조각',
    strokeOrder: '3획: 세로 → 가로 → 삐침',
    row: 'か행',
  },
  {
    char: 'こ',
    romaji: 'ko',
    sound: '코',
    story: '두 개의 가로줄이 코를 옆에서 본 모양이에요',
    strokeOrder: '2획: 위 가로 → 아래 곡선',
    row: 'か행',
  },
];

// さ행
const saRow: HiraganaChar[] = [
  {
    char: 'さ',
    romaji: 'sa',
    sound: '사',
    story: '사탕을 든 손 모양 — 가로줄이 막대, 아래가 사탕',
    strokeOrder: '3획: 가로 → 세로 → 곡선',
    row: 'さ행',
  },
  {
    char: 'し',
    romaji: 'shi',
    sound: '시',
    story: '낚싯줄 모양 — "시~" 하고 물고기를 기다리는 낚싯줄',
    strokeOrder: '1획: 올려 긋는 곡선',
    row: 'さ행',
  },
  {
    char: 'す',
    romaji: 'su',
    sound: '스',
    story: '스파게티를 포크로 돌린 모양 — 아래 동그라미가 돌돌 감긴 면',
    strokeOrder: '2획: 가로+세로 → 동그라미',
    row: 'さ행',
  },
  {
    char: 'せ',
    romaji: 'se',
    sound: '세',
    story: '세면대 모양 — 세수하는 세면대를 위에서 본 것',
    strokeOrder: '3획: 가로 → 세로 → 가로+꺾기',
    row: 'さ행',
  },
  {
    char: 'そ',
    romaji: 'so',
    sound: '소',
    story: '소가 꼬리를 흔드는 모양 — 위에서 아래로 쓱 내려와서 꼬리처럼 휘어져요',
    strokeOrder: '1획: 구불구불 한 선',
    row: 'さ행',
  },
];

// た행
const taRow: HiraganaChar[] = [
  {
    char: 'た',
    romaji: 'ta',
    sound: '타',
    story: '타! 하고 발로 차는 모양 — 왼쪽 십자가 몸통, 오른쪽이 뻗은 다리',
    strokeOrder: '4획: 가로 → 세로+꺾기 → 점 → 삐침',
    row: 'た행',
  },
  {
    char: 'ち',
    romaji: 'chi',
    sound: '치',
    story: '치즈 한 조각을 옆에서 본 모양 — 숫자 5를 거꾸로 한 것 같아요',
    strokeOrder: '2획: 가로 → 곡선',
    row: 'た행',
  },
  {
    char: 'つ',
    romaji: 'tsu',
    sound: '츠',
    story: '쯔나미(tsunami)의 파도 모양 — 물결이 쓸려오는 곡선',
    strokeOrder: '1획: 곡선',
    row: 'た행',
  },
  {
    char: 'て',
    romaji: 'te',
    sound: '테',
    story: '테이블 모양 — 가로줄이 테이블 상판, 아래가 다리',
    strokeOrder: '1획: 가로+꺾기',
    row: 'た행',
  },
  {
    char: 'と',
    romaji: 'to',
    sound: '토',
    story: '토끼 귀 한쪽 — 세로줄에서 쏙 나온 귀 모양',
    strokeOrder: '2획: 세로+꺾기 → 점',
    row: 'た행',
  },
];

export const chapters: Chapter[] = [
  {
    id: 'a-row',
    title: 'あ행 — 첫 만남',
    titleJa: 'あいうえお',
    description: '일본어의 시작! 5개의 모음을 배워봐요',
    characters: aRow,
    order: 1,
  },
  {
    id: 'ka-row',
    title: 'か행 — 두 번째 발걸음',
    titleJa: 'かきくけこ',
    description: 'か행 5글자와 친해져봐요',
    characters: kaRow,
    order: 2,
  },
  {
    id: 'sa-row',
    title: 'さ행 — 점점 익숙해져요',
    titleJa: 'さしすせそ',
    description: 'さ행까지 오다니, 대단해!',
    characters: saRow,
    order: 3,
  },
  {
    id: 'ta-row',
    title: 'た행 — 벌써 네 번째!',
    titleJa: 'たちつてと',
    description: 'た행도 금방 외울 수 있어요',
    characters: taRow,
    order: 4,
  },
];

export const allHiragana = [...aRow, ...kaRow, ...saRow, ...taRow];
