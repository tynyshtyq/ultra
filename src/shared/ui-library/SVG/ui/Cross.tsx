import React, { FC, SVGProps } from 'react';

const Cross: FC<SVGProps<SVGSVGElement>> = ({...props}) => {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <line x1="7.07107" y1="6" x2="93" y2="91.9289" stroke="white" strokeWidth="10" strokeLinecap="round"/>
            <line x1="6" y1="91.9289" x2="91.9289" y2="6" stroke="white" strokeWidth="10" strokeLinecap="round"/>
        </svg>
    );
};

export default Cross;