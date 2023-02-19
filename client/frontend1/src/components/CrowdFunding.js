import { crowdFundingAddresses, crowdFundingAbi } from "../Constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { AuthProvider, CHAIN } from "@arcana/auth"

export default function CrowdFunding() {
    const auth = AuthProvider.getProvider()
    try {
    } catch {}
    const [connectedContract, setContract] = useState(undefined)
    const [accounts, setAccounts] = useState(undefined)

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const accounts = await ethers.getAccount()
            const { chainId } = provider.getNetwork()

            const crowdFindingAddress =
                chainId in crowdFundingAddresses
                    ? crowdFundingAddresses[chainId][0]
                    : null

            const contract = new ethers.Contract(
                crowdFindingAddress,
                crowdFundingAbi,
                provider
            )
            const connectContract = await contract.connect(signer)

            setContract(connectContract)
            setAccounts(accounts)

            try {
            } catch (error) {
                alert(
                    `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`
                )
                console.error(error)
            }
        }
        init()
    }, [])

    const CreateCampaign = async (campaignGoal, minContribution) => {
        const txResponse = await connectedContract.createCampaign(
            campaignGoal,
            minContribution
        )
        const txReciept = await txResponse.wait(6)
    }

    const GetCampaign = async (owner, campaignId) => {
        const campaignAddress = await connectedContract.getCampaign(
            owner,
            campaignId
        )
        return campaignAddress
    }

    const GetAllCampaignOfOwner = async (owner) => {
        await connectedContract.getAllCampaignOfOwner(owner)
    }

    const GetTotalCampaignCreated = async () => {
        const totalCampaign = await connectedContract.getTotalCampaign()
        return totalCampaign
    }
}
