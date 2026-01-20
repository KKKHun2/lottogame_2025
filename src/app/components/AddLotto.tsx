'use client';

import axios from 'axios';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLottoStore } from '@/store/lottoStore';

const Row = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
  flex-direction: column;
`;

const Input = styled.input`
	width: 180px;
	padding: 12px 14px;
	border-radius: 10px;
	border: 1px solid #757575;
	font-size: 16px;
	outline: none;

	&:focus {
		border-color: #256ef4;
	}
`;

const Button = styled.button`
	background-color: #f5f6fa;
	border: none;
	padding: 15px 30px;
	border-radius: 10px;
	font-size: 20px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

	&:hover,
	&:active {
		background-color: #a2a2a2;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

type LottoMirrorResponse = {
	draw_no: number;
	numbers: number[];
	bonus_no: number;
	date?: string;
};

async function fetchLotto(drawNo: number): Promise<{ drawNo: number; nums7: number[] }> {
	const url = `https://smok95.github.io/lotto/results/${drawNo}.json`;
	const res = await axios.get<LottoMirrorResponse>(url, { timeout: 8000 });

	const nums = res.data?.numbers ?? [];
	const bonus = res.data?.bonus_no;

	if (!Array.isArray(nums) || nums.length !== 6 || typeof bonus !== 'number') {
		throw new Error('Invalid lotto payload');
	}

	return { drawNo: res.data.draw_no, nums7: [...nums, bonus] };
}

export default function LottoDataUpdater() {
	const addLottoNumbers = useLottoStore((s) => s.addLottoNumbers);
	const getNextDrawNo = useLottoStore((s) => s.getNextDrawNo);

	const [startDrawNo, setStartDrawNo] = useState<number>(() => getNextDrawNo());

	// 사용자가 원하는 회차 입력(비워두면 startDrawNo 사용)
	const [manualDrawNo, setManualDrawNo] = useState<string>('');

	const parsedManual = useMemo(() => {
		const v = manualDrawNo.trim();
		if (!v) return null;
		if (!/^\d+$/.test(v)) return null;
		return Number(v);
	}, [manualDrawNo]);

	const targetDrawNo = parsedManual ?? startDrawNo;

	const handleAddLotto = async () => {
		try {
			const { drawNo, nums7 } = await fetchLotto(targetDrawNo);

			addLottoNumbers(drawNo, nums7);

			window.alert(`${drawNo}회차 번호 ${nums7} 추가 완료`);

			// 입력으로 넣은 경우: 입력값은 유지할지/비울지 선택
			// 여기서는 성공하면 입력값 비우고, 자동 startDrawNo는 "마지막 저장 회차 + 1" 흐름 유지
			setManualDrawNo('');

			// 자동 버튼 흐름도 이어가려면 startDrawNo를 drawNo+1로 맞춰줌
			setStartDrawNo(drawNo + 1);
		} catch (e) {
      // axios 에러인지 확인
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;

        // 404 = 해당 회차 데이터가 없음(대개 최신 회차 초과)
        if (status === 404) {
          const tried = targetDrawNo;
          const latest = tried - 1;

          window.alert(`최신 회차(${latest}회차)까지만 데이터가 존재합니다.`);
          // 자동 버튼 흐름 보정: 최신 회차+1로 유지(다시 누르면 같은 404 반복 방지)
          setStartDrawNo(tried);
          return;
        }
      }

      console.error('API 호출 중 오류 발생:', e);
      window.alert('회차 추가 실패: 콘솔 로그를 확인해주세요.');
    }
  };

	return (
		<Row>
			<Input
				inputMode="numeric"
				placeholder={`원하는 회차 입력`}
				value={manualDrawNo}
				onChange={(e) => setManualDrawNo(e.target.value)}
			/>
			<Button onClick={handleAddLotto} disabled={manualDrawNo.trim() !== '' && parsedManual === null}>
				{targetDrawNo}회차 번호 추가하기
			</Button>
		</Row>
	);
}
