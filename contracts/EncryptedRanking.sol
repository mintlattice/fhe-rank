// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {FHE, ebool, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title EncryptedRanking
/// @notice Manages encrypted student scores and rankings using Zama FHE
contract EncryptedRanking is ZamaEthereumConfig, Ownable {
    struct StudentRecord {
        euint32 score;
        euint32 rank;
        bool exists;
    }

    mapping(address => StudentRecord) private studentRecords;
    address[] private studentList;

    event ScoreSubmitted(address indexed student);
    event BatchScoresUploaded(uint256 indexed totalStudents);

    constructor() Ownable(msg.sender) {}

    /// @notice Submit or update the caller score with encrypted data
    /// @param encryptedScore external encrypted score handle
    /// @param inputProof proof validating the encrypted input
    function submitMyScore(externalEuint32 encryptedScore, bytes calldata inputProof) external {
        _setStudentScore(msg.sender, FHE.fromExternal(encryptedScore, inputProof));
        _recalculateRanks();
        emit ScoreSubmitted(msg.sender);
    }

    /// @notice Teacher uploads or updates a single student score
    /// @param student student wallet
    /// @param encryptedScore external encrypted score handle
    /// @param inputProof proof validating the encrypted input
    function submitScoreFor(
        address student,
        externalEuint32 encryptedScore,
        bytes calldata inputProof
    ) external onlyOwner {
        require(student != address(0), "Invalid student");
        _setStudentScore(student, FHE.fromExternal(encryptedScore, inputProof));
        _recalculateRanks();
        emit ScoreSubmitted(student);
    }

    /// @notice Teacher uploads multiple student scores in a single transaction
    /// @param students list of student wallets
    /// @param encryptedScores external encrypted score handles
    /// @param inputProof proof validating the encrypted inputs
    function batchSubmitScores(
        address[] calldata students,
        externalEuint32[] calldata encryptedScores,
        bytes calldata inputProof
    ) external onlyOwner {
        uint256 length = students.length;
        require(length == encryptedScores.length, "Length mismatch");
        require(length > 0, "Empty batch");

        for (uint256 i = 0; i < length; i++) {
            address student = students[i];
            require(student != address(0), "Invalid student");
            _setStudentScore(student, FHE.fromExternal(encryptedScores[i], inputProof));
        }

        _recalculateRanks();
        emit BatchScoresUploaded(length);
    }

    /// @notice Returns whether the student already has an encrypted score
    /// @param student student wallet address
    function hasScore(address student) external view returns (bool) {
        return studentRecords[student].exists;
    }

    /// @notice Returns the encrypted score for a student
    /// @param student student wallet address
    function getEncryptedScore(address student) external view returns (euint32) {
        return studentRecords[student].score;
    }

    /// @notice Returns the encrypted rank for a student
    /// @param student student wallet address
    function getEncryptedRank(address student) external view returns (euint32) {
        return studentRecords[student].rank;
    }

    /// @notice Returns the list of all registered students
    function getStudents() external view returns (address[] memory) {
        return studentList;
    }

    function _setStudentScore(address student, euint32 score) internal {
        StudentRecord storage record = studentRecords[student];
        if (!record.exists) {
            record.exists = true;
            studentList.push(student);
        }

        record.score = score;
        FHE.allowThis(score);
        FHE.allow(score, student);
    }

    function _recalculateRanks() internal {
        uint256 length = studentList.length;
        if (length == 0) {
            return;
        }

        euint32 one = FHE.asEuint32(1);
        euint32 zero = FHE.asEuint32(0);

        for (uint256 i = 0; i < length; i++) {
            address currentAddress = studentList[i];
            StudentRecord storage current = studentRecords[currentAddress];
            if (!current.exists) {
                continue;
            }

            euint32 rank = one;

            for (uint256 j = 0; j < length; j++) {
                if (i == j) {
                    continue;
                }

                address otherAddress = studentList[j];
                StudentRecord storage other = studentRecords[otherAddress];
                if (!other.exists) {
                    continue;
                }

                ebool otherHigher = FHE.gt(other.score, current.score);
                euint32 increment = FHE.select(otherHigher, one, zero);
                rank = FHE.add(rank, increment);
            }

            current.rank = rank;
            FHE.allowThis(rank);
            FHE.allow(rank, currentAddress);
        }
    }
}
