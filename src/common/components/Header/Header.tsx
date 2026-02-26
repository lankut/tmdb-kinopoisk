import s from './Header.module.css'
import {Logo} from "@/common/components/Header/Logo/Logo.tsx";
import {Theme} from "@/common/components/Header/Theme";
import {Navigation} from "@/common/components/Header/Navigation";
import {SearchItem} from "@/common/components/SeachItem";
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "@/common/hooks";
import {selectIsLoading} from "@/app/model/appSlice.ts";

export const Header = () => {
    const isLoading = useAppSelector(selectIsLoading)

    return (
        <>
            <div className={s.wrapper}>

                <Logo/>
                <Navigation/>
                <Theme/>
            </div>
            <div>
                <SearchItem/>
                {isLoading && <LinearProgress variant={"indeterminate"}/>}
            </div>
        </>

    );
};