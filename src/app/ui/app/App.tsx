import './App.module.css'
import {Header} from "@/common/components";
import {Routing} from "@/common/routing";
import {Footer} from "@/common/components/Footer";


function App() {

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
