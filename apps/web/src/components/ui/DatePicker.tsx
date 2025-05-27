'use client';

import { useAccountStore } from '@/store';

interface DatePickerProps {
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

export default function DatePicker({
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
}: DatePickerProps) {
	const { updateNewAccountDetails, newAccountData } = useAccountStore();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (type === 'checkbox') {
			updateNewAccountDetails({
				[e.target.name]: e.target.checked,
			});
		} else {
			updateNewAccountDetails({
				[e.target.name]: e.target.value,
			});
		}
	};

	return (
		<div className="relative">
			{/* Floating label */}
			<label
				className={`
						absolute left-4 transition-all duration-200 ease-in-out
						pointer-events-none z-10 bg-white px-1
						${
							newAccountData[id as keyof typeof newAccountData]
								? 'top-0 text-xs text-blue-600 -translate-y-1/2'
								: 'color-gray-light h-7 top-4 py-1 text-xs'
						}
						${errorMsg ? 'text-red-500' : ''}
					`}
				htmlFor={id}
			>
				{label}
				{description && <span className="ml-1">{description}</span>}
			</label>

			<input
				className={`
						w-full custom-input bg-white text-slate-900
						border-1
						focus:outline-none focus:ring-0
						transition-all duration-200 ease-in-out
						[&::-webkit-calendar-picker-indicator]:opacity-70
						[&::-webkit-calendar-picker-indicator]:hover:opacity-100
						[&::-webkit-calendar-picker-indicator]:cursor-pointer
						[&::-webkit-inner-spin-button]:appearance-none
						[&::-webkit-outer-spin-button]:appearance-none
						${
							errorMsg
								? 'border-red-500 focus:border-red-500'
								: 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
						}
						${!newAccountData[id as keyof typeof newAccountData] ? 'text-slate-500' : ''}
					`}
				type={type}
				name={id}
				id={id}
				required={required}
				pattern={pattern}
				minLength={minLength}
				maxLength={maxLength}
				min={min}
				max={max}
				onChange={handleInputChange}
				defaultValue={newAccountData[id as keyof typeof newAccountData] as string}
				aria-label={label}
			/>

			{/* Error message */}
			{errorMsg && <span className="text-red-500 text-sm block mt-1">{errorMsg}</span>}
		</div>
	);
}
