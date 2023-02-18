import { useEffect, useState } from "react"
import { ethers } from "ethers"
import "./CrowdFunding"
import CrowdFunding from "./CrowdFunding"

export default function Campaign() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const { chainId } = provider.getNetwork()

    let contract
    const getCampaignAddress = async(owner, campaignId) =>{
        // get deployed address from CrowdFunding.js
        contract = 

    }

    const Contribute
}
