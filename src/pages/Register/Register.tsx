import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { Headling } from "../../Components/Headling/Headling";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearRegisterError, registerProfile } from "../../store/UserSlice";
import Input from "../../Components/Input/Input";
import styles from './Register.module.scss'

export type RegisterForm = {
    email: {
        value: string
    };
    password: {
        value: string
    }
    name: {
        value: string
    }
}

export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { jwt, registerErrorMessage } = useSelector((item: RootState) => item.user)

    useEffect(() => {
        if (jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        dispatch(clearRegisterError())
        const target = event.target as typeof event.target & RegisterForm
        const { email, password, name } = target
        dispatch(registerProfile({ email: email.value, password: password.value, name: name.value }))
    }



    return (
        <section className={styles.login}>
            <Headling>Регистрация</Headling>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" name="email" placeholder="Email" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input id="name" name="name" type="text" placeholder="Имя" />
                </div>
                <Button appearence="big">Зарегистрироваться</Button>
            </form>
            <div className={styles.links}>
                <div >Есть аккаунт</div>
                <div>
                    <Link to="/auth/login">Войти</Link>
                </div>
            </div>
        </section>
    )
};