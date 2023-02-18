import { useEffect, useState } from "react"
import { campaignAbi } from "../Constants"
import { ethers } from "ethers"

export default function Campaign(campaignAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const { chainId } = provider.getNetwork()

    let contract

    // ethers that the contributer decide to send

    contract = new ethers.Contract(campaignAddress, campaignAbi, provider)

    const Contribute = async (ethValueFromContributer) => {
        const connectedContract = await contract.connect(signer)

        let txResponse = await connectedContract.contribute({
            value: ethers.utils.parseEther(ethValueFromContributer),
        })
        const txReciept = await txResponse.wait(6)

        console.log(`transection Recipt ${txReciept}`)
    }

    const Withdraw = async (requestId) => {}
}
