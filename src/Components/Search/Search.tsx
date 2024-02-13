import { forwardRef } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({ isValid = true, className, ...props }, ref) {
    return (
        <div className={styles.inputWrapper}>
            <input ref={ref} className={classNames(styles.input, styles[`${className}`], { [styles["invalid"]]: isValid, })} {...props} />
            <img src="/search-icon.svg" alt="search" className={styles.icon} />
        </div>
    )
})

export default Search