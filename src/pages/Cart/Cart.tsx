import { useDispatch, useSelector } from "react-redux";
import { Headling } from "../../Components/Headling/Headling";
import { RootState } from "../../store";
import { CartItem } from "../../Components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { Product } from "../../Interfaces/product.interface";
import { API_URL } from "../../helpers/const";
import axios from "axios";
import styles from './Cart.module.scss'
import { declOfNum } from "../../helpers/declOfNum";
import { Button } from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../store/cart.slice";

const DELIVERY_FEE = 169

export const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [cartProducts, setCardProducts] = useState<Product[]>([])
    const items = useSelector((items: RootState) => items.cart.items)
    const jwt = useSelector((items: RootState) => items.user.jwt)

    const total = items.map(item => {
        const product = cartProducts.find(product => product.id === item.id)
        if (!product) {
            return 0
        }
        return item.count * product.price
    }).reduce((acc, i) => acc += i, 0)

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${API_URL}/products/${id}`)
        return data
    }
    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)))
        setCardProducts(res)
    }

    const checkout = async () => {
        await axios.post(`${API_URL}/order`,
            {
                products: items
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        dispatch(resetCart())
        navigate(`/success`)
    }


    useEffect(() => {
        loadAllItems()
    }, [items])

    return <>
        <Headling className={styles.headling}>Корзина</Headling>
        {items.length > 0 ?
            <>
                {items.map(item => {
                    const product = cartProducts.find(product => product.id === item.id)
                    if (!product) {
                        return
                    }
                    return <CartItem count={item.count}{...product} key={Math.random()} />
                })}
                <div className={styles.line}>
                    <div className={styles.text}>Сумма</div>
                    <div className={styles.price}>{total}&nbsp;<span>₽</span></div>
                </div>
                <hr className={styles.hr} />
                <div className={styles.line}>
                    <div className={styles.text}>Доставка</div>
                    <div className={styles.price}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>

                </div>
                <hr className={styles.hr} />
                <div className={styles.line}>
                    <div className={styles.text}>Итого: <span className={styles.totalCount}>
                        {items.length}&nbsp;{declOfNum(items.length, ["товар", "товара", "товаров"])}</span>
                    </div>
                    <div className={styles.price}>{total + DELIVERY_FEE}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.checkout}>
                    <Button appearence="big" onClick={checkout}>Оформить</Button>
                </div>
            </> : <div>В данный момент корзина пуста!</div>
        }
    </>
};

