import React  , {useState  , useEffect}from 'react'

import './css/profile.css'

import Alert from 'react-bootstrap/Alert';
import RequestBodyUtils from './RequestBodyUtils.js';


export default function FundProfile({ info }) {
    const [requests , setRequests] = useState([{
        "description" : "This is the sample request",
        "amount" : 12,
        "requestId" : "sdlfhbv989841@!3e",
        "deadline":"25feb,2019",
        "status":"accepted",
    },
    {
        "description" : "This is the another request",
        "amount" : 9,
        "requestId" : "sdlfhbv989841@!3e",
        "deadline":"3feb,2019",
        "status":"processing",
    }]) ; 
    
    return (
        <div>            
            <Alert style={{width:'25rem'}} key='danger' variant='danger'>
             Current Requests : 
           </Alert>
           <br/><br/>
            {
                  requests.map((value , key)=>{
                     return <RequestBodyUtils data={value}/>
                  })  
            }
            </div>
    )
}
