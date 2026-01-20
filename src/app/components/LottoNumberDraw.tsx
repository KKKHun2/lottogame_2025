'use client';

import { useState } from 'react';
import styled from 'styled-components';
import LottoDataUpdater from './AddLotto';
import { useLottoStore } from '@/store/lottoStore';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #939fb1;
	padding: 30px;
	height: 100vh;
	border-radius: 10px;

	@media (max-width: 900px) {
		height: 100%;
	}
`;

const Title = styled.h1`
	margin: 20px 0 20px 0;
	font-size: 70px;
	font-weight: 700;

	@media (max-width: 900px) {
		font-size: 40px;
	}
`;

const UserName = styled.div`
	font-size: 25px;
	font-weight: 500;
	margin-bottom: 50px;

	@media (max-width: 900px) {
		margin-bottom: 20px;
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
	margin-bottom: 20px;
	transition: all 0.3s ease;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

	&:hover,
	&:active {
		background-color: #a2a2a2;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
	}
`;

const RecommendedNumbersContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-bottom: 300px;
`;

const RecommendedNumber = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 100px;
	background-color: #f5f6fa;
	border: 2px solid #757575;
	border-radius: 50%;
	margin: 10px;
	font-size: 20px;
	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.4);
	cursor: pointer;

	&:hover {
		background-color: #e3f767;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 900px) {
		margin: 20px;
	}
`;

const TilteBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
	gap: 2rem;
	margin-bottom: 2rem;
`;

const LottoN = styled.div`
	font-size: 35px;
	font-weight: 450;
`;

export default function LottoNumberDraw() {
	const userName = useLottoStore((s) => s.userName);
	const setUserName = useLottoStore((s) => s.setUserName);
	const lottoNumbers = useLottoStore((s) => s.lottoNumbers);

	const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);

	const handleNameChange = () => {
		const inputName = prompt('이름을 입력해주세요:');
		if (inputName) {
			setUserName(inputName);
		}
	};

	const generateRandomNumbers = () => {
		const allNumbers = lottoNumbers.flat();
		if (allNumbers.length === 0) return;

		const uniqueRandomNumbers: number[] = [];

		while (uniqueRandomNumbers.length < 6) {
			const randomIndex = Math.floor(Math.random() * allNumbers.length);
			const randomNum = allNumbers[randomIndex];

			if (!uniqueRandomNumbers.includes(randomNum)) {
				uniqueRandomNumbers.push(randomNum);
			}
		}

		uniqueRandomNumbers.sort((a, b) => a - b);
		setGeneratedNumbers(uniqueRandomNumbers);
	};

	return (
		<Container>
			<TilteBox>
				<Title>당신의 로또 번호!!</Title>
				<LottoDataUpdater />
			</TilteBox>

			{userName ? <UserName>안녕하세요, {userName} 님!</UserName> : <Button onClick={handleNameChange}>이름 입력</Button>}

			<Button onClick={generateRandomNumbers}>{generatedNumbers.length > 0 ? '다시뽑기' : '번호뽑기'}</Button>

			<RecommendedNumbersContainer>
				{generatedNumbers.map((number, index) => (
					<RecommendedNumber key={index}>
						<LottoN>{number}</LottoN>
					</RecommendedNumber>
				))}
			</RecommendedNumbersContainer>
		</Container>
	);
}
