// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

library withdrawLib {
    enum withdrawPermission {
        PROCESSING,
        ACCEPTED,
        REJECTED
    }
}
