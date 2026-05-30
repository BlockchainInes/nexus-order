// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/OrderBook.sol";

contract OrderBookTest is Test {
    OrderBook public orderBook;
    address alice = address(0x1);
    address bob = address(0x2);

    function setUp() public {
        orderBook = new OrderBook();
    }

    function test_PlaceBuyOrder() public {
        vm.prank(alice);
        orderBook.placeOrder(100, 10, true);
        OrderBook.Order memory order = orderBook.getOrder(0);
        assertEq(order.price, 100);
        assertEq(order.amount, 10);
        assertEq(order.isBuy, true);
        assertEq(order.active, true);
    }

    function test_PlaceSellOrder() public {
        vm.prank(bob);
        orderBook.placeOrder(100, 10, false);
        OrderBook.Order memory order = orderBook.getOrder(0);
        assertEq(order.isBuy, false);
        assertEq(order.active, true);
    }

    function test_CancelOrder() public {
        vm.prank(alice);
        orderBook.placeOrder(100, 10, true);
        vm.prank(alice);
        orderBook.cancelOrder(0);
        OrderBook.Order memory order = orderBook.getOrder(0);
        assertEq(order.active, false);
    }

    function test_OrderMatching() public {
        vm.prank(alice);
        orderBook.placeOrder(100, 10, true);
        vm.prank(bob);
        orderBook.placeOrder(100, 10, false);
        OrderBook.Order memory buy = orderBook.getOrder(0);
        OrderBook.Order memory sell = orderBook.getOrder(1);
        assertEq(buy.active, false);
        assertEq(sell.active, false);
    }

    function test_CannotCancelOthersOrder() public {
        vm.prank(alice);
        orderBook.placeOrder(100, 10, true);
        vm.prank(bob);
        vm.expectRevert("Not your order");
        orderBook.cancelOrder(0);
    }
}