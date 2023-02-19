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
    //return { status: 400 }
    // }
    // console.log(`address ${address} accounts ${JSON.stringify(account)}`)
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
            console.log(JSON.stringify(camapignCreatedEvent, null, 4))
        }
    )

    const txResponse = await connectedContract.createCampaign(
        campaignGoal,
        minContribution
    )
    const txReciept = await txResponse.wait(2)
    console.log(txReciept)
    console.log("---------------------")
    console.log(`status${txReciept.status}`)

    return {
        status: txReciept.status,
        address: camapignCreatedEvent.campaignAddress,
    }

    // const connectContract = await contract.connect(signer)

    // const txResponse = await connectContract.createCampaign(
    //     2,
    //     2
    // )
    // const txReciept = await txResponse.wait(6) ;
    // console.log(txReciept) ;
}

async function GetCampaign(owner, campaignId) {
    const campaignAddress = await connectedContract.getCampaign(
        owner,
        campaignId
    )
    console.log(campaignAddress)
    return campaignAddress
}

const GetAllCampaignOfOwner = async (owner) => {
    await connectedContract.getAllCampaignOfOwner(owner)
}

const GetTotalCampaignCreated = async () => {
    const totalCampaign = await connectedContract.getTotalCampaign()
    return totalCampaign
}

export {
    ConnectToContract,
    CreateCampaignUtil,
    GetCampaign,
    GetAllCampaignOfOwner,
    GetTotalCampaignCreated,
}

// getConnection() ;

// export default function CrowdFunding() {
//     const [connectedContract, setContract] = useState(undefined)
//     const [accounts, setAccounts] = useState(undefined)

//     useEffect(() => {
//         const init = async () => {
//             let provider
//             try {
//                 provider = auth.provider
//                 const connected = await auth.isLoggedIn()
//                 console.log({ connected })
//             } catch (e) {
//                 // Handle exception case
//             }

//             const signer = provider.getSigner()
//             const accounts = await ethers.getAccount()
//             const { chainId } = provider.getNetwork()

//             const crowdFindingAddress =
//                 chainId in crowdFundingAddresses
//                     ? crowdFundingAddresses[chainId][0]
//                     : null

//             const contract = new ethers.Contract(
//                 crowdFindingAddress,
//                 crowdFundingAbi,
//                 provider
//             )
//             const connectContract = await contract.connect(signer)

//             setContract(connectContract)
//             setAccounts(accounts)

//             try {
//             } catch (error) {
//                 alert(
//                     `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`
//                 )
//                 console.error(error)
//             }
//         }
//         init()
//     }, [])

//     const CreateCampaign = async (campaignGoal, minContribution) => {
//         const txResponse = await connectedContract.createCampaign(
//             campaignGoal,
//             minContribution
//         )
//         const txReciept = await txResponse.wait(6)
//     }

//     const GetCampaign = async (owner, campaignId) => {
//         const campaignAddress = await connectedContract.getCampaign(
//             owner,
//             campaignId
//         )
//         return campaignAddress
//     }

//     const GetAllCampaignOfOwner = async (owner) => {
//         await connectedContract.getAllCampaignOfOwner(owner)
//     }

//     const GetTotalCampaignCreated = async () => {
//         const totalCampaign = await connectedContract.getTotalCampaign()
//         return totalCampaign
//     }
// }

// CreateCampaign().then((src) => {

//     console.log(src)
// })
