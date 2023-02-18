const { network, ethers } = require("hardhat")
const {
    frontEndContractAddressFile,
    frontEndAbiFile,
} = require("../helper-hardhat-config")
const fs = require("fs")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const crowdFunding = ethers.getContract("CrowdFunding")
    fs.writeFileSync(
        frontEndAbiFile,
        (await crowdFunding).interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const crowdFunding = await ethers.getContract("CrowdFunding")
    const contractAddresses = JSON.parse(
        fs.readFileSync(frontEndContractAddressFile, "utf8")
    )
    const chainId = network.config.chainId.toString()

    if (chainId in contractAddresses) {
        console.log(`contract Address ${crowdFunding.address}`)

        if (!contractAddresses[chainId].includes(crowdFunding.address)) {
            contractAddresses[chainId].push(crowdFunding.address)
        }
    } else {
        console.log(`contract Address ${(await crowdFunding).address}`)
        contractAddresses[chainId] = [crowdFunding.address]
    }
    fs.writeFileSync(
        frontEndContractAddressFile,
        JSON.stringify(contractAddresses)
    )
}

module.exports.tags = ["all", "frontend"]
