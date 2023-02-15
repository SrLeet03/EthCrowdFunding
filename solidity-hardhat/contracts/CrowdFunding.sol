// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "./Campagin.sol";

contract CrowdFunding is Campagin {
    mapping(address => Campagin[]) private s_campagins;
}
