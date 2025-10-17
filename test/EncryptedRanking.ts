import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";
import { EncryptedRanking, EncryptedRanking__factory } from "../types";

type Signers = {
  teacher: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
  charlie: HardhatEthersSigner;
};

async function deployFixture(teacher: HardhatEthersSigner) {
  const factory = (await ethers.getContractFactory("EncryptedRanking", teacher)) as EncryptedRanking__factory;
  const contract = (await factory.deploy()) as EncryptedRanking;
  const contractAddress = await contract.getAddress();

  return { contract, contractAddress };
}

async function decryptValue(
  contractAddress: string,
  signer: HardhatEthersSigner,
  encrypted: string,
): Promise<number> {
  return fhevm.userDecryptEuint(FhevmType.euint32, encrypted, contractAddress, signer);
}

describe("EncryptedRanking", function () {
  let signers: Signers;
  let contract: EncryptedRanking;
  let contractAddress: string;

  before(async function () {
    const [teacher, alice, bob, charlie] = await ethers.getSigners();
    signers = { teacher, alice, bob, charlie };
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ contract, contractAddress } = await deployFixture(signers.teacher));
  });

  it("allows the teacher to batch upload encrypted scores and compute ranks", async function () {
    const scores = [90, 80, 95];

    const encryptedInput = await fhevm
      .createEncryptedInput(contractAddress, signers.teacher.address)
      .add32(scores[0])
      .add32(scores[1])
      .add32(scores[2])
      .encrypt();

    await contract
      .connect(signers.teacher)
      .batchSubmitScores(
        [signers.alice.address, signers.bob.address, signers.charlie.address],
        [encryptedInput.handles[0], encryptedInput.handles[1], encryptedInput.handles[2]],
        encryptedInput.inputProof,
      );

    const aliceScore = await decryptValue(
      contractAddress,
      signers.alice,
      await contract.getEncryptedScore(signers.alice.address),
    );
    expect(aliceScore).to.eq(90);

    const aliceRank = await decryptValue(
      contractAddress,
      signers.alice,
      await contract.getEncryptedRank(signers.alice.address),
    );
    expect(aliceRank).to.eq(2);

    const bobRank = await decryptValue(
      contractAddress,
      signers.bob,
      await contract.getEncryptedRank(signers.bob.address),
    );
    expect(bobRank).to.eq(3);

    const charlieRank = await decryptValue(
      contractAddress,
      signers.charlie,
      await contract.getEncryptedRank(signers.charlie.address),
    );
    expect(charlieRank).to.eq(1);
  });

  it("recomputes ranks when a student updates their own encrypted score", async function () {
    const initialScores = [72, 84, 67];
    const initialEncryption = await fhevm
      .createEncryptedInput(contractAddress, signers.teacher.address)
      .add32(initialScores[0])
      .add32(initialScores[1])
      .add32(initialScores[2])
      .encrypt();

    await contract
      .connect(signers.teacher)
      .batchSubmitScores(
        [signers.alice.address, signers.bob.address, signers.charlie.address],
        [initialEncryption.handles[0], initialEncryption.handles[1], initialEncryption.handles[2]],
        initialEncryption.inputProof,
      );

    const bobUpgrade = await fhevm
      .createEncryptedInput(contractAddress, signers.bob.address)
      .add32(99)
      .encrypt();

    await contract
      .connect(signers.bob)
      .submitMyScore(bobUpgrade.handles[0], bobUpgrade.inputProof);

    const aliceRank = await decryptValue(
      contractAddress,
      signers.alice,
      await contract.getEncryptedRank(signers.alice.address),
    );
    expect(aliceRank).to.eq(2);

    const bobRank = await decryptValue(
      contractAddress,
      signers.bob,
      await contract.getEncryptedRank(signers.bob.address),
    );
    expect(bobRank).to.eq(1);

    const charlieRank = await decryptValue(
      contractAddress,
      signers.charlie,
      await contract.getEncryptedRank(signers.charlie.address),
    );
    expect(charlieRank).to.eq(3);
  });

  it("lets the teacher update a single student score", async function () {
    const baseScores = [60, 70, 75];
    const baseEncryption = await fhevm
      .createEncryptedInput(contractAddress, signers.teacher.address)
      .add32(baseScores[0])
      .add32(baseScores[1])
      .add32(baseScores[2])
      .encrypt();

    await contract
      .connect(signers.teacher)
      .batchSubmitScores(
        [signers.alice.address, signers.bob.address, signers.charlie.address],
        [baseEncryption.handles[0], baseEncryption.handles[1], baseEncryption.handles[2]],
        baseEncryption.inputProof,
      );

    const aliceBoost = await fhevm
      .createEncryptedInput(contractAddress, signers.teacher.address)
      .add32(99)
      .encrypt();

    await contract
      .connect(signers.teacher)
      .submitScoreFor(signers.alice.address, aliceBoost.handles[0], aliceBoost.inputProof);

    const aliceRank = await decryptValue(
      contractAddress,
      signers.alice,
      await contract.getEncryptedRank(signers.alice.address),
    );
    expect(aliceRank).to.eq(1);

    const bobRank = await decryptValue(
      contractAddress,
      signers.bob,
      await contract.getEncryptedRank(signers.bob.address),
    );
    expect(bobRank).to.eq(3);
  });
});
