import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type LottoParsed = {
	drwNo: number;
	numbers: number[]; // 6개
	bonus: number; // 1개
};

function pickNumbersFromHtml(html: string) {
	// 동행복권 결과 페이지에서 공 번호가 보통 ball_645 클래스에 들어감
	const re = /ball_645[^>]*>(\d{1,2})</g;

	const picked: number[] = [];
	let m: RegExpExecArray | null;

	while ((m = re.exec(html)) !== null) {
		const n = Number(m[1]);
		if (Number.isFinite(n)) picked.push(n);
		if (picked.length >= 7) break; // 6 + 보너스
	}

	return picked;
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const drwNoStr = searchParams.get('drwNo');

	if (!drwNoStr || !/^\d+$/.test(drwNoStr)) {
		return NextResponse.json({ message: 'Invalid drwNo' }, { status: 400 });
	}

	const drwNo = Number(drwNoStr);

	// JSON API가 막혀도, 결과 페이지 HTML은 보통 접근 가능
	const url = `https://www.dhlottery.co.kr/gameResult.do?method=byWin&drwNo=${drwNo}`;

	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
			'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
			Referer: 'https://www.dhlottery.co.kr/',
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache'
		},
		redirect: 'follow',
		cache: 'no-store'
	});

	const html = await res.text();
	const contentType = res.headers.get('content-type') ?? '';

	if (!res.ok) {
		return NextResponse.json(
			{ message: 'Upstream error', status: res.status, contentType, bodyHead: html.slice(0, 300) },
			{ status: 502 }
		);
	}

	const picked = pickNumbersFromHtml(html);

	// 파싱 실패 시, 디버깅 가능한 정보만 조금 내려줌
	if (picked.length < 7) {
		return NextResponse.json(
			{
				message: 'Parse failed',
				status: res.status,
				contentType,
				bodyHead: html.slice(0, 300),
				picked
			},
			{ status: 502 }
		);
	}

	const data: LottoParsed = {
		drwNo,
		numbers: picked.slice(0, 6),
		bonus: picked[6]
	};

	return NextResponse.json(data, {
		status: 200,
		headers: {
			// Vercel 캐시(선택): 같은 회차는 자주 안 변하니까 서버 부담 줄이기
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
		}
	});
}
