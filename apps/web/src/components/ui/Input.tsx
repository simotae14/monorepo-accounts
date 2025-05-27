'use client';

import { useAccountStore } from '@/store';

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
	defaultChecked?: boolean;
	classProps?: string;
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
	defaultChecked,
	classProps,
}: InputProps) {
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

	const getCheckedValue = () => {
		if (type === 'checkbox') {
			const storeValue = newAccountData[id as keyof typeof newAccountData];
			if (storeValue !== undefined) {
				return Boolean(storeValue);
			}
			return defaultChecked || false;
		}
		return undefined;
	};

	return (
		<div className={`relative ${classProps}`}>
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
				{description && <span>{description}</span>}
			</label>
			<input
				className={`w-full custom-input placeholder-slate-500 text-slate-900 ${
					errorMsg ? 'border-red-500' : 'border-slate-500'
				} border-1`}
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
				onChange={handleInputChange}
				defaultValue={newAccountData[id as keyof typeof newAccountData] as string}
				checked={getCheckedValue()}
				aria-label={label}
			/>
			<div>{errorMsg && <span className="text-red-500 text-sm block ">{errorMsg}</span>}</div>
		</div>
	);
}
