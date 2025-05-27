interface SubmitButtonProps {
	text: string;
	disabled?: boolean;
}

function SubmitButton({ text, disabled = false }: SubmitButtonProps) {
	return (
		<button
			className="mt-2 rounded-lg bg-teal-500 py-4 text-lg text-black disabled:bg-teal-600/30 lg:py-7 lg:text-2xl animate-bounce"
			type="submit"
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default SubmitButton;
