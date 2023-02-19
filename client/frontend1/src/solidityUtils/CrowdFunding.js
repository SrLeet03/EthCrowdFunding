import { crowdFundingAddresses, crowdFundingAbi } from "../Constants/index.js"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

async function getConnection() {
    // let provider ;

    // provider = auth.provider
    console.log("in getConnection")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(`provider ${provider}`)
    const signer = provider.getSigner()
    // const { chainId } = provider.getNetwork()
    const chainId = 5001 // Mantle chain ID

    const crowdFindingAddress =
        chainId in crowdFundingAddresses
            ? crowdFundingAddresses[chainId][0]
            : null
    console.log(`crowdFunding ${crowdFindingAddress}`)
    const contract = new ethers.Contract(
        crowdFindingAddress,
        crowdFundingAbi,
        provider
    )

    contract.on(
        "CampaignCreated",
        (ownerAddress, campaignId, campaignAddress) => {
            let camapignCreatedEvent = {
                owner: ownerAddress,
                campaignId: campaignId,
                campaignAddress: campaignAddress,
            }
            console.log(JSON.stringify(camapignCreatedEvent, null, 4))
        }
    )

    const connectContract = await contract.connect(signer)

    const txResponse = await connectContract.createCampaign(2, 2)
    const txReciept = await txResponse.wait(6)
    console.log(txReciept)
    // const connectContract = await contract.connect(signer)

    // const txResponse = await connectContract.createCampaign(
    //     2,
    //     2
    // )
    // const txReciept = await txResponse.wait(6) ;
    // console.log(txReciept) ;
}

export { getConnection }

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
