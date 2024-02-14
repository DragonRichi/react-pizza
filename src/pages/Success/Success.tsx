import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components/Button/Button';
import styles from './Success.module.scss'

export const Success = () => {
    const navigate = useNavigate()
    return <section className={styles.success}>
        <img src={`${import.meta.env.BASE_URL}/product.png`} alt="Order" />
        <div className={styles.text}>Ваш заказ успешно оформлен!</div>
        <Button appearence='big' onClick={() => navigate("/")}>Сделать новый</Button>
    </section>
};