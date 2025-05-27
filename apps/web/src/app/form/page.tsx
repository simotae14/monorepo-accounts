'use client';
import StepOne from '@/components/steps/step-one';
import StepTwo from '@/components/steps/step-two';
import Review from '@/components/steps/review';
import { useAccountStore } from '@/store';

export default function AddPage() {
	const { step } = useAccountStore();

	const renderStep = () => {
		switch (step) {
			case 1:
				return <StepOne />;
			case 2:
				return <StepTwo />;
			case 3:
				return <Review />;
			default:
				return null;
		}
	};

	return <>{renderStep()}</>;
}
