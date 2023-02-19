import { crowdFundingAddresses, crowdFundingAbi } from "../Constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { AuthProvider, CHAIN } from "@arcana/auth"
import { ArcanaAppAddress } from "../helper/constants"

const appAddress = ArcanaAppAddress

const auth = new AuthProvider(`${appAddress}`, {
    //required
    network: "testnet", //defaults to 'testnet'
    position: "left", //defaults to right
    theme: "light", //defaults to dark
    alwaysVisible: false, //defaults to true which is Full UI mode
    chainConfig: {
        chainId: CHAIN.POLYGON_MAINNET, //defaults to CHAIN.ETHEREUM_MAINNET
        rpcUrl: "https://polygon-rpc.com", //defaults to 'https://rpc.ankr.com/eth'
    },
})

export default function CrowdFunding() {
    const [connectedContract, setContract] = useState(undefined)
    const [accounts, setAccounts] = useState(undefined)

    useEffect(() => {
        const init = async () => {
            let provider
            try {
                provider = auth.provider
                const connected = await auth.isLoggedIn()
                console.log({ connected })
            } catch (e) {
                // Handle exception case
            }
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

// CreateCampaign().then((src) => {

//     console.log(src)
// })
