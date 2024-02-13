import classNames from 'classnames';
import styles from './Button.module.scss'
import { ButtonProps } from './Button.props';
import { FC } from 'react';

export const Button: FC<ButtonProps> = ({ children, className, appearence = "small", ...props }) => {
    return (
        <button className={classNames(styles["button"], styles["accent"], className, {
            [styles["small"]]: appearence === "small",
            [styles["big"]]: appearence === "big"
        })} {...props}>{children}</button>
    )
}
