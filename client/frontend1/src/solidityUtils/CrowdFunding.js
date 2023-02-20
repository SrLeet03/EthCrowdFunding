import { crowdFundingAddresses, crowdFundingAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider
var error, retReq

async function ConnectToContract() {
    // provider = auth.provider

    console.log("Calling connect contract")
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    // if (!provider) {
    // not provider found
    //return { status: 400, msg: "Provider/'Metamask not recoganizer" }
    // }
    signer = provider.getSigner()
    // const { chainId } = provider.getNetwork()
    const chainId = 5 // Mantle chain ID

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
    await ConnectToContract()

    let txReciept, camapignCreatedEvent

    try {
        let accounts = await provider.send("eth_requestAccounts", [])

        let account = accounts[0]

        // if (
        //     address.toString().toUpperCase() ===
        //     account.toString().toUpperCase()
        // ) {
        //     return {
        //         status: 400,
        //         msg: "address does not match with metamask wallet",
        //     }
        // }

        await contract.on(
            "CampaignCreated",
            (ownerAddress, campaignIndex, campaignAddress) => {
                camapignCreatedEvent = {
                    owner: ownerAddress,
                    campaignId: campaignIndex.toNumber(),
                    campaignAddress: campaignAddress,
                }
                console.log(camapignCreatedEvent)
            }
        )
        const txResponse = await connectedContract.createCampaign(
            campaignGoal,
            minContribution
        )

        console.log(txResponse)

        txReciept = await txResponse.wait(2)

        console.log(txReciept)
    } catch (e) {
        console.log(error)
        error = e
    }
    // console.log(txReciept)

    if (txReciept.status == 1) {
        console.log(camapignCreatedEvent)
        retReq = {
            status: 200,
            campaignId: camapignCreatedEvent.campaignId,
        }
        console.log(retReq)
    } else {
        retReq = { status: 400, msg: error }
    }

    return retReq
}

async function GetCampaign(owner, campaignId) {
    const campaignAddress = await connectedContract.getCampaign(
        owner,
        campaignId
    )

    const campaignAddressString = campaignAddress.toHexString()

    return { status: 200, campaignAddressString }
}

const GetAllCampaignOfOwner = async (owner) => {
    await connectedContract.getAllCampaignOfOwner(owner)
}

const GetTotalCampaignCreated = async () => {
    var totalCampaign = await connectedContract.getTotalCampaign()
    totalCampaign = totalCampaign.toNumber()
    return totalCampaign
}

export {
    ConnectToContract,
    CreateCampaignUtil,
    GetCampaign,
    GetAllCampaignOfOwner,
    GetTotalCampaignCreated,
}
