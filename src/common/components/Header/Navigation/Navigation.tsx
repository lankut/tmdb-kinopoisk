import {Path} from "@/common/routing";
import {NavLink} from "react-router";
import s from './Navigation.module.css'

const navItems = [
    {to: Path.MainPage, label: 'Main'},
    {to: Path.CategoryMovies, label: 'Category Movies'},
    {to: Path.FilteredMovies, label: 'Filtered Movies'},
    {to: Path.Search, label: 'SearchPage'},
    {to: Path.Favorites, label: 'Favorites'},
]

export const Navigation = () => {
    return (
        <nav>
            <ul className={s.items}>
                {navItems.map((item) => <li key={item.to} className={s.item}>
                    <NavLink
                        to={item.to} className={s.link}>{item.label}</NavLink>
                </li>)}
            </ul>

        </nav>
    );
};