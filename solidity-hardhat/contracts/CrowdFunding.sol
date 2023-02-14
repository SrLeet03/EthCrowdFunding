// // SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./Stake.sol";
import "./Library.sol";

error Campagin__SendMinFund();
error Campagin__NotOwner();
error Campagin__NotEnoughToWithdraw();
error Campagin__RequestIsUnderProcess();
error Campagin__RequestRejected();
error CrowdFunding__RequestRejected();

contract CrowdFunding {
    mapping(address => uint256) public s_contributerFund;
    uint256 private immutable i_campaginGoal;
    uint256 private immutable i_minContribution;
    uint256 private s_TotalFunded;
    address private s_owner;
    Stake[] private s_requestes;
    address[] private s_contributers;

    event FundWithdrawed(uint256 amountWithdrawed);
    event OwnershipTransfered(address from, address to);
    event FundTransfered(address from, uint256 fundedAmount);
    event RequestApplied(Stake request);

    constructor(uint256 campaginGoal, uint256 minContribution) {
        i_campaginGoal = campaginGoal;
        i_minContribution = minContribution;
        s_owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != s_owner) {
            revert Campagin__NotOwner();
        }
        _;
    }

    modifier permissionIssued(uint256 requestIndex) {
        if (
            s_requestes[requestIndex].getPermission() ==
            withdrawLib.withdrawPermission.PROCESSING
        ) {
            revert Campagin__RequestIsUnderProcess();
        }
        if (
            s_requestes[requestIndex].getPermission() ==
            withdrawLib.withdrawPermission.REJECTED
        ) {
            revert Campagin__RequestRejected();
        }
        _;
    }

    function contribute() public payable {
        if (msg.value < i_minContribution) {
            revert Campagin__SendMinFund();
        }
        (bool send, ) = address(this).call{value: msg.value}("");

        emit FundTransfered(msg.sender, msg.value);

        s_contributerFund[msg.sender] += msg.value;
        s_TotalFunded += msg.value;
        s_contributers.push(msg.sender);
    }

    // function withdraw() public payable onlyOwner {
    //     if (address(this).balance <= 0) {
    //         revert Campagin__NotEnoughToWithdraw();
    //     }
    //     uint256 withdrawAmount = address(this).balance;
    //     (bool sent, ) = s_owner.call{value: address(this).balance}("");
    //     emit FundWithdrawed(withdrawAmount);
    // }

    function withdraw(
        uint256 requestIndex
    ) public payable onlyOwner permissionIssued(requestIndex) {
        uint256 amount = s_requestes[requestIndex].getRequestedAmount();
        if (address(this).balance < amount) {
            revert Campagin__NotEnoughToWithdraw();
        }
        (bool sent, ) = s_owner.call{value: amount}("");
        s_requestes[requestIndex].setRecieved();
        emit FundWithdrawed(amount);
    }

    function makeRequest(
        uint256 durationOfRequest,
        uint256 withdrawAmount,
        uint256 minContributionToVote
    ) public {
        // Stake happens here

        Stake request = new Stake(
            address(this),
            durationOfRequest,
            withdrawAmount,
            minContributionToVote
        );
        s_requestes.push(request);
        emit RequestApplied(request);
    }

    function getContributors() public view returns (address[] memory) {
        return s_contributers;
    }

    function getTotalFund() public view returns (uint256) {
        return s_TotalFunded;
    }

    function getFundByAddress(
        address contributer
    ) public view returns (uint256) {
        return s_contributerFund[contributer];
    }

    function getOwnerAddress() public view returns (address) {
        return s_owner;
    }

    function transferOwnerShip(address to) public onlyOwner {
        s_owner = to;
        emit OwnershipTransfered(msg.sender, to);
    }

    function getCurrentFundInContract() public view returns (uint256) {
        return address(this).balance;
    }

    function getContributorsFundAmount(
        address contributerAddress
    ) public view returns (uint256) {
        return s_contributerFund[contributerAddress];
    }
}
