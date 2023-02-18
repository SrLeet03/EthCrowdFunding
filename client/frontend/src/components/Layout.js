import React , {useEffect} from 'react';

import { Switch, Route , useRouteMatch } from 'react-router-dom'
import { URL } from '../helper/helper';
import FundraiseList from './blockchain/FundraiseList';
import LandingPage from './source/LandingPage';
import Notfound from './source/Notfound';
import axios from 'axios';
import FundProfile from './blockchain/FundProfile';
import Navbar from './Navbar';
import Privateroute from './auth/Privateroute';
import Profile from './auth/Profile';
import Signup from './auth/Signup';
import { useSelector , useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions/action';
const Layout = () => {

    
    const auth  = useSelector((state) => state.auth)
   
    const dispatch = useDispatch()    
    useEffect(() => {
        axios.get(`${URL}/validatoken/${auth.token}`)
        .then( (result) =>{
            console.log(result);
            if(result.data.error!=""){
                auth.state = false;
                dispatch(setAuth(auth));
               return;
            }
             
            auth.state = true;
            dispatch(setAuth(auth));
            
        } )
        .catch((err) => {
            auth.state = false;
            dispatch(setAuth(auth));
        })
        console.log("check" , auth)  ;
    }, [])

    return (
        <>
        <Navbar/>
            <Switch >
                <Route  path='/'  exact component={LandingPage }  />
                <Route  path='/fundraisers' exact component={FundraiseList}/>
                <Route  path='/fundraisers/:id' exact component={FundProfile}/>
                <Route  path='/list' exact component={FundraiseList}/>
                <Route  path='/signup' exact component={Signup}/>
                <Privateroute  path='/myprofile'  component={Profile} isAuth = {auth.state} />
                <Route component={Notfound}/>
            </Switch> 
           
        </>
    );

}

export default Layout;