import { campaignAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider

async function ConnectToContract(campaignAddress) {
    // provider = auth.provider
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        // not provider found
        return { status: 400 }
    }
    signer = provider.getSigner()

    contract = new ethers.Contract(campaignAddress, campaignAbi, provider)
    connectedContract = await contract.connect(signer)
}

const Contribute = async (campaignAddress, ethValueFromContributer) => {
    ConnectToContract(campaignAddress)

    let FundTransferedEvent

    let txResponse = await connectedContract.contribute({
        value: ethers.utils.parseEther(ethValueFromContributer),
    })
    contract.on("FundTransfered", (contributerAddress, fundedAmount) => {
        FundTransferedEvent = {
            contributerAddress: contributerAddress,
            fundedAmount: fundedAmount,
        }
        console.log(JSON.stringify(FundTransferedEvent, null, 4))
    })

    const txReciept = await txResponse.wait(2)

    console.log(`transection Recipt ${txReciept}`)

    return {
        status: txReciept.status,
        fundedAmount: FundTransferedEvent.fundedAmount,
    }
}

const Withdraw = async (requestId) => {
    let txResponse = await connectedContract.withdraw()
    const txReciept = await txResponse.wait(6)

    console.log(`transection Recipt ${txReciept}`)
}

export { Contribute, Withdraw }
