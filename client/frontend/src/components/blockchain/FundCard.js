import React from 'react'
import { setFundr } from '../../redux/actions/action';
import {Card  , Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {FcCurrencyExchange,FcFile }  from "react-icons/fc";
import { FaUserCircle  } from "react-icons/fa";

import {BiChevronRight}  from "react-icons/bi";

import { Link , useRouteMatch } from 'react-router-dom'

export default function FundCard({info}) {
    
    const {url} = useRouteMatch() ; 
    const dispatch = useDispatch() ; 

    const handleFunc =   () => {
          
         dispatch(setFundr(info));
    }
    return (
      
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" />
            <Card.Body>
                <Card.Title><FcFile/>{info.title}</Card.Title>
                <Card.Text>
                    <FaUserCircle/> By: {info.name}<br></br>
                    <BiChevronRight/> Date: {info.time}, {info.date}<br></br>
                      {info.tagline}.
                </Card.Text>
                <Link to={`${url}/${info.title}`} >
                <Button variant="warning"  onClick={handleFunc} >Read more and Donate <FcCurrencyExchange/></Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
}
