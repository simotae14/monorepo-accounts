import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Scalapay checkout',
	description: 'Scalapay demo of a checkout using Next and Next',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.className} h-screen`}>
				{/* Pink background section */}
				<div className="absolute top-0 left-0 right-0 h-48 z-0 bg-pink-section clip-curve"></div>
				{/* Header */}
				<header className="flex flex-col items-center justify-center h-16 my-11">
					<p className="font-semibold text-[0.625rem] color-black-dark z-0">Secure checkout</p>
					<div className="z-0">
						<Image src="scalapay-logo.svg" alt="My Happy SVG" width={112} height={20} />
					</div>
				</header>
				<main className="w-full h-full flex flex-col justify-center">
					{children}
					<Toaster />
				</main>
			</body>
		</html>
	);
}
