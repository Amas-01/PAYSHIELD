// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayShieldRegistry {
    enum ContractorState {
        Active,
        Paid,
        Disputed
    }

    struct ContractorRecord {
        bool exists;
        ContractorState state;
    }

    mapping(address employer => address[] contractors) private employerContractors;
    mapping(address employer => mapping(address contractor => ContractorRecord record)) private contractorRecords;

    event ContractorRegistered(address indexed employer, address indexed contractor);
    event ContractorStateUpdated(address indexed employer, address indexed contractor, ContractorState state);

    function registerContractor(address contractor) external {
        require(contractor != address(0), "invalid contractor");

        ContractorRecord storage record = contractorRecords[msg.sender][contractor];
        if (!record.exists) {
            employerContractors[msg.sender].push(contractor);
            record.exists = true;
        }

        record.state = ContractorState.Active;

        emit ContractorRegistered(msg.sender, contractor);
        emit ContractorStateUpdated(msg.sender, contractor, ContractorState.Active);
    }

    function isEmployerContractor(address employer, address contractor) external view returns (bool) {
        return contractorRecords[employer][contractor].exists;
    }

    function getContractors(address employer) external view returns (address[] memory) {
        return employerContractors[employer];
    }

    function getContractorState(address employer, address contractor) external view returns (ContractorState) {
        require(contractorRecords[employer][contractor].exists, "contractor not registered");
        return contractorRecords[employer][contractor].state;
    }

    function markPaid(address contractor) external {
        ContractorRecord storage record = contractorRecords[msg.sender][contractor];
        require(record.exists, "contractor not registered");
        require(record.state == ContractorState.Active, "invalid transition");

        record.state = ContractorState.Paid;
        emit ContractorStateUpdated(msg.sender, contractor, ContractorState.Paid);
    }

    function markDisputed(address contractor) external {
        ContractorRecord storage record = contractorRecords[msg.sender][contractor];
        require(record.exists, "contractor not registered");
        require(record.state == ContractorState.Paid, "invalid transition");

        record.state = ContractorState.Disputed;
        emit ContractorStateUpdated(msg.sender, contractor, ContractorState.Disputed);
    }
}
