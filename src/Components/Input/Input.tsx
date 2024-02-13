import { forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
    return <input ref={ref} className={classNames(styles.input, styles[`${className}`], { [styles["invalid"]]: isValid, })} {...props} />
})

export default Input