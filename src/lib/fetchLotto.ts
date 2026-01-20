import axios from 'axios';

type LottoMirrorResponse = {
	draw_no: number;
	numbers: number[]; // 6개
	bonus_no: number;
	date?: string;
};

export async function fetchLotto(drawNo: number): Promise<number[]> {
	const url = `https://smok95.github.io/lotto/results/${drawNo}.json`;
	const res = await axios.get<LottoMirrorResponse>(url, { timeout: 8000 });

	const nums = res.data?.numbers ?? [];
	const bonus = res.data?.bonus_no;

	if (!Array.isArray(nums) || nums.length !== 6 || typeof bonus !== 'number') {
		throw new Error('Invalid lotto payload');
	}

	return [...nums, bonus]; // 7개로 맞춰서 리턴
}
