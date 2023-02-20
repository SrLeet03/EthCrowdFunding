import { crowdFundingAddresses, crowdFundingAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider

async function ConnectToContract() {
    // provider = auth.provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        // not provider found
        // return { status: 400 }
    }
    signer = provider.getSigner()
    // const { chainId } = provider.getNetwork()
    const chainId = 5001 // Mantle chain ID

    const crowdFindingAddress =
        chainId in crowdFundingAddresses
            ? crowdFundingAddresses[chainId][0]
            : null
    contract = new ethers.Contract(
        crowdFindingAddress,
        crowdFundingAbi,
        provider
    )
    connectedContract = await contract.connect(signer)
}

async function CreateCampaignUtil(campaignGoal, address, minContribution = 1) {
    ConnectToContract()

    let accounts = await provider.send("eth_requestAccounts", [])

    // console.log(`accounts ${JSON.stringify(accounts)}`)
    let account = accounts[0]

    // if (address.toUpperCase() === account.toUpperCase()) {
    //     return { status: 400 }
    // }
    let camapignCreatedEvent
    // Listening to event
    contract.on(
        "CampaignCreated",
        (ownerAddress, campaignId, campaignAddress) => {
            camapignCreatedEvent = {
                owner: ownerAddress,
                campaignId: campaignId,
                campaignAddress: campaignAddress,
            }
            console.log(camapignCreatedEvent)
        }
    )

    const txResponse = await connectedContract.createCampaign(
        campaignGoal,
        minContribution
    )
    const txReciept = await txResponse.wait(2)
    // console.log(txReciept)

    // console.log("---------------------")
    // console.log(`status${txReciept.status}`)

    // console.log("---------------------")
    // const contract_result = await GetTotalCampaignCreated()
    // console.log("---------------------")

    return {
        status: txReciept.status == 1 ? 200 : 400,
        address: camapignCreatedEvent.campaignAddress,
    }
}

async function GetCampaign(owner, campaignId) {
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
    var totalCampaign = await connectedContract.getTotalCampaign()
    console.log(`total campaign ${totalCampaign._hex}`)
    return totalCampaign._hex
}

export {
    ConnectToContract,
    CreateCampaignUtil,
    GetCampaign,
    GetAllCampaignOfOwner,
    GetTotalCampaignCreated,
}
