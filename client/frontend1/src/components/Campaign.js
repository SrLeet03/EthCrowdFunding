import { useEffect, useState } from "react"
import { campaignAbi } from "../Constants"
import { ethers } from "ethers"

export default function Campaign(campaignAddress) {
    const [connectedContract, setContract] = useState(undefined)
    const [accounts, setAccounts] = useState(undefined)

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const accounts = await ethers.getAccount()
            const { chainId } = provider.getNetwork()

            const contract = new ethers.Contract(
                campaignAddress,
                campaignAbi,
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

    // ethers that the contributer decide to send
    // Call this function when contributing the to a campaign
    //
    const Contribute = async (ethValueFromContributer) => {
        let txResponse = await connectedContract.contribute({
            value: ethers.utils.parseEther(ethValueFromContributer),
        })
        const txReciept = await txResponse.wait(6)

        console.log(`transection Recipt ${txReciept}`)
    }

    const Withdraw = async (requestId) => {
        let txResponse = await connectedContract.withdraw()
        const txReciept = await txResponse.wait(6)

        console.log(`transection Recipt ${txReciept}`)
    }
}
