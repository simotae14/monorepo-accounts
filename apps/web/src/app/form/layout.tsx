'use client';
import PageHeader from '@/components/ui/PageHeader';
import StepNavigation from '@/components/ui/StepNavigation';

export default function FormLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full px-2 lg:px-0">
			<PageHeader title="Crea account" subtitle="Paga il tuo ordine in un massimo di 36 rate" />

			<div className="mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
				<StepNavigation />
				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
