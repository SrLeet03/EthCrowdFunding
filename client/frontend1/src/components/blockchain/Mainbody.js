import React , {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'

import './css/profile.css'

export default function FundProfile({ info }) {

     
    
    const profile = useSelector((state) => state.fundr.fundr)

  //  console.log(profile);

    return (
        <div>

            
                    <h1>{profile.title}</h1>
                    <div className="job-body">
                        
                       
                        <ul>
                            <li>Dear friends,</li>
                            <li>Currently, I am sustaining using some maintenance drugs until my
                                 CarT treatment can start.</li>
                            <li>Please share my case with more of your contacts.</li>
                        </ul>
                        <h2>Important Notes</h2>
                        <p>We look to positively impact the lives we touch by making a difference each day. Change drives our business each and every day and our culture allows us to manage and embrace change by establishing core values:</p>
                        <div className="details">
                            <p className="job-payrange"><strong>Amount :</strong>{profile.amount} INR</p>
                            <p className="date"><strong>Posted</strong>: <span itemprop="datePosted">{profile.time},{profile.date}</span></p>
                            <p className="job-status"><strong>Fundraiser Category</strong>: <span itemprop="employmentType">{profile.tag}</span></p>
                        </div>

                    </div>

                </div>
            
        
    )
}
