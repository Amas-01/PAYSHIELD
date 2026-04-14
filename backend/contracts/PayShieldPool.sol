// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IFHERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract PayShieldPool {
    address public owner;
    address public escrow;
    IFHERC20 public immutable usdc;

    mapping(address employer => uint256 balance) public employerBalances;

    event PoolFunded(address indexed employer, uint256 amount);
    event PoolPayout(address indexed employer, address indexed recipient, uint256 amount, bool success);
    event EscrowUpdated(address indexed escrowAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    modifier onlyEscrow() {
        require(msg.sender == escrow, "only escrow");
        _;
    }

    constructor(address usdcAddress) {
        require(usdcAddress != address(0), "invalid token");
        owner = msg.sender;
        usdc = IFHERC20(usdcAddress);
    }

    function setEscrow(address escrowAddress) external onlyOwner {
        require(escrowAddress != address(0), "invalid escrow");
        escrow = escrowAddress;
        emit EscrowUpdated(escrowAddress);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "amount must be > 0");

        bool transferred = usdc.transferFrom(msg.sender, address(this), amount);
        require(transferred, "transfer failed");

        employerBalances[msg.sender] += amount;
        emit PoolFunded(msg.sender, amount);
    }

    function releaseForPayout(address employer, address recipient, uint256 amount) external onlyEscrow returns (bool) {
        if (employerBalances[employer] < amount) {
            emit PoolPayout(employer, recipient, amount, false);
            return false;
        }

        employerBalances[employer] -= amount;
        bool success = usdc.transfer(recipient, amount);

        if (!success) {
            employerBalances[employer] += amount;
        }

        emit PoolPayout(employer, recipient, amount, success);
        return success;
    }
}
