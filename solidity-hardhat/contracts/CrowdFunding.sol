// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./Campaign.sol";

contract CrowdFunding {
    mapping(address => Campaign[]) private s_campaigns;
    address[] private s_campaignCreaters;

    event CampaignCreated(
        address campaignCreator,
        uint256 campaginId,
        address campaignAddress
    );

    function createCampaign(
        uint256 _campaignGoal,
        uint256 _minContribution
    ) public {
        Campaign campaign = new Campaign(_campaignGoal, _minContribution);
        campaign.transferOwnerShip(msg.sender);

        s_campaigns[msg.sender].push(campaign);
        s_campaignCreaters.push(msg.sender);

        emit CampaignCreated(
            msg.sender,
            s_campaigns[msg.sender].length,
            address(campaign)
        );
    }

    function getCampaign(
        address owner,
        uint256 campaignId
    ) public view returns (address) {
        return address(s_campaigns[owner][campaignId]);
    }

    function getAllCampaignOfOwner(
        address owner
    ) public view returns (address[] memory) {
        uint256 totalCampaign = s_campaigns[owner].length;
        address[] memory campaigns = new address[](totalCampaign);
        for (uint i = 0; i < totalCampaign; i++) {
            campaigns[i] = address(s_campaigns[owner][i]);
        }
        return campaigns;
    }

    // Implement a function to get s_campagins
    // function getAllCampaign() public view returns () {

    // }
}
