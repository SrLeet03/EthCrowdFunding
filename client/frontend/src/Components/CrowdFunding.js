import { contractAddresses, abi } from "../Constants" // dont export from moralis when using react
// import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
// import { useNotification } from "web3uikit"
import { ethers } from "ethers"
const Moralis = require("moralis").default
require("dotenv").config()

export default function CrowdFunding() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const { chainId } = provider._network.chainId

    console.log(`chainid ${chainId}`)

    const crowdFindingAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null

    console.log(
        `crowdFunding address from deploy output ${crowdFindingAddress}`
    )

    // Usual way

    let contract
    const connectContract = async () => {
        contract = new ethers.Contract(crowdFindingAddress, abi, provider)
        console.log(`The connected address ${contract.address}`)
    }

    const CreateCampaign = async (campaignGoal, minContribution) => {
        const txResponse = await contract.createCampaign(
            campaignGoal,
            minContribution
        )
        const txReciept = await txResponse.wait(6)
    }

    const GetCampaign = async (owner, campaignId) => {
        const campaignAddress = await contract.getCampaign(owner, campaignId)
        return campaignAddress
    }

    const GetAllCampaignOfOwner = async (owner) => {
        await contract.getAllCampaignOfOwner(owner)
    }

    //Using moralis
    //
    // const [campaignGoal, setCampaignGoal] = useState(0)
    // const [minContribution, setMinContribution] = useState(0)
    // const args = [campaignGoal, minContribution]

    // const CreateCampaign = (args) => {
    //     const { runContractFunction: createContract } = useWeb3Contract({
    //         abi: abi,
    //         contractAddress: crowdFindingAddress,
    //         functionName: "createContract",
    //         params: {
    //             args,
    //         },
    //     })
    //     // console.log(`contract transaction ${crowdFindingAddress}`)
    // }
}

await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
})
