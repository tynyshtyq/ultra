import React, { FC, HTMLProps } from 'react';

import styles from './style.module.css';

interface Props extends HTMLProps<HTMLElement> {
    className?: string;
}

const Loader: FC<Props> = ({className, ...props}) => {
    return (
        <span className={`${styles.loader} ${className}`} {...props}/>
    );
};

export default Loader;