pragma solidity ^0.4.8;

contract Shares {
	mapping (address => uint) shares;

	function updateShares(uint share) {
		shares[msg.sender] = getShares(msg.sender) + share;
	}

	function getShares(address addr) returns(uint) {
    	return shares[addr];
  }
}
