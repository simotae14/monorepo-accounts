interface SubmitButtonProps {
	text: string;
	disabled?: boolean;
}

function SubmitButton({ text, disabled = false }: SubmitButtonProps) {
	return (
		<button
			className="fixed rounded-[100px] bg-lilac-active py-2 font-semibold text-sm text-white disabled:bg-lilac-active/30 lg:py-7 lg:text-2xl bottom-8 left-16 right-16"
			type="submit"
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default SubmitButton;
