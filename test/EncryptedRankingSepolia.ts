import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, fhevm, deployments } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { EncryptedRanking } from "../types";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("EncryptedRankingSepolia", function () {
  let signers: Signers;
  let rankingContract: EncryptedRanking;
  let contractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const deployment = await deployments.get("EncryptedRanking");
      contractAddress = deployment.address;
      rankingContract = await ethers.getContractAt("EncryptedRanking", contractAddress);
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const [alice] = await ethers.getSigners();
    signers = { alice };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("submits and decrypts an encrypted score", async function () {
    steps = 8;
    this.timeout(4 * 40000);

    progress("Encrypting score '88'...");
    const encryptedScore = await fhevm
      .createEncryptedInput(contractAddress, signers.alice.address)
      .add32(88)
      .encrypt();

    progress("Submitting encrypted score with submitMyScore...");
    const tx = await rankingContract
      .connect(signers.alice)
      .submitMyScore(encryptedScore.handles[0], encryptedScore.inputProof);
    await tx.wait();

    progress("Fetching encrypted score from contract...");
    const storedScore = await rankingContract.getEncryptedScore(signers.alice.address);
    expect(storedScore).to.not.eq(ethers.ZeroHash);

    progress("Decrypting stored score...");
    const clearScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      storedScore,
      contractAddress,
      signers.alice,
    );
    progress(`Decrypted score is ${clearScore}`);
    expect(clearScore).to.eq(88);

    progress("Fetching encrypted rank from contract...");
    const storedRank = await rankingContract.getEncryptedRank(signers.alice.address);

    progress("Decrypting stored rank...");
    const clearRank = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      storedRank,
      contractAddress,
      signers.alice,
    );
    progress(`Decrypted rank is ${clearRank}`);
    expect(clearRank).to.be.greaterThan(0);
  });
});
