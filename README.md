<section style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Pretendard, Arial, sans-serif; line-height: 1.6;">
  <h1 style="font-size: 32px; margin: 0 0 10px; font-weight: 800;">🎰 Lotto Game 2025 <span style="font-weight: 600; font-size: 18px; color: #555;">(Next.js + Zustand)</span></h1>

  <p style="margin: 0 0 18px; font-size: 16px; color: #222;">
    로또 당첨 번호 데이터를 기반으로 <b>확률 가중 랜덤 추천 번호</b>를 생성하는 사이드 프로젝트입니다.<br />
    <b>Next.js(App Router)</b> + <b>Zustand</b> + <b>LocalStorage(Persist)</b> 기반으로 동작합니다.
  </p>

  <hr style="border: 0; border-top: 1px solid #ddd; margin: 18px 0;" />

  <h2 style="font-size: 22px; margin: 0 0 10px; font-weight: 800;">🛠️ 기술 스택</h2>
  <ul style="margin: 0 0 18px 18px; padding: 0; font-size: 16px;">
    <li><b>Framework</b>: Next.js</li>
    <li><b>State Management</b>: Zustand</li>
    <li><b>Styling</b>: styled-components</li>
    <li><b>HTTP Client</b>: axios</li>
    <li><b>Deploy</b>: Vercel</li>
  </ul>

  <h2 style="font-size: 22px; margin: 0 0 10px; font-weight: 800;">📦 주요 기능</h2>

  <h3 style="font-size: 18px; margin: 14px 0 6px; font-weight: 800;">1) 로또 회차 데이터 수집 및 저장</h3>
  <ul style="margin: 0 0 14px 18px; padding: 0; font-size: 16px;">
    <li>회차별 당첨 번호(6개 + 보너스)를 가져와서 <b>Zustand store</b> + <b>LocalStorage(persist)</b>에 저장</li>
    <li>버튼 클릭 시:
      <ul style="margin: 6px 0 0 18px; padding: 0;">
        <li>자동으로 <b>마지막 저장 회차 + 1</b> 회차를 불러옴</li>
        <li>또는 <b>원하는 회차</b>를 직접 입력해서 추가 가능</li>
      </ul>
    </li>
    <li>
      이미 최신 회차를 넘어선 경우:
      <div style="margin-top: 6px; padding: 10px 12px; border-left: 4px solid #256EF4; background: #F3F7FF; border-radius: 8px;">
        404 발생 → <b>"최신 회차까지만 데이터가 있습니다"</b> 알림 표시
      </div>
    </li>
  </ul>

  <h3 style="font-size: 18px; margin: 14px 0 6px; font-weight: 800;">2) 최신 회차 자동 추적</h3>
  <ul style="margin: 0 0 14px 18px; padding: 0; font-size: 16px;">
    <li>Store에 <b>maxSavedDrawNo</b> 저장</li>
    <li>앱 재접속 / 새로고침해도:
      <ul style="margin: 6px 0 0 18px; padding: 0;">
        <li>마지막으로 저장한 회차 기억</li>
        <li>다음 추가 회차 = <b>maxSavedDrawNo + 1</b></li>
      </ul>
    </li>
  </ul>

  <h3 style="font-size: 18px; margin: 14px 0 6px; font-weight: 800;">3) 로컬 스토리지 저장</h3>
  <p style="margin: 0 0 8px; font-size: 16px;">아래 데이터들이 LocalStorage에 저장됩니다:</p>
  <ul style="margin: 0 0 14px 18px; padding: 0; font-size: 16px;">
    <li><b>userName</b></li>
    <li><b>lottoNumbers</b> (누적 회차 데이터)</li>
    <li><b>maxSavedDrawNo</b></li>
  </ul>
  <p style="margin: 0 0 14px; font-size: 16px;">새로고침 / 재방문 시에도 데이터가 유지됩니다.</p>

  <h3 style="font-size: 18px; margin: 14px 0 6px; font-weight: 800;">4) 번호 추천 로직 (확률 가중 랜덤)</h3>
  <p style="margin: 0 0 10px; font-size: 16px;">
    지금까지 저장된 모든 회차 데이터를 전부 펼쳐서 사용합니다(보너스 제외):
  </p>
  <pre style="margin: 0 0 12px; background: #0b1020; color: #e6edf3; padding: 12px 14px; border-radius: 10px; overflow: auto; font-size: 14px;"><code>const allNumbers = lottoNumbers.flatMap((arr) =&gt; arr.slice(0, 6));</code></pre>

  <p style="margin: 0 0 8px; font-size: 16px;"><b>예시</b></p>
  <pre style="margin: 0 0 12px; background: #f6f8fa; border: 1px solid #e5e7eb; padding: 10px 12px; border-radius: 10px; overflow: auto; font-size: 14px;"><code>[1,1,1,2,3,4,5,6,7,8,9,9,10]</code></pre>

  <ul style="margin: 0 0 14px 18px; padding: 0; font-size: 16px;">
    <li>1은 3번 들어있으므로 <b>뽑힐 확률이 더 높음</b></li>
    <li>9는 2번, 나머지는 1번</li>
    <li>이 풀에서 <b>중복 없이</b> 6개 랜덤 추출</li>
  </ul>

  <div style="padding: 10px 12px; border-left: 4px solid #063A74; background: #F0F6FF; border-radius: 8px; margin: 0 0 14px;">
    <b>"많이 나온 번호일수록 더 잘 뽑히는 랜덤 추천"</b>
  </div>

  <h3 style="font-size: 18px; margin: 14px 0 6px; font-weight: 800;">5) 사용자 이름 저장</h3>
  <ul style="margin: 0 0 18px 18px; padding: 0; font-size: 16px;">
    <li>사용자 이름 입력 시 <b>Zustand + LocalStorage</b>에 저장</li>
    <li>새로고침해도 유지</li>
  </ul>

  <hr style="border: 0; border-top: 1px solid #ddd; margin: 18px 0;" />

  <h2 style="font-size: 22px; margin: 0 0 10px; font-weight: 800;">🧠 전체 동작 흐름</h2>
  <ol style="margin: 0 0 18px 18px; padding: 0; font-size: 16px;">
    <li>"회차 추가" 버튼 클릭</li>
    <li>API에서 해당 회차 데이터 로드</li>
    <li>Store + LocalStorage에 저장</li>
    <li>마지막 회차 번호 갱신</li>
    <li>"번호 뽑기" 클릭</li>
    <li>저장된 모든 회차 데이터 기반으로 확률 가중 랜덤 추천 번호 생성</li>
  </ol>

  <h2 style="font-size: 22px; margin: 0 0 10px; font-weight: 800;">🚀 배포</h2>
  <ul style="margin: 0 0 18px 18px; padding: 0; font-size: 16px;">
    <li><b>Vercel</b> 사용</li>
    <li><b>Node.js 24.x</b> 환경</li>
    <li><b>Next.js 15.x</b></li>
  </ul>

  <h2 style="font-size: 22px; margin: 0 0 10px; font-weight: 800;">📌 추후 개선 예정</h2>
  <ol style="margin: 0 0 6px 18px; padding: 0; font-size: 16px;">
    <li>전체 회차 한번에 자동 수집</li>
    <li>번호 출현 통계 시각화</li>
    <li>특정 번호 제외 / 포함 옵션</li>
    <li>랜덤 알고리즘 돌려서 새로운 모드로도 나오게</li>
  </ol>
</section>
