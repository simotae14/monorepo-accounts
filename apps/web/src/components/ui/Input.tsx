'use client';

interface InputProps {
	label: string;
	id: string;
	description?: string;
	required?: boolean;
	pattern?: string;
	type: string;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	errorMsg?: string;
	placeholder?: string;
}
export default function Input({
	label,
	id,
	required,
	pattern,
	type,
	minLength,
	maxLength,
	min,
	max,
	description,
	errorMsg,
	placeholder,
}: InputProps) {
	return (
		<div>
			<label htmlFor={id}>
				{label}
				{description && <span>{description}</span>}
			</label>
			<input
				className={`${errorMsg ? 'border-red-500' : 'border-slate-300'} border-2`}
				type={type}
				name={id}
				id={id}
				required={required}
				pattern={pattern}
				minLength={minLength}
				maxLength={maxLength}
				min={min}
				max={max}
				placeholder={placeholder}
			/>
			<div>{errorMsg && <span className="text-red-500 text-sm block ">{errorMsg}</span>}</div>
		</div>
	);
}
