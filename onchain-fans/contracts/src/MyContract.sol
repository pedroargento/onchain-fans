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
    bytes32 originalImage;

    constructor(address _taskIssuerAddress, bytes32 _machineHash, address payable seller, uint256 price, bytes32 processedImageHash)
        CoprocessorAdapter(_taskIssuerAddress, _machineHash)
    {
      sale = ImageSale(seller, price, processedImageHash);
    }

    function runExecution(bytes memory input) external {
        callCoprocessor(input);
    }

    function handleNotice(bytes32 payloadHash, bytes memory notice) internal override {
        bytes32 decodedPayload;
        decodedPayload = abi.decode(notice, (bytes32));
        originalImage = decodedPayload;
    }

    function withdraw() public {
      require(originalImage == sale.processedImageHash);
      require(originalImage != bytes32(0));
      (sale.seller).transfer(address(this).balance);
    }


}
