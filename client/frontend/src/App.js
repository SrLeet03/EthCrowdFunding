import logo from "./logo.svg"
import "./App.css"

import { Auth, useAuth } from "@arcana/auth-react";
import Loader from './pages/Loader';
import Layout from './components/Layout';

import {Provider} from 'react-redux'; 
import store from './redux/store' ; 

const onLogin = () => {
    // Route to authenticated page
    return "hello"
}

function App() {
    const auth = useAuth()

  return (
    <div>
        <Provider store = {store}>
            {auth.loading ? (
              <Loader/>
            ) : auth.isLoggedIn ? (
              <p>Logged In</p>
            ) : (
              <div>
                <Auth externalWallet={true} theme={"light"} onLogin={onLogin}/>
              </div>
            )}
        </Provider>   

    </div>
  );
}

export default App
