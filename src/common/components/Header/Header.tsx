import s from './Header.module.css'
import {Logo} from "@/common/components/Header/Logo/Logo.tsx";
import {NotificationAria} from "@/common/components/Header/NotificationAria";
import {Navigation} from "@/common/components/Header/Navigation";
import {SearchItem} from "@/common/components/SeachItem";

export const Header = () => {
    return (
        <>
            <div className={s.wrapper}>
                <Logo/>
                <Navigation/>
                <NotificationAria/>
            </div>
            <div>
                <SearchItem/>
            </div>
        </>

    );
};