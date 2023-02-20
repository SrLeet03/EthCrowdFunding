import { crowdFundingAddresses, crowdFundingAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider
var error, retReq

async function ConnectToContract() {
    // provider = auth.provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        // not provider found
        return { status: 400, msg: "Provider/'Metamask not recoganizer" }
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

    try {
        let accounts = await provider.send("eth_requestAccounts", [])

        let account = accounts[0]

        if (
            address.toString().toUpperCase() ===
            account.toString().toUpperCase()
        ) {
            return {
                status: 400,
                msg: "address does not match with metamask wallet",
            }
        }
        var camapignCreatedEvent

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
        var txReciept = await txResponse.wait(2)
    } catch (e) {
        error = e
    }
    console.log(txReciept)

    if (txReciept.status == 1) {
        retReq = {
            status: 200,
            campaignId: camapignCreatedEvent.campaignId._hex,
        }
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

    return { status: 200, campaignAddress }
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
