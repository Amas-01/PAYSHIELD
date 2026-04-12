// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PayShieldRegistry.sol";

contract PayShieldPayroll {
    struct EncryptedPayroll {
        bytes32 encryptedHours;
        bytes32 encryptedRate;
        bytes32 encryptedGrossPay;
    }

    PayShieldRegistry public immutable registry;
    mapping(address employer => mapping(address contractor => EncryptedPayroll)) public payrollRecords;

    event PayrollSubmitted(
        address indexed employer,
        address indexed contractor,
        bytes32 encryptedHours,
        bytes32 encryptedRate,
        bytes32 encryptedGrossPay
    );

    constructor(address registryAddress) {
        registry = PayShieldRegistry(registryAddress);
    }

    function submitPayroll(address contractor, bytes32 encryptedHours, bytes32 encryptedRate, bytes32 encryptedGrossPay) external {
        require(registry.isEmployerContractor(msg.sender, contractor), "contractor not registered");

        payrollRecords[msg.sender][contractor] = EncryptedPayroll({
            encryptedHours: encryptedHours,
            encryptedRate: encryptedRate,
            encryptedGrossPay: encryptedGrossPay
        });

        emit PayrollSubmitted(msg.sender, contractor, encryptedHours, encryptedRate, encryptedGrossPay);
    }
}
