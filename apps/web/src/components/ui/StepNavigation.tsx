'use client';
import clsx from 'clsx';
import { useAccountStore } from '@/store';

export default function StepNavigation() {
	const { step: currentStep, steps, prevStep, goToStep } = useAccountStore();

	return (
		<div className="mb-12 mt-4 lg:mb-0 min-w-60">
			{/* back button */}
			<button
				className="mb-4 flex items-center gap-2 text-xl disabled:text-white/50 lg:mb-12 lg:gap-5"
				disabled={currentStep === 1}
				onClick={prevStep}
			>
				Back
			</button>

			{/* list of form steps */}
			<div className="relative flex flex-row justify-between lg:flex-col lg:justify-start lg:gap-8">
				{steps.map((step, index) => (
					<button
						key={step.id}
						className="group z-20 flex items-center gap-3 text-2xl"
						onClick={() => goToStep(step.id)}
					>
						<span
							className={clsx(
								'flex h-10 w-10 items-center justify-center rounded-full border  text-sm  transition-colors duration-200  lg:h-12 lg:w-12 lg:text-lg',
								{
									'border-none bg-teal-500 text-black group-hover:border-none group-hover:text-black':
										currentStep === step.id,
									'border-white/75 bg-gray-900 group-hover:border-white group-hover:text-white text-white/75':
										currentStep !== step.id,
								},
							)}
						>
							{index + 1}
						</span>
						<span
							className={clsx(
								'hidden text-white/75 transition-colors duration-200 group-hover:text-white lg:block',
								{
									'font-light': currentStep !== step.id,
									'font-semibold text-white': currentStep === step.id,
								},
							)}
						>
							{step.title}
						</span>
					</button>
				))}
				{/* mobile background dashes */}
				<div className="absolute top-4 flex h-1 w-full border-b border-dashed lg:hidden" />
			</div>
		</div>
	);
}
