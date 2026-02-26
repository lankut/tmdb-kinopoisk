
import { useNavigate } from 'react-router'
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className={s.wrapper}>
            <h1 className={s.code}>404</h1>
            <h2 className={s.title}>Page Not Found</h2>
            <p className={s.message}>
                The page you're looking for doesn't exist or has been moved.
            </p>
            <button className={s.button} onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    )
}