// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "../lib/coprocessor-base-contract/src/CoprocessorAdapter.sol";

contract OnchainFans is CoprocessorAdapter {
    struct ImageSale {
        address payable seller;
        uint256 price;
        bytes32 processedImageHash;
        bytes32 originalImage;
        bool paid;
    }

    mapping(bytes32 => ImageSale) public sales;  
    bytes32[] public imageHashes;  // Array to store all listed image hashes

    event ImageListed(address indexed seller, bytes32 indexed processedImageHash, uint256 price);
    event ImagePaid(address indexed buyer, bytes32 indexed processedImageHash, uint256 amount);
    event FundsWithdrawn(address indexed seller, bytes32 indexed processedImageHash);

    constructor(address _taskIssuerAddress, bytes32 _machineHash)
        CoprocessorAdapter(_taskIssuerAddress, _machineHash)
    {}

    /// @notice List an image for sale
    function listImage(bytes32 processedImageHash, uint256 price) external {
        require(sales[processedImageHash].seller == address(0), "Image already listed");

        sales[processedImageHash] = ImageSale({
            seller: payable(msg.sender),
            price: price,
            processedImageHash: processedImageHash,
            originalImage: bytes32(0),
            paid: false
        });

        imageHashes.push(processedImageHash);  // Store hash in array

        emit ImageListed(msg.sender, processedImageHash, price);
    }

    /// @notice Pay for an image
    function buyImage(bytes32 processedImageHash) external payable {
        ImageSale storage sale = sales[processedImageHash];

        require(sale.seller != address(0), "Image not listed");
        require(msg.value == sale.price, "Incorrect price");
        require(!sale.paid, "Already paid");

        sale.paid = true; // Mark image as paid

        emit ImagePaid(msg.sender, processedImageHash, msg.value);
    }

    /// @notice Runs computation for verification
    function runExecution(bytes memory input) external {
        callCoprocessor(input);
    }

    /// @notice Handles verification response
    function handleNotice(bytes32 payloadHash, bytes memory notice) internal override {
        bytes32 decodedPayload = abi.decode(notice, (bytes32));
        require(payloadHash != "0x", "Image not found");
        require(sales[decodedPayload].seller != address(0), "Image not found");
        sales[decodedPayload].originalImage = decodedPayload;

        ImageSale storage sale = sales[decodedPayload];

        require(sale.paid, "Not paid yet");
        require(sale.originalImage == sale.processedImageHash, "Verification failed");

        uint256 amount = sale.price;
        sale.seller.transfer(amount); // Transfer funds to seller
        emit FundsWithdrawn(sale.seller, decodedPayload);
    }

    /// @notice Withdraw funds after verification
    function withdraw(bytes32 processedImageHash) public {
        ImageSale storage sale = sales[processedImageHash];

        require(sale.seller == msg.sender, "Not the seller");
        require(sale.paid, "Not paid yet");
        require(sale.originalImage == sale.processedImageHash, "Verification failed");

        uint256 amount = address(this).balance;
        sale.seller.transfer(amount); // Transfer funds to seller
        emit FundsWithdrawn(msg.sender, processedImageHash);
    }

    /// @notice Get all listed images (returns only the hashes)
    function getAllImageSales() external view returns (bytes32[] memory) {
        return imageHashes;
    }

    /// @notice Get details of a specific image sale
    function getImageSale(bytes32 processedImageHash) external view returns (address, uint256, bytes32, bytes32, bool) {
        ImageSale storage sale = sales[processedImageHash];
        return (sale.seller, sale.price, processedImageHash, sale.originalImage, sale.paid);
    }
}
