
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Product as ProductInt } from "../../Interfaces/product.interface";
import styles from './Product.module.scss'
import { Suspense } from "react";
import { Button } from "../../Components/Button/Button";
import { Rating } from "../../Components/Rating/Rating";
import { Headling } from "../../Components/Headling/Headling";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart.slice";

export const Product = () => {
    const data = useLoaderData() as { data: ProductInt }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (<>
        <Suspense fallback={"Загружаю..."}>
            <Await resolve={data.data}>
                {({ data }: { data: ProductInt }) => (
                    <section className={styles.product}>
                        <div className={styles.head}>
                            <button className={styles.back} onClick={() => navigate("/")}>&lt;</button>
                            <Headling className={styles.title}>{data.name}</Headling>
                            <Button appearence="small" className={styles.addCart} onClick={() => dispatch(addToCart(data.id))}>
                                В корзину
                            </Button>
                        </div>
                        <div className={styles.wrapper}>
                            <img src={data.image} alt={data.name} className={styles.image} />
                            <Button appearence="small" className={styles.mobileButtonCart} onClick={() => dispatch(addToCart(data.id))}>
                                В корзину
                            </Button>
                            <div className={styles.info}>
                                <div className={styles.line}>
                                    <div className={styles.text}>Цена</div>
                                    <div className={styles.price}>{data.price}&nbsp;₽</div>
                                </div>
                                <div className={styles.line}>
                                    <div className={styles.text}>Рейтинг</div>
                                    <Rating rating={data.rating} className={styles.productRating} />
                                </div>
                                <div className={styles.ingredians}>
                                    <div className={styles.ingredianText}>Состав:</div>
                                    <ul>
                                        {data.ingredients.map(item => (
                                            <li key={Math.random()} className={styles.list}>•&nbsp;{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </Await >
        </Suspense>
    </>

    )
};