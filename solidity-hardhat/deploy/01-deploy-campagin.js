const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { hre } = require("hardhat")
const {
    developmentChains,
    networkconfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

const CAMPAGIN_GOAL1 = "200"
const CAMPAGIN_GOAL2 = "500"
const MINIMUM_CONTRIBUTION = "0.2"
const BLOCK_CONFORMATION = VERIFICATION_BLOCK_CONFIRMATIONS

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer1, deployer2 } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args = [
        ethers.utils.parseEther(CAMPAGIN_GOAL1),
        ethers.utils.parseEther(MINIMUM_CONTRIBUTION),
    ]

    log("----------")
    log(`deployer ${deployer2}`)
    log("----------")

    const crowdFunding = await deploy("CrowdFunding", {
        from: deployer2,
        args: args,
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    log("------------------------------------")
    log(`address of the contract ${crowdFunding.address}`)
    log("------------------------------------")

    if (!developmentChains.includes(network.name)) {
        log("Verifying...")
        await verify(crowdFunding.address, args)
    }
}

module.exports.tags = ["all", "crowdFunding"]
