'use client';
import StepOne from '@/components/steps/step-one';
import StepTwo from '@/components/steps/step-two';
import { useAccountStore } from '@/store';

export default function FormPage() {
	const { step } = useAccountStore();

	const renderStep = () => {
		switch (step) {
			case 1:
				return <StepOne />;
			case 2:
				return <StepTwo />;
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
}
