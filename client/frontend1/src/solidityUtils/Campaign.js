import { campaignAbi } from "../Constants/index.js"
import { ethers } from "ethers"

let contract, connectedContract, signer, provider

var error, retReq

async function ConnectToContract(campaignAddress) {
    window.ethereum.enable()
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider) {
        //return { status: 400, msg: "Provider/MetaMask was not recoganized" }
    }
    signer = provider.getSigner()

    contract = new ethers.Contract(campaignAddress, campaignAbi, provider)
    connectedContract = await contract.connect(signer)
}

const ContributeUtil = async (campaignAddress, ethValueFromContributer) => {
    ConnectToContract(campaignAddress)

    let FundTransferedEvent, txReciept

    try {
        await contract.on(
            "FundTransfered",
            (contributerAddress, fundedAmount) => {
                FundTransferedEvent = {
                    contributerAddress: contributerAddress,
                    fundedAmount: fundedAmount,
                }
                console.log(FundTransferedEvent)
            }
        )
        const txResponse = await connectedContract.contribute({
            value: ethers.utils.parseEther(ethValueFromContributer),
        })

        txReciept = await txResponse.wait(2)
        console.log("transection Recipt -------------", txReciept)
    } catch (e) {
        error = e
    }
    if (txReciept.status == 1) {
        retReq = {
            status: 200,
            donatedAmount: FundTransferedEvent.fundedAmount,
        }
    } else {
        retReq = { status: 400, msg: error }
    }

    return retReq
}

const WithdrawUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)
    let FundWithdrawedEvent, txReciept

    try {
        await contract.on("FundWithdrawed", (amount) => {
            FundWithdrawedEvent = {
                transferedAmount: amount,
            }
        })
        const txResponse = await connectedContract.withdraw(requestId)
        txReciept = await txResponse.wait(2)
    } catch (e) {
        error = e
    }

    console.log(`FundWithdrawed ${FundWithdrawedEvent}`)

    if (txReciept.status == 1) {
        retReq = { status: 200, withdrawedAmount: FundWithdrawedEvent.amount }
    } else {
        retReq = { statusbar: 400, msg: error }
    }

    return retReq
}

const MakeRequestUtil = async (
    campaignAddress,
    withdrawAmount,
    durationOfRequestInHours
) => {
    ConnectToContract(campaignAddress)

    console.log(`contract address ${campaignAddress}`)

    let durationOfRequest = Math.ceil(durationOfRequestInHours * 60),
        txReciept,
        RequestApplied

    try {
        await contract.on("RequestApplied", (requestIndex) => {
            RequestApplied = requestIndex.toNumber()

            console.log(RequestApplied)
        })
        let txResponse = await connectedContract.makeRequest(
            durationOfRequest,
            withdrawAmount
        )

        txReciept = await txResponse.wait(2)
        console.log("----------------")
        console.log(txResponse)
        console.log("----------------")
        console.log(txReciept)
    } catch (e) {
        error = e
    }

    if (txReciept.status == 1) {
        console.log("passing Request applied")
        retReq = { status: 200, requestId: RequestApplied }
    } else {
        console.log("Request declinded", error)
        retReq = { status: 400, msg: error }
    }

    return retReq
}

const StakeInRequestUtil = async (campaignAddress, requestId, voteValue) => {
    ConnectToContract(campaignAddress)

    let txResponse, txReciept

    try {
        if (voteValue === 1) {
            // Accpeterd vote
            txResponse = await connectedContract.stakeInRequest(requestId, 0)
        } else {
            txResponse = await connectedContract.stakeInRequest(requestId, 1)
        }

        txReciept = await txResponse.wait(2)
        console.log("----------------")
        console.log(txResponse)
        console.log("----------------")
        console.log(txReciept)
    } catch (e) {
        error = e
    }

    if (txReciept.status == 1) {
        retReq = { status: 200 }
    } else {
        retReq = { status: 400, msg: error }
    }
    return retReq
}

const GetRequestInfoUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)

    const requestInfo = await connectedContract.getRequestInfo(requestId)

    console.log(`Request Info ${requestInfo}, Data type is ${typeof requestId}`)
    return { requestInfo }
}

const GetRequestStatusUtil = async (campaignAddress, requestId) => {
    ConnectToContract(campaignAddress)

    const requestStatus = await connectedContract.getRequestStatus()

    console.log(`request status ${requestStatus}`)
    return requestStatus._hex
}

export {
    ContributeUtil,
    WithdrawUtil,
    MakeRequestUtil,
    StakeInRequestUtil,
    GetRequestInfoUtil,
    GetRequestStatusUtil,
}
