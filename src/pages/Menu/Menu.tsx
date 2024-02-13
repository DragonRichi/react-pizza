import { ChangeEvent, useEffect, useState } from "react";
import { Headling } from "../../Components/Headling/Headling";
import { Product } from "../../Interfaces/product.interface";
import { API_URL } from "../../helpers/const";
import { MenuList } from "./MenuList/MenuList";
import Search from "../../Components/Search/Search";
import axios, { AxiosError } from "axios";
import styles from './Menu.module.scss'



const Menu = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>()
    const [filter, setFilter] = useState<string>()


    useEffect(() => {
        getMenu(filter)
    }, [filter])

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true)
            const { data } = await axios.get(`${API_URL}/products`, {
                params: {
                    name
                }
            })
            setProducts(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if (error instanceof AxiosError) {
                setError(error.message)
            }
            console.error(error);
            return
        }

    }

    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    };



    return <>
        <div className={styles.head}>
            <Headling>Меню</Headling>
            <Search placeholder="Введите блюдо или состав" onChange={updateFilter} />
        </div>
        <div>
            {error && `Код ошибки: ${error}`}
            {!isLoading ? <MenuList products={products} /> : <div>Загрузка продуктов...</div>}
            {products.length === 0 && <div>По вашему запросу ничего не найдено!</div>}
        </div>
    </>;
};


export default Menu