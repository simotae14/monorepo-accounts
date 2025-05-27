'use client';

import { useAccountStore } from '@/store';

interface ToggleInputProps {
	id: string;
	label: string;
	required?: boolean;
	type: string;
	defaultChecked?: boolean;
	errorMsg?: string;
	classProps?: string;
	startIcon?: React.ReactNode;
}

function ToggleInput({
	id,
	label,
	required,
	type,
	defaultChecked,
	errorMsg,
	classProps,
	startIcon,
}: ToggleInputProps) {
	const { updateNewAccountDetails, newAccountData } = useAccountStore();

	const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateNewAccountDetails({
			[e.target.name]: e.target.checked,
		});
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
		<div className={`flex items-center justify-between px-2 ${classProps}`}>
			<label
				htmlFor={id}
				className="color-black-dark-light font-medium text-[0.625rem] cursor-pointer flex items-center"
			>
				{label}
				{startIcon}
			</label>

			<label className="relative inline-flex items-center cursor-pointer">
				<input
					type="checkbox"
					id={id}
					name={id}
					className="sr-only peer"
					required={required}
					onChange={handleToggleChange}
					defaultValue={newAccountData[id as keyof typeof newAccountData] as string}
					checked={getCheckedValue()}
				/>
				<div className="relative w-[34] h-[14] bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-8 after:content-[''] after:absolute after:top-[-4px] after:left-[-12px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CCCCFF] peer-checked:after:bg-[#5666F0] after:shadow-md"></div>
				<div>{errorMsg && <span className="text-red-500 text-sm block ">{errorMsg}</span>}</div>
			</label>
		</div>
	);
}

export default ToggleInput;
