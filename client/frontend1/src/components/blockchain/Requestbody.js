import React  , {useState  , useEffect}from 'react'

import './css/profile.css'

import Alert from 'react-bootstrap/Alert';
import RequestBodyUtils from './RequestBodyUtils.js';
import { getAllRequestsForCampaign , createRequestsForCampaign } from '../../hooks/campaign.js';

export default function FundProfile({ info }) {

    const [req, setReq] = useState({
        rid: null,
        cid: null,
        info: null,
        amount: null,
    });

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
    
    useEffect(() => {

        getAllRequestsForCampaign().then((res)=>{
             if( res.data !== undefined && res.data.length !==0 ){
                setRequests(res.data) ;
             }
        }).catch((err)=>{
            console.log(err);
        })
    }, []);
    
    const handleChange = (e) =>{
        const { name, value } = e.target
        setReq((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit =async () =>{
       const res = await createRequestsForCampaign(req.cid , req.rid , req.info,req.amount) ;
       if(res.status === 200){
          alert("request added") ;
          return ;
       }
       
       alert("falied to add request!");

    }
    return (
        <div>            
            <Alert style={{width:'25rem'}} key='danger' variant='danger'>
             Current Requests : 
           </Alert>

           <input
                        name="info"
                        value={req.info}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter info"
            />

            <input
                        name="amount"
                        value={req.amount}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter amount"
            />

           <button onClick={handleSubmit} >Create Request</button>
           <br/><br/>
            {
                  requests.map((value , key)=>{
                     return <RequestBodyUtils data={value}/>
                  })  
            }
            </div>
    )
}
