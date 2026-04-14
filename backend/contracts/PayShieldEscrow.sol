// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PayShieldPayroll.sol";
import "./PayShieldPool.sol";

contract PayShieldEscrow {
    PayShieldPayroll public immutable payroll;
    PayShieldPool public immutable pool;

    event PayoutAttempted(address indexed employer, address indexed recipient, uint256 amount, bool success);

    constructor(address payrollAddress, address poolAddress) {
        require(payrollAddress != address(0), "invalid payroll");
        require(poolAddress != address(0), "invalid pool");
        payroll = PayShieldPayroll(payrollAddress);
        pool = PayShieldPool(poolAddress);
    }

    function release(address contractor, uint256 amount) external returns (bool) {
        bool confirmed = payroll.isPayrollConfirmed(msg.sender, contractor);
        if (!confirmed) {
            emit PayoutAttempted(msg.sender, contractor, amount, false);
            return false;
        }

        bool success = pool.releaseForPayout(msg.sender, contractor, amount);
        emit PayoutAttempted(msg.sender, contractor, amount, success);
        return success;
    }
}
