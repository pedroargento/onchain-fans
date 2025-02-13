// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";

contract OnchainFans is CoprocessorAdapter {
    struct ImageSale {
        address payable seller;
        uint256 price;
        bytes32 processedImageHash;
    }

    ImageSale sale;
    bytes32 hashToVerify;

    mapping(address => uint256) balances;
    uint256 purchaseTime;
    uint256 expiry = 10 days;

    constructor(
        address _taskIssuerAddress,
        bytes32 _machineHash,
        address payable seller,
        uint256 price,
        bytes32 processedImageHash
    ) CoprocessorAdapter(_taskIssuerAddress, _machineHash) {
        sale = ImageSale(seller, price, processedImageHash);
    }

    function runExecution(bytes memory input) external {
        callCoprocessor(input);
    }

    function handleNotice(
        bytes32 payloadHash,
        bytes memory notice
    ) internal override {
        bytes32 decodedPayload;
        decodedPayload = abi.decode(notice, (bytes32));
        hashToVerify = decodedPayload;
    }

    function claim() external {
        require(hashToVerify == sale.processedImageHash);
        require(hashToVerify != bytes32(0));
        (bool success, ) = (sale.seller).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function purchase() external payable {
        require(msg.value >= sale.price, "not enough payment");
        balances[msg.sender] += msg.value;

        if (purchaseTime == 0) {
            // the first purchase sets the timer
            purchaseTime = block.timestamp;
        }
    }

    function cancelPurchase() external {
        require(
            block.timestamp >= purchaseTime + expiry,
            "deadline not met yet"
        );
        (bool success, ) = (msg.sender).call{value: balances[msg.sender]}("");
        require(success, "Cancellation failed");
    }
}
