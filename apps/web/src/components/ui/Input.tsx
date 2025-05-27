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
		<div>
			<label className="block text-lg" htmlFor={id}>
				{label}
				{description && <span>{description}</span>}
			</label>
			<input
				className={`w-full rounded-md py-4 px-2 text-slate-900 ${
					errorMsg ? 'border-red-500' : 'border-slate-300'
				} border-2 bg-white`}
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
			/>
			<div>{errorMsg && <span className="text-red-500 text-sm block ">{errorMsg}</span>}</div>
		</div>
	);
}
