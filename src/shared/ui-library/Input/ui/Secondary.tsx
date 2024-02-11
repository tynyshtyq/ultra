import React, { FC, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Primary: FC<Props> = ({className, ...props}) => {
    return (
        <input type="text" className={`p-3 w-full disabled:opacity-[.7] bg-[transparent] rounded-m bg-main desktop:text-DBody-L phone:text-MBody-L border-white ${className}`} style={{outline: 'none', ...props.style}} {...props} />
    );
};

export default Primary;