async function main() {
  console.log("Deploying FitToken contract...");
  
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Get the contract factory
  const FitToken = await ethers.getContractFactory("FitToken");
  
  // Deploy the contract
  const fitToken = await FitToken.deploy();
  
  // Wait for deployment to complete
  await fitToken.deployed();
  
  console.log("FitToken deployed to:", fitToken.address);
  console.log("Transaction hash:", fitToken.deployTransaction.hash);
  
  // Save contract address and ABI for frontend
  const fs = require('fs');
  const contractsDir = './frontend/src/contracts';
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    contractsDir + '/contract-address.json',
    JSON.stringify({ FitToken: fitToken.address }, undefined, 2)
  );
  
  const FitTokenArtifact = artifacts.readArtifactSync("FitToken");
  
  fs.writeFileSync(
    contractsDir + '/FitToken.json',
    JSON.stringify(FitTokenArtifact, null, 2)
  );
  
  console.log("Contract artifacts saved to frontend/src/contracts/");
  
  // Test the deployed contract
  const name = await fitToken.name();
  const symbol = await fitToken.symbol();
  const totalSupply = await fitToken.totalSupply();
  
  console.log("Contract Name:", name);
  console.log("Contract Symbol:", symbol);
  console.log("Total Supply:", ethers.utils.formatEther(totalSupply), "FIT");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
