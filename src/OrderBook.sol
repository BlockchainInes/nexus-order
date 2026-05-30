// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OrderBook {
    struct Order {
        uint256 id;
        address user;
        uint256 price;
        uint256 amount;
        bool isBuy; 
        bool active;
    }

    uint256 public nextOrderId;
    mapping(uint256 => Order) public orders;

    event OrderPlaced(uint256 id, address user, uint256 price, uint256 amount, bool isBuy);

    function placeOrder(uint256 price, uint256 amount, bool isBuy) external {
        orders[nextOrderId] = Order(nextOrderId, msg.sender, price, amount, isBuy, true);
        emit OrderPlaced(nextOrderId, msg.sender, price, amount, isBuy);
        nextOrderId++;
    }
}