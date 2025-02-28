// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public owner;
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;
    mapping(address => bool) public hasVoted;

    constructor() {
        owner = msg.sender;
        // ✅ Adding default candidates inside the constructor
        addCandidate("Alice");
        addCandidate("Bob");
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can add candidates");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates[candidatesCount] = Candidate(_name, 0);
        candidatesCount++;
    }

    function vote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId < candidatesCount, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;
    }

    function getCandidate(uint256 _candidateId) public view returns (string memory, uint256) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return (candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
}
