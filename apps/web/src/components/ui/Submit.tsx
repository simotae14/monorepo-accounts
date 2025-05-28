interface SubmitButtonProps {
	text: string;
	disabled?: boolean;
}

function SubmitButton({ text, disabled = false }: SubmitButtonProps) {
	return (
		<button
			className="fixed rounded-[100px] bg-lilac-active py-3 font-semibold text-sm text-white 
				transition-all duration-200 ease-in-out
				hover:bg-lilac-active/90 hover:scale-[1.02] active:scale-[0.98]
				disabled:bg-lilac-active/30 disabled:text-white/60 disabled:cursor-not-allowed 
				disabled:hover:bg-lilac-active/30 disabled:hover:scale-100 disabled:active:scale-100
				lg:py-3 lg:text-xl 
				bottom-8 left-16 right-16 md:left-23 md:right-23 lg:left-40 lg:right-40"
			type="submit"
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default SubmitButton;
