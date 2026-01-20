🎰 Lotto Game 2025 (Next.js + Zustand)

로또 당첨 번호 데이터를 기반으로 확률 가중 랜덤 추천 번호를 생성하는 사이드 프로젝트입니다.
Next.js(App Router) + Zustand + LocalStorage(Persist) 기반으로 동작합니다.

🛠️ 기술 스택

Framework: Next.js 

State Management: Zustand

Styling: styled-components

HTTP Client: axios

Deploy: Vercel

📦 주요 기능
1. 로또 회차 데이터 수집 및 저장

GitHub 미러 API 사용:

https://smok95.github.io/lotto/results/{회차}.json


회차별 당첨 번호(6개 + 보너스)를 가져와서:

Zustand store

LocalStorage(persist)
에 저장

버튼 클릭 시:

자동으로 마지막 저장 회차 + 1 회차를 불러옴

또는 원하는 회차를 직접 입력해서 추가 가능

이미 최신 회차를 넘어선 경우:

404 발생 →
👉 "최신 회차까지만 데이터가 있습니다" 알림 표시

2. 최신 회차 자동 추적

Store에 maxSavedDrawNo 를 저장

앱 재접속 / 새로고침해도:

마지막으로 저장한 회차 기억

다음 추가 회차 = maxSavedDrawNo + 1

3. 로컬 스토리지 저장

아래 데이터들이 LocalStorage에 저장됨:

userName

lottoNumbers (누적 회차 데이터)

maxSavedDrawNo

새로고침 / 재방문 시에도 데이터 유지됨

4. 번호 추천 로직 (확률 가중 랜덤)

지금까지 저장된 모든 회차 데이터를 전부 펼쳐서:

const allNumbers = lottoNumbers.flatMap((arr) => arr.slice(0, 6));


예시:

[1,1,1,2,3,4,5,6,7,8,9,9,10]


→ 1은 3번 들어있으므로 뽑힐 확률이 더 높음
→ 9는 2번, 나머지는 1번

이 풀에서 중복 없이 6개 랜덤 추출

즉:

"많이 나온 번호일수록 더 잘 뽑히는 랜덤 추천"

5. 사용자 이름 저장

사용자 이름 입력 시:

Zustand + LocalStorage에 저장

새로고침해도 유지됨

🧠 전체 동작 흐름

"회차 추가" 버튼 클릭

API에서 해당 회차 데이터 로드

Store + LocalStorage에 저장

마지막 회차 번호 갱신

"번호 뽑기" 클릭

지금까지 저장된 모든 회차 데이터 기반으로 확률 가중 랜덤 추천 번호 생성

🚀 배포

Vercel 사용

Node.js 24.x 환경

Next.js 15.x

📌 추후 개선 예정

1. 전체 회차 한번에 자동 수집

2. 번호 출현 통계 시각화

3. 특정 번호 제외 / 포함 옵션

4. 랜덤 알고리즘 돌려서 새로운 모드로도 나오게 
