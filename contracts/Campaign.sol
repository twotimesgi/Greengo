// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Campaign is Ownable {
    string private campaignName;
    uint256 private goalAmount;
    uint256 private amountCollected = 0;
    uint256 private startDate;
    uint256 private endDate;

    mapping(address => uint) private donations;
    uint256 private donationsCounter = 0;

    event FundsClaimed(address indexed _from, uint _value);

    event Received(address, uint);

    constructor(
        string memory _campaignName,
        uint256 _goalAmount,
        uint _startDate,
        uint _endDate
    ) {
        campaignName = _campaignName;
        goalAmount = _goalAmount;
        startDate = _startDate;
        endDate = _endDate;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function getCreator() public view returns (address) {
        return owner();
    }

    function claimFunds() public onlyOwner {
        require(
            block.timestamp > endDate,
            "The funding phase is still in progress."
        );
        require(isGoalReached(), "The goal amount has not been reached.");
        payable(owner()).transfer(amountCollected);
        emit FundsClaimed(msg.sender, amountCollected);
        amountCollected = 0;
    }

    function donate() public payable {
        // require(msg.sender != owner(), "Owner cannot donate.");
        require(
            block.timestamp >= startDate,
            "The funding phase has not started yet."
        );
        require(
            block.timestamp < endDate,
            "The funding phase of this project is ended."
        );

        donations[msg.sender] += msg.value;
        amountCollected += msg.value;
        donationsCounter++;
    }

    function getRefund() public {
        require(
            block.timestamp > endDate,
            "The funding phase is still in progress."
        );
        require(!isGoalReached(), "The goal amount has been reached.");
        require(donations[msg.sender] > 0, "You have not donated.");

        uint256 amountToRefund = donations[msg.sender];
        donations[msg.sender] = 0;
        payable(msg.sender).transfer(amountToRefund);
    }

    function isGoalReached() public view returns (bool) {
        return amountCollected >= goalAmount;
    }

    function getGoalAmount() public view returns (uint256) {
        return goalAmount;
    }

    function getAmountCollected() public view returns (uint256) {
        return amountCollected;
    }

    function getStartDate() public view returns (uint256) {
        return startDate;
    }

    function getEndDate() public view returns (uint256) {
        return endDate;
    }

    function getDonationBalance(address _address)
        public
        view
        returns (uint256)
    {
        return donations[_address];
    }

    function getDonationsCounter() public view returns (uint256) {
        return donationsCounter;
    }
}
