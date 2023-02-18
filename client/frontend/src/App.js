import logo from "./logo.svg"
import "./App.css"

import { Auth, useAuth } from "@arcana/auth-react"
import CrowdFunding from "./Components/CrowdFunding"

const onLogin = () => {
    // Route to authenticated page
    return "hello"
}

function App() {
    const auth = useAuth()

    return (
        <div>
            {auth.loading ? (
                "Loading"
            ) : auth.isLoggedIn ? (
                <div>
                    <p>Logged In</p>
                    <CrowdFunding />
                </div>
            ) : (
                <div>
                    <Auth
                        externalWallet={true}
                        theme={"light"}
                        onLogin={onLogin}
                    />
                </div>
            )}
        </div>
    )
}

export default App
