import React from 'react'

import './css/profile.css'

export default function FundProfile({ info }) {
    return (
        <div>

            
                    <h1>Current Requests : </h1>
                    <div className="job-body">
                        
                       
                        <div className="details">
                            <p className="job-payrange"><strong>Pay</strong>: $13 to $17.50/hour</p>
                            <p className="date"><strong>Posted</strong>: <span itemprop="datePosted">04/29/2014</span></p>
                            <p className="job-status"><strong>Job Status</strong>: <span itemprop="employmentType">Full Time, Part Time</span></p>
                        </div>

                    </div>

                </div>
            
        
    )
}
