import { ProductCard } from "../../../Components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import styles from './MenuList.module.scss'

export const MenuList = ({ products }: MenuListProps) => {
    return <div className={styles.wrapper}>
        {products?.map(item => (
            <ProductCard key={item.id} id={item.id} name={item.name} description={item.ingredients.join(", ")} rating={item.rating} price={item.price} image={item.image} />
        ))
        }
    </div>
};