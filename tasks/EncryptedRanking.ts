import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { getAddress, isAddress } from "ethers";

task("task:address", "Prints the EncryptedRanking address").setAction(async function (_args: TaskArguments, hre) {
  const { deployments } = hre;
  const deployment = await deployments.get("EncryptedRanking");
  console.log(`EncryptedRanking address is ${deployment.address}`);
});

task("task:get-students", "Lists registered students")
  .addOptionalParam("address", "EncryptedRanking contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const deployment = taskArguments.address
      ? { address: taskArguments.address as string }
      : await deployments.get("EncryptedRanking");

    const contract = await ethers.getContractAt("EncryptedRanking", deployment.address);
    const students = await contract.getStudents();
    console.log("Registered students:");
    students.forEach((student: string, index: number) => console.log(`${index + 1}. ${student}`));
  });

task("task:submit-score", "Submits an encrypted score")
  .addParam("value", "Score value (uint32)")
  .addOptionalParam("student", "Student address to update")
  .addOptionalParam("address", "EncryptedRanking contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    const scoreValue = parseInt(taskArguments.value);
    if (!Number.isInteger(scoreValue) || scoreValue < 0) {
      throw new Error(`Argument --value must be a non-negative integer`);
    }

    await fhevm.initializeCLIApi();

    const deployment = taskArguments.address
      ? { address: taskArguments.address as string }
      : await deployments.get("EncryptedRanking");

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedRanking", deployment.address);

    const encryptedInput = await fhevm
      .createEncryptedInput(deployment.address, signer.address)
      .add32(scoreValue)
      .encrypt();

    let tx;

    if (taskArguments.student) {
      if (!isAddress(taskArguments.student)) {
        throw new Error("Invalid --student address");
      }
      const studentAddress = getAddress(taskArguments.student);
      tx = await contract
        .connect(signer)
        .submitScoreFor(studentAddress, encryptedInput.handles[0], encryptedInput.inputProof);
      console.log(`Submitting score for ${studentAddress}`);
    } else {
      tx = await contract.connect(signer).submitMyScore(encryptedInput.handles[0], encryptedInput.inputProof);
      console.log(`Submitting score for caller ${signer.address}`);
    }

    console.log(`Wait for tx:${tx.hash}...`);
    const receipt = await tx.wait();
    console.log(`tx:${tx.hash} status=${receipt?.status}`);
  });

task("task:decrypt-score", "Decrypts a student encrypted score")
  .addOptionalParam("student", "Student address")
  .addOptionalParam("address", "EncryptedRanking contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const deployment = taskArguments.address
      ? { address: taskArguments.address as string }
      : await deployments.get("EncryptedRanking");

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedRanking", deployment.address);

    const studentAddress = taskArguments.student
      ? getAddress(taskArguments.student)
      : signer.address;

    const encryptedScore = await contract.getEncryptedScore(studentAddress);
    const clearScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScore,
      deployment.address,
      signer,
    );

    console.log(`Encrypted score: ${encryptedScore}`);
    console.log(`Clear score    : ${clearScore}`);
  });

task("task:decrypt-rank", "Decrypts a student encrypted rank")
  .addOptionalParam("student", "Student address")
  .addOptionalParam("address", "EncryptedRanking contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const deployment = taskArguments.address
      ? { address: taskArguments.address as string }
      : await deployments.get("EncryptedRanking");

    const [signer] = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedRanking", deployment.address);

    const studentAddress = taskArguments.student
      ? getAddress(taskArguments.student)
      : signer.address;

    const encryptedRank = await contract.getEncryptedRank(studentAddress);
    const clearRank = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedRank,
      deployment.address,
      signer,
    );

    console.log(`Encrypted rank: ${encryptedRank}`);
    console.log(`Clear rank    : ${clearRank}`);
  });
