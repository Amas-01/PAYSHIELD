// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayShieldPool {
    mapping(address employer => uint256 balance) public employerBalances;

    event PoolFunded(address indexed employer, uint256 amount);
    event PoolDebited(address indexed employer, uint256 amount);

    function fund() external payable {
        require(msg.value > 0, "amount must be > 0");
        employerBalances[msg.sender] += msg.value;
        emit PoolFunded(msg.sender, msg.value);
    }

    function debitEmployer(address employer, uint256 amount) external {
        require(employerBalances[employer] >= amount, "insufficient balance");
        employerBalances[employer] -= amount;
        emit PoolDebited(employer, amount);
    }
}
