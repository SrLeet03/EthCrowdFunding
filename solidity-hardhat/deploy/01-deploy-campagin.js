const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { hre } = require("hardhat")

const CAMPAGIN_GOAL = "200"
const MINIMUM_CONTRIBUTION1 = "0.2"
const MINIMUM_CONTRIBUTION2 = "0.2"
const BLOCK_CONFORMATION = 1

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer1, deployer2 } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    const args1 = [
        ethers.utils.parseEther(CAMPAGIN_GOAL),
        ethers.utils.parseEther(MINIMUM_CONTRIBUTION1),
    ]
    const args2 = [
        ethers.utils.parseEther(CAMPAGIN_GOAL),
        ethers.utils.parseEther(MINIMUM_CONTRIBUTION2),
    ]

    log("----------")
    log(`deployer 1 ${deployer1}`)
    log(`deployer 2 ${deployer2}`)
    log("----------")

    const crowdFunding1 = await deploy("CrowdFunding", {
        from: deployer1,
        args: args1,
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })
    const crowdFunding2 = await deploy("CrowdFunding", {
        from: deployer2,
        args: args2,
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })
    log("------------------------------------")
    log(`address of the contract 1 ${crowdFunding1}`)
    log(`address of the contract 2 ${crowdFunding2.address}`)
    log("------------------------------------")

    log("Verifying...")
    await verify(crowdFunding1.address, args1)
    await verify(crowdFunding2.address, args2)
}

module.exports.tags = ["all", "crowdFunding"]
