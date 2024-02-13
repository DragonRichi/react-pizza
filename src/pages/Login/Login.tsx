import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { Headling } from "../../Components/Headling/Headling";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearLoginError, fetchLogin } from "../../store/UserSlice";
import Input from "../../Components/Input/Input";
import styles from './Login.module.scss'

export type LoginForm = {
    email: {
        value: string
    };
    password: {
        value: string
    }
}

export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { jwt, loginErrorMessage } = useSelector((item: RootState) => item.user)
    useEffect(() => {
        if (jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault()
        dispatch(clearLoginError())
        const target = event.target as typeof event.target & LoginForm
        const { email, password } = target
        await sendLogin(email.value, password.value)
    }


    const sendLogin = async (email: string, password: string) => {
        dispatch(fetchLogin({ email, password }))
    }

    return (
        <section className={styles.login}>
            <Headling>Вход</Headling>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
            <form className={styles.form} onSubmit={submitHandler}>
                <div className={styles.field}>
                    <label htmlFor="email">Ваш email</label>
                    <Input id="email" name="email" placeholder="Email" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль" />
                </div>
                <Button appearence="big">Вход</Button>
            </form>
            <div className={styles.links}>
                <div >Нет аккаунта?</div>
                <div>
                    <Link to="/auth/register">Зарегистрироваться</Link>
                </div>
            </div>
        </section>
    )
};