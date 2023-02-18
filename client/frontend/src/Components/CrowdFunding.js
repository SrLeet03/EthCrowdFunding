import { crowdFundingAddresses, crowdFundingAbi } from "../Constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
require("dotenv").config()

export default function CrowdFunding() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const { chainId } = provider._network.chainId

    const crowdFindingAddress =
        chainId in crowdFundingAddresses
            ? crowdFundingAddresses[chainId][0]
            : null

    let contract, crowdFunding
    const connectContract = async () => {
        contract = new ethers.Contract(
            crowdFindingAddress,
            crowdFundingAbi,
            provider
        )
    }

    const CreateCampaign = async (campaignGoal, minContribution) => {
        crowdFunding = await contract.connect(signer)

        const txResponse = await crowdFunding.createCampaign(
            campaignGoal,
            minContribution
        )
        const txReciept = await txResponse.wait(6)
    }

    const GetCampaign = async (owner, campaignId) => {
        crowdFunding = await contract.connect(signer)

        const campaignAddress = await crowdFunding.getCampaign(
            owner,
            campaignId
        )
        return campaignAddress
    }

    const GetAllCampaignOfOwner = async (owner) => {
        crowdFunding = await contract.connect(signer)

        await crowdFunding.getAllCampaignOfOwner(owner)
    }

    const GetTotalCampaignCreated = async () => {
        crowdFunding = await contract.connect(signer)

        const totalCampaign = await crowdFunding.getTotalCampaign()
        return totalCampaign
    }
}
