import * as React from 'react';

function Card({ classProps, children }: { classProps?: string; children: React.ReactNode }) {
	return (
		<div
			className={`bg-white rounded-[1.250rem] pt-4 pb-4 px-6 mx-4 w-[calc(100vw-2rem)] ${classProps}`}
		>
			{children}
		</div>
	);
}

export default Card;
