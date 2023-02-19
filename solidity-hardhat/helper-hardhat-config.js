const { ethers } = require("hardhat")

const networkconfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "georli",
    },
    5001: {
        name: "mantle",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const crowdFundingAddressFile =
    "../client/frontend1/src/constants/crowdFundingAddress.json"
const crowdFundingAbiFile =
    "../client/frontend1/src/constants/crowdFundingAbi.json"
const campaignAbiFile = "../client/frontend1/src/constants/campaignAbi.json"

module.exports = {
    networkconfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    crowdFundingAddressFile,
    crowdFundingAbiFile,
    campaignAbiFile,
}
