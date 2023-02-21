import React from "react"

import Alert from "react-bootstrap/Alert"

import { Button } from "react-bootstrap"
// import { createRequestsForCampaign } from "../../hooks/campaign.js"
import { StakeInRequestUtil } from "../../solidityUtils/Campaign"
import { useSelector } from "react-redux"

export default function RequestBodyUtils({ data }) {
    const profile = useSelector((state) => state.fundr.fundr)

    const handleSubmitRequestAccept = () => {
        const res = StakeInRequestUtil(profile.addr, 1, 1) //Also pass in campaign address
        if (res.status === 200) {
            alert("Your response recorder!")
            return
        } else {
            alert("Failed to record your response ,  msg : ", res.msg)
        }
    }

    const handleSubmitRequestDeny = () => {
        const res = StakeInRequestUtil(profile.addr, 2, 0) //Also pass in campaign address

        if (res.status === 200) {
            alert("Your response recorder!")
            return
        } else {
            alert("Failed to record your response ,  msg : ", res.msg)
        }
    }

    return (
        <div>
            <Alert style={{ width: "35rem" }} key="info" variant="info">
                Status : {data["status"]}
                <>
                    <br />
                </>
                {data["description"]}
                <>
                    <br />
                    <br />
                </>
                amount requested : {data["amount"]} (in eths)
                <>
                    <br />
                </>
                Deadline : {data["deadline"]}
                <>
                    <br />
                </>
                <>
                    <Button
                        variant="success"
                        onClick={handleSubmitRequestAccept}
                    >
                        Approve
                    </Button>{" "}
                    {"    "}{" "}
                    <Button variant="danger" onClick={handleSubmitRequestDeny}>
                        Deny
                    </Button>
                </>
            </Alert>
        </div>
    )
}
