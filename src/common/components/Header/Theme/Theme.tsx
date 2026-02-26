import s from './Theme.module.css'
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {selectTheme, toggleTheme} from "@/app/model/appSlice.ts";


export const Theme = () => {

    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()

    return (
        <div className={s.items}>
            <button className={s.button} onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    );
};