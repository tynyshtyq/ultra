import { Text } from '@/shared/ui-library';
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: ReactNode;
    className?: string;
}

const Secondary: FC<Props> = ({className, leftIcon, ...props}) => {
    return (
        <button className={`px-4 phone:px-2 py-2 flex gap-2 rounded-m items-center justify-center border-m border-vista w-max text-vista hover:bg-vista hover:text-main duration-300 ${className}`} {...props}>
            {leftIcon && <>leftIcon</>}
            <Text.Body>{props.children}</Text.Body>
        </button>
    );
};

export default Secondary;