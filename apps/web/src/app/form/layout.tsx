export default function FormLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div>
				<div className="w-full">{children}</div>
			</div>
		</div>
	);
}
