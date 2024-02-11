import React, { FC, SVGProps } from 'react';

const Logo: FC<SVGProps<SVGSVGElement>> = ({...props}) => {
    return (
        <svg width="440" height="473" viewBox="0 0 440 473" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M0.926847 473L167.351 0.272713H273.068L439.723 473H0.926847ZM115.877 401.214H324.542L222.056 97.2188H218.363L115.877 401.214Z" fill="#9065AF"/>
        </svg>
    );
};

export default Logo;