import { campaignAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider

async function ConnectToContract(campaignAddress) {
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        return { status: 400 }
    }
    signer = provider.getSigner()

    contract = new ethers.Contract(campaignAddress, campaignAbi, provider)
    connectedContract = await contract.connect(signer)
}

const ContributeUtil = async (campaignAddress, ethValueFromContributer) => {
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

const WithdrawUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)
    let FundWithdrawedEvent

    let txResponse = await connectedContract.withdraw(requestId)
    const txReciept = await txResponse.wait(2)

    contract.on("FundWithdrawed", (amount) => {
        FundWithdrawedEvent = {
            transferedAmount: amount,
        }
    })

    console.log(`FundWithdrawed ${FundWithdrawedEvent}`)

    return {
        status: txReciept.status,
        transferedAmount: FundWithdrawedEvent.transferedAmount,
    }
}

const MakeRequestUtil = async (
    campaignAddress,
    durationOfRequest,
    withdrawAmount
) => {
    ConnectToContract(campaignAddress)
    let txResponse = await connectedContract.makeRequest(
        durationOfRequest,
        withdrawAmount
    )

    const txReciept = await txResponse.wait(2)

    return {
        status: txReciept.status == 1 ? 200 : 400,
    }
}

const StakeInRequestUtil = async (campaignAddress, requestId, voteValue) => {
    ConnectToContract(campaignAddress)
    let txResponse
    if (voteValue === 1) {
        txResponse = await connectedContract.stakeInRequest(requestId, 0)
    } else {
        txResponse = await connectedContract.stakeInRequest(requestId, 1)
    }

    const txReciept = await txResponse.wait(2)

    return { status: txReciept.status == 1 ? 200 : 400 }
}

export { ContributeUtil, WithdrawUtil, MakeRequestUtil, StakeInRequestUtil }
