import logo from './../../../../assets/logo.svg';
import s from './Logo.module.css'
import {Link} from "react-router";
import {Path} from "@/common/routing";

export const Logo = () => {
    return (
        <Link className={s.wrapper} to={Path.MainPage}>
            <img src={logo} alt={'logo'}></img>
        </Link>
    );
};