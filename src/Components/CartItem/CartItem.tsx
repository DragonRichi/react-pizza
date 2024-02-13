import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addToCart, removeProduct, deleteCart } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';
import styles from './CartItem.module.scss'

export const CartItem = ({ id, name, image, price, count }: CartItemProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const addCart = () => {
        dispatch(addToCart(id))
    }

    const delCart = () => {
        dispatch(deleteCart(id))
    }

    const remove = () => {
        dispatch(removeProduct(id))
    };

    return (

        <div className={styles.item}>
            <div style={{ backgroundImage: `url(${image})` }} className={styles.image}></div>
            <div className={styles.description}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{price}&nbsp;₽</div>
            </div>
            <div className={styles.actions}>
                <button className={styles.minus} onClick={remove}>
                    —
                </button>
                <div className={styles.count}>{count}</div>
                <button className={styles.plus} onClick={addCart}>
                    +
                </button>
                <button className={styles.remove} onClick={delCart}>
                    ✕
                </button>
            </div>
        </div >

    )
};



