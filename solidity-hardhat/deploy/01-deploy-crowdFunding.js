const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const { hre } = require("hardhat")
const {
    developmentChains,
    networkconfig,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")

const CAMPAGIN_GOAL = ethers.utils.parseEther("1000")
const MINIMUM_CONTRIBUTION = ethers.utils.parseEther("0.01")
const BLOCK_CONFORMATION = VERIFICATION_BLOCK_CONFIRMATIONS

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer1, deployer2 } = await getNamedAccounts()
    const { log, deploy } = deployments
    const chainId = network.config.chainId

    log("----------")
    log(`deployer ${deployer1}`)
    log("----------")

    const library = await deploy("CampaignLib", {
        from: deployer1,
        args: [],
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    const stake = await deploy("Stake", {
        from: deployer1,
        args: [],
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    // const campaign = await deploy("Campaign", {
    //     from: deployer1,
    //     args: [CAMPAGIN_GOAL1, MINIMUM_CONTRIBUTION],
    //     log: true,
    //     waitConfirmation: BLOCK_CONFORMATION,
    // })

    const crowdFunding = await deploy("CrowdFunding", {
        from: deployer1,
        args: [],
        log: true,
        waitConfirmation: BLOCK_CONFORMATION,
    })

    const campaignCreation = await crowdFunding.methods.createCampaign(
        CAMPAGIN_GOAL,
        MINIMUM_CONTRIBUTION
    )

    log("------------------------------------")
    log(`address of the library ${library.address}`)
    log(`address of the stake ${stake.address}`)
    log(`address of the crowdfunding ${crowdFunding.address}`)
    log(`address of deployed campaign ${campaignCreation.address}`)
    log("------------------------------------")

    if (!developmentChains.includes(network.name)) {
        log("Verifying...")
        await verify(library.address, [])
        await verify(stake.address, [])
        await verify(campaignCreation.address, [
            CAMPAGIN_GOAL,
            MINIMUM_CONTRIBUTION,
        ])
        await verify(crowdFunding.address, [])
    }
}

module.exports.tags = ["all", "crowdFunding"]
