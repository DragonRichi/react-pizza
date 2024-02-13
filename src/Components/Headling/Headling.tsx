import { HeadlingProps } from './Headling.props';
import classNames from 'classnames';
import styles from './Headling.module.scss'

export const Headling = ({ children, className, ...props }: HeadlingProps) => {
    return <h1 {...props} className={classNames(className, styles.h1)}>{children}</h1>;
};