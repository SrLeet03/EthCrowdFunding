// import logo from './logo.svg';
// import './App.css';
import Layout from "./components/Layout.js"
import Loader from "./pages/Loader"

import { Provider } from "react-redux"
import store from "./redux/store"
import { Auth, useAuth } from "@arcana/auth-react"

const onLogin = () => {
    // Route to authenticated page
    return <Layout />
}

function App() {
    const auth = useAuth()
    console.log(auth)

    return (
        <div className="App">
            <Provider store={store}>
                {auth.loading ? (
                    <Loader />
                ) : auth.isLoggedIn ? (
                    <Layout />
                ) : (
                    <div>
                        <Auth
                            externalWallet={true}
                            theme={"light"}
                            onLogin={onLogin}
                        />
                    </div>
                )}
            </Provider>
        </div>
    )
}

export default App
