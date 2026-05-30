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
    event OrderCancelled(uint256 id);
    event OrderMatched(uint256 buyId, uint256 sellId, uint256 price, uint256 amount);

    function placeOrder(uint256 price, uint256 amount, bool isBuy) external {
        orders[nextOrderId] = Order(nextOrderId, msg.sender, price, amount, isBuy, true);
        emit OrderPlaced(nextOrderId, msg.sender, price, amount, isBuy);
        _matchOrder(nextOrderId);
        nextOrderId++;
    }

    function cancelOrder(uint256 id) external {
        require(orders[id].user == msg.sender, "Not your order");
        require(orders[id].active, "Order not active");
        orders[id].active = false;
        emit OrderCancelled(id);
    }

    function _matchOrder(uint256 newId) internal {
        Order storage newOrder = orders[newId];
        for (uint256 i = 0; i < newId; i++) {
            Order storage existing = orders[i];
            if (!existing.active) continue;
            if (existing.isBuy == newOrder.isBuy) continue;
            if (newOrder.isBuy && existing.price <= newOrder.price) {
                uint256 matchAmount = existing.amount < newOrder.amount ? existing.amount : newOrder.amount;
                existing.amount -= matchAmount;
                newOrder.amount -= matchAmount;
                if (existing.amount == 0) existing.active = false;
                if (newOrder.amount == 0) newOrder.active = false;
                emit OrderMatched(newOrder.isBuy ? newId : i, newOrder.isBuy ? i : newId, existing.price, matchAmount);
                if (!newOrder.active) break;
            } else if (!newOrder.isBuy && existing.price >= newOrder.price) {
                uint256 matchAmount = existing.amount < newOrder.amount ? existing.amount : newOrder.amount;
                existing.amount -= matchAmount;
                newOrder.amount -= matchAmount;
                if (existing.amount == 0) existing.active = false;
                if (newOrder.amount == 0) newOrder.active = false;
                emit OrderMatched(newOrder.isBuy ? newId : i, newOrder.isBuy ? i : newId, existing.price, matchAmount);
                if (!newOrder.active) break;
            }
        }
    }

    function getOrder(uint256 id) external view returns (Order memory) {
        return orders[id];
    }
}