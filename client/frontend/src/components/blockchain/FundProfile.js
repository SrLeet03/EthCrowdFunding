import React , {useState} from 'react'

import { Link, useRouteMatch } from 'react-router-dom'
import { Button  , ProgressBar} from 'react-bootstrap'
import { FaHandHoldingHeart } from 'react-icons/fa'
import './css/profile.css'
import Mainbody from './Mainbody'
import Requestbody from './Requestbody'
import { useSelector } from 'react-redux'

export default function FundProfile({ info }) {
    const { url } = useRouteMatch();
    const [win , setWin] = useState("overview") ; 

    //console.log(info) ; 
    const profile = useSelector((state) => state.fundr.fundr)
    const dayLeft = profile.days;
    
    return (
        

        <div className="mainfor">

            <div id="main" className="main job-page">
                <div className="company-header">
                    <div className="headline-image">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" alt="img"></img>
                    </div>
                    <ul>


                        <li className="nav">
                            <Link to={url}>
                            <Button onClick = {(e) => setWin("overview")} >About the Fundraiser</Button>
                            </Link>
                            <Link to={url}>          
                            <Button onClick = {(e) => setWin("reqs")} >requests</Button>
                            </Link>
                        </li>
                    </ul>
                </div>


                <div className="slide job-detail">
                    <div className="apply-top">
                        <div className="d-grid gap-2">
                            <Button variant="success" size="lg"><FaHandHoldingHeart />Donate Now</Button>
                            <ProgressBar animated now={dayLeft}  label={`${dayLeft}`}/>Days Left!
                        </div>


                       

                        <p>Or, know someone who would be a perfect to donate? Let them know!</p>
                       
                        <a href="local:3000" className="button secondary">
                            <i className="fa fa-facebook"></i>
                            Share on Facebook
                        </a>
                    </div>
                
               {
                   ( win==="overview" ? <Mainbody info={info}/> : <Requestbody/> )
               }
                
                   

                </div>
            </div>
        </div>
    )
}
