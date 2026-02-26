import s from './Header.module.css'
import {Logo} from "@/common/components/Header/Logo/Logo.tsx";
import {Theme} from "@/common/components/Header/Theme";
import {Navigation} from "@/common/components/Header/Navigation";
import {SearchItem} from "@/common/components/SeachItem";

export const Header = () => {
    return (
        <>
            <div className={s.wrapper}>

                <Logo/>
                <Navigation/>
                <Theme/>
            </div>
            <div>
                <SearchItem/>
            </div>
        </>

    );
};