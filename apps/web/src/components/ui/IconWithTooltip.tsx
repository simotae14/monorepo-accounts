import React from 'react';
import Image from 'next/image';

function IconWithTooltip({
	icon,
	tooltipMessage,
	classProps,
}: {
	icon: string;
	tooltipMessage: string;
	classProps?: string;
}) {
	return (
		<div className={`relative group ${classProps}`}>
			<Image src={icon} height={24} width={24} alt="Open to know more" />
			<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-lilac-active rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
				{tooltipMessage}
			</div>
		</div>
	);
}

export default IconWithTooltip;
