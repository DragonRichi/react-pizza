import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from './Layout.module.scss'
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProfile, logout } from "../../store/UserSlice";
import { useEffect } from "react";
import { resetCart } from "../../store/cart.slice";

export const Layout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const profile = useSelector((item: RootState) => item.user.profile)
    const items = useSelector((item: RootState) => item.cart.items)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    const logoutHandler = () => {
        dispatch(resetCart())
        dispatch(logout())
        navigate("/auth/login")
    }

    return (
        <div className={styles.layout}>
            <div className={styles.sidebar}>
                <div className={styles.user}>
                    <img src={`${import.meta.env.BASE_URL}/avatar.png`} alt="ava" className={styles.avatar} />
                    <div className={styles.userInfo}>
                        <div className={styles.name}>{profile?.name}</div>
                        <div className={styles.email}>{profile?.email}</div>
                    </div>
                </div>
                <div className={styles.menu}>
                    <NavLink to={"/"} className={({ isActive }) => classNames(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="#2979FF" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 8H8V0H0V8ZM0 18H8V10H0V18ZM10 18H18V10H10V18ZM10 0V8H18V0" fill="currentColor" />
                        </svg>

                        Меню</NavLink>
                    <NavLink to={"/cart"} className={({ isActive }) => classNames(styles.link, {
                        [styles.active]: isActive
                    })}>
                        <svg width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect id="nuclear-station" width="20.000000" height="20.000000" fill="currentColor" fillOpacity="0" />
                            <rect id="Icons Background" width="20.000000" height="20.000000" fill="currentColor" fillOpacity="0" />
                            <path id="Vector" d="M10 7.22C10.5304 7.22 11.0392 7.43071 11.4142 7.80579C11.7893 8.18086 12 8.68957 12 9.22C12 9.75043 11.7893 10.2591 11.4142 10.6342C11.0392 11.0093 10.5304 11.22 10 11.22C9.4696 11.22 8.96082 11.0093 8.58582 10.6342C8.21069 10.2591 8 9.75043 8 9.22C8 8.68957 8.21069 8.18086 8.58582 7.80579C8.96082 7.43071 9.4696 7.22 10 7.22ZM10 19.22C8.05005 19.22 6.21997 18.66 4.68994 17.69L8 12.69C8.59998 13.03 9.28003 13.22 10 13.22C10.72 13.22 11.4 13.03 12 12.69L15.3101 17.69C13.78 18.66 11.95 19.22 10 19.22ZM0 9.22C0 5.08 2.5 1.52 6.10999 0L8.33997 5.58C6.95996 6.22 6 7.6 6 9.22L0 9.22ZM14 9.22C14 7.6 13.04 6.22 11.66 5.58L13.89 0C17.5 1.52 20 5.08 20 9.22L14 9.22Z" fill="currentColor" fillOpacity="1.000000" fillRule="nonzero" />
                        </svg>
                        {/* Корзина<span className={styles.cartCount}>{items.reduce((acc, item) => acc += item.count, 0)}</span></NavLink> */}
                        Корзина<span className={styles.cartCount}>{items.length}</span></NavLink>

                    {/*  */}
                </div>
                <Button className={styles.exit} onClick={logoutHandler}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="20" height="20" viewBox="0 0 1280.000000 1280.000000"
                        preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                            fill="currentColor" stroke="none">
                            <path d="M6080 11255 c-171 -35 -306 -109 -435 -239 -100 -101 -158 -193 -199
-316 -36 -108 -46 -186 -46 -357 l0 -153 2355 0 c1694 0 2369 -3 2407 -11 167
-35 301 -170 337 -337 16 -76 16 -6808 0 -6884 -36 -167 -171 -302 -337 -337
-38 -8 -713 -11 -2407 -11 l-2355 0 0 -152 c0 -172 10 -250 46 -358 41 -122
99 -214 199 -316 133 -134 278 -211 459 -243 41 -8 807 -11 2393 -11 2569 0
2395 -4 2563 61 107 41 192 100 290 199 126 127 201 275 229 450 15 91 15
8229 0 8320 -55 348 -329 629 -677 696 -106 20 -4721 19 -4822 -1z"/>
                            <path d="M5825 8954 c-44 -14 -78 -43 -289 -252 -266 -265 -286 -292 -286
-397 0 -37 8 -76 19 -101 13 -28 204 -227 646 -670 l628 -629 -2574 -5 -2574
-5 -41 -22 c-56 -30 -119 -103 -133 -155 -9 -31 -11 -143 -9 -383 3 -328 4
-341 25 -381 25 -48 83 -101 129 -120 28 -12 446 -14 2604 -14 1413 0 2570 -3
2570 -7 0 -4 -281 -289 -625 -633 -478 -479 -629 -636 -644 -670 -27 -60 -27
-150 0 -210 29 -64 454 -491 523 -525 64 -32 157 -34 219 -5 31 15 363 341
1218 1197 1160 1162 1176 1179 1208 1251 30 66 33 80 30 150 -5 97 -35 161
-123 263 -35 41 -563 572 -1172 1181 -783 781 -1122 1112 -1153 1128 -57 29
-133 34 -196 14z"/>
                        </g>
                    </svg>
                    Выход
                </Button>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
};