// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./Library.sol";

// TO DO
//
// Start the stake event
// contributers can vote
// End the event
// Send the result and withdraw if needed

contract Stake {
    enum vote {
        ACCEPT,
        REJECT,
        NEUTRAL
    }

    mapping(address => bool) private s_contributersVoted;
    address private immutable i_campaginAddress;
    uint256 private immutable i_minContributionToVote;
    uint256 private s_durationOfRequest;
    uint256 private s_requestedAmount;
    uint256 private s_requestedTime;

    uint256 private s_totalNeutralVote;
    uint256 private s_totalAcceptVote;
    uint256 private s_totalRejectVote;

    withdrawLib.withdrawPermission private s_permission;

    bool private s_recieved;

    constructor(
        address campaginAddress,
        uint256 duration,
        uint256 requestedAmount,
        uint256 minContributionToVote
    ) {
        i_campaginAddress = campaginAddress;
        i_minContributionToVote = minContributionToVote;
        s_durationOfRequest = duration;
        s_permission = withdrawLib.withdrawPermission.PROCESSING;
        s_requestedAmount = requestedAmount;
        s_requestedTime = block.timestamp;
        s_recieved = false;
    }

    modifier deadlineReached(bool requireReached) {
        uint256 timeRemaining = timeLeft();
        if (requireReached) {
            require(timeRemaining == 0, "Deadline is not reached yet");
        } else {
            require(timeRemaining > 0, "Deadline is already reached");
        }
        _;
    }

    // Add a modifier if all the contributers voted

    function stake(vote myVote) public deadlineReached(false) {
        if (myVote == vote.ACCEPT) {
            s_totalAcceptVote += 1;
        } else if (myVote == vote.NEUTRAL) {
            s_totalNeutralVote += 1;
        } else {
            s_totalRejectVote;
        }
    }

    // Make a function that gets call for chainlink

    function result() public deadlineReached(true) {
        if (s_totalAcceptVote > s_totalRejectVote) {
            s_permission = withdrawLib.withdrawPermission.ACCEPTED;
        } else {
            s_permission = withdrawLib.withdrawPermission.REJECTED;
        }
    }

    function timeLeft() public view returns (uint256 timeleft) {
        uint256 deadline = s_requestedTime + s_durationOfRequest;
        if (block.timestamp >= deadline) {
            return 0;
        } else {
            return deadline - block.timestamp;
        }
    }

    function getPermission()
        public
        view
        returns (withdrawLib.withdrawPermission)
    {
        return s_permission;
    }

    function getRequestedAmount() public view returns (uint256) {
        return s_requestedAmount;
    }

    function setRecieved() public {
        s_recieved = true;
    }
}
