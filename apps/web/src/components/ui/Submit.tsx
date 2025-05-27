import React from 'react';

interface SubmitButtonProps {
	text: string;
}

function SubmitButton({ text }: SubmitButtonProps) {
	return (
		<button
			className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl"
			type="submit"
		>
			{text}
		</button>
	);
}

export default SubmitButton;
