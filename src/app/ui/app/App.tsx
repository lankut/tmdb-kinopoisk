import './App.module.css'
import {Header} from "@/common/components";
import {Routing} from "@/common/routing";
import {Footer} from "@/common/components/Footer";
import {useEffect} from "react";
import {selectTheme} from "@/app/model/appSlice.ts";
import {useAppSelector} from "@/common/hooks";


function App() {
    const theme = useAppSelector(selectTheme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])


    return (
        <>
            <Header/>
            <div style={{minHeight: 'calc(100vh - 120px)'}}>
                <Routing/>
            </div>
            <Footer/>
        </>
    )
}

export default App
