// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@fhenixprotocol/cofhe-contracts/FHE.sol";
import "./PayShieldRegistry.sol";

contract PayShieldPayroll {
    struct PayrollRecord {
        euint32 encryptedHours;
        euint32 encryptedRate;
        euint32 netPay;
        bool exists;
        bool employerConfirmed;
    }

    PayShieldRegistry public immutable registry;
    mapping(address employer => mapping(address contractor => PayrollRecord record)) private payrollRecords;

    event PayrollSubmitted(
        address indexed employer,
        address indexed contractor,
        euint32 encryptedHours,
        euint32 encryptedRate,
        euint32 netPay
    );
    event PayrollConfirmed(address indexed employer, address indexed contractor);

    constructor(address registryAddress) {
        require(registryAddress != address(0), "invalid registry");
        registry = PayShieldRegistry(registryAddress);
    }

    function submitPayroll(address contractor, InEuint32 memory encryptedHours, InEuint32 memory encryptedRate) external {
        require(registry.isEmployerContractor(msg.sender, contractor), "contractor not registered");

        euint32 encryptedHoursValue = FHE.asEuint32(encryptedHours);
        euint32 encryptedRateValue = FHE.asEuint32(encryptedRate);
        euint32 calculatedNetPay = FHE.mul(encryptedHoursValue, encryptedRateValue);

        FHE.allowThis(calculatedNetPay);
        FHE.allow(calculatedNetPay, contractor);

        payrollRecords[msg.sender][contractor] = PayrollRecord({
            encryptedHours: encryptedHoursValue,
            encryptedRate: encryptedRateValue,
            netPay: calculatedNetPay,
            exists: true,
            employerConfirmed: false
        });

        emit PayrollSubmitted(msg.sender, contractor, encryptedHoursValue, encryptedRateValue, calculatedNetPay);
    }

    function confirmPayroll(address contractor) external {
        PayrollRecord storage record = payrollRecords[msg.sender][contractor];
        require(record.exists, "payroll missing");

        record.employerConfirmed = true;
        emit PayrollConfirmed(msg.sender, contractor);
    }

    function isPayrollConfirmed(address employer, address contractor) external view returns (bool) {
        return payrollRecords[employer][contractor].employerConfirmed;
    }

    function getNetPay(address employer, address contractor) external view returns (euint32) {
        PayrollRecord storage record = payrollRecords[employer][contractor];
        require(record.exists, "payroll missing");
        return record.netPay;
    }
}
