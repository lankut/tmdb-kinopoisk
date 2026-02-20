import {createRoot} from 'react-dom/client'
import './index.css'
import App from "@/app/ui/app/App.tsx";
import {BrowserRouter} from "react-router";
import {Provider} from "react-redux";
import {store} from "@/app/model/store.ts";
// Приступил 12.02.2026
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
)
