import { Text } from '@/shared/ui-library';
import React, { ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    leftIcon?: ReactNode;
    className?: string
}

const Primary: FC<Props> = ({className, leftIcon, ...props}) => {
    return (
        <button className={`px-4 phone:px-2 py-2 flex gap-2 items-center justify-center rounded-m bg-vista w-max text-main ${className}`} {...props}>
            {leftIcon && <>leftIcon</>}
            <Text.Body>{props.children}</Text.Body>
        </button>
    );
};

export default Primary;