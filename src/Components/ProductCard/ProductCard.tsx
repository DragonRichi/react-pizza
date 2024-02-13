import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss'
import { ProductCardProps } from './ProductCard.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addToCart } from '../../store/cart.slice';
import { MouseEvent } from 'react';
import { Rating } from '../Rating/Rating';

export const ProductCard = ({ id, name, description, image, price, rating }: ProductCardProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const addCart = (event: MouseEvent) => {
        event.preventDefault()
        dispatch(addToCart(id))
    }

    return (
        <Link to={`/product/${id}`}>
            <div className={styles.card}>
                <div className={styles.head} style={{ backgroundImage: `url(${image})` }}>
                    <div className={styles.price}>
                        {price}
                        <span className={styles.currency}>&nbsp;₽</span>
                    </div>
                    <button className={styles.addCard} onClick={addCart}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0258 13.8475L18.595 17.4159L17.4158 18.595L13.8475 15.0259C12.5198 16.0902 10.8683 16.6691 9.16666 16.6667C5.02666 16.6667 1.66666 13.3067 1.66666 9.16669C1.66666 5.02669 5.02666 1.66669 9.16666 1.66669C13.3067 1.66669 16.6667 5.02669 16.6667 9.16669C16.6691 10.8684 16.0902 12.5198 15.0258 13.8475ZM13.3542 13.2292C14.4118 12.1416 15.0024 10.6837 15 9.16669C15 5.94335 12.3892 3.33335 9.16666 3.33335C5.94332 3.33335 3.33332 5.94335 3.33332 9.16669C3.33332 12.3892 5.94332 15 9.16666 15C10.6837 15.0024 12.1416 14.4118 13.2292 13.3542L13.3542 13.2292ZM8.33332 8.33335V5.83335H9.99999V8.33335H12.5V10H9.99999V12.5H8.33332V10H5.83332V8.33335H8.33332Z" fill="#fff" />
                        </svg>
                    </button>
                    <Rating rating={rating} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </div >
        </Link>
    )
};