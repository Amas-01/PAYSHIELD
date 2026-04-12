// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PayShieldRegistry {
    mapping(address employer => mapping(address contractor => bool active)) public isRegistered;

    event ContractorRegistered(address indexed employer, address indexed contractor);

    function registerContractor(address contractor) external {
        require(contractor != address(0), "invalid contractor");
        isRegistered[msg.sender][contractor] = true;
        emit ContractorRegistered(msg.sender, contractor);
    }

    function isEmployerContractor(address employer, address contractor) external view returns (bool) {
        return isRegistered[employer][contractor];
    }
}
