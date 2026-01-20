import type { Metadata } from 'next';

export const metadata: Metadata = {
	icons: {
		icon: [
			{ url: '/android-icon.png', sizes: '192x192', type: 'image/png' },
			{ url: '/ms-icon.png', sizes: '144x144', type: 'image/png' }
		],
		apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<body>{children}</body>
		</html>
	);
}
