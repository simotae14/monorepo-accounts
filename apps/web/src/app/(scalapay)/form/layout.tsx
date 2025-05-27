'use client';
import * as React from 'react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
	// We want to show a spinner during the loading of the page with all the local storage stuff
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return (
			<div className="max-w-md mx-auto p-6 rounded-lg">
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
				</div>
			</div>
		);
	}
	return <div>{children}</div>;
}
