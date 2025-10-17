import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployedRanking = await deploy("EncryptedRanking", {
    from: deployer,
    log: true,
  });

  console.log(`EncryptedRanking contract: `, deployedRanking.address);
};
export default func;
func.id = "deploy_encrypted_ranking"; // id required to prevent reexecution
func.tags = ["EncryptedRanking"];
