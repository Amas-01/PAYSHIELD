// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFHERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract PayShieldEscrow {
    event PayoutAttempted(address indexed token, address indexed recipient, uint256 amount, bool success);

    function release(address token, address recipient, uint256 amount) external {
        bool success = IFHERC20(token).transfer(recipient, amount);
        emit PayoutAttempted(token, recipient, amount, success);
    }
}
