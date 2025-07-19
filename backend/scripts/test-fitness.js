async function main() {
  console.log("Testing FitToken fitness functionality...");
  
  const [owner, user1] = await ethers.getSigners();
  
  // Get the deployed contract
  const contractAddress = require('../frontend/src/contracts/contract-address.json').FitToken;
  const FitToken = await ethers.getContractFactory("FitToken");
  const fitToken = await FitToken.attach(contractAddress);
  
  console.log("Contract Address:", contractAddress);
  console.log("Owner Address:", owner.address);
  console.log("User1 Address:", user1.address);
  
  // Check initial balances
  const ownerBalance = await fitToken.balanceOf(owner.address);
  const user1Balance = await fitToken.balanceOf(user1.address);
  
  console.log("\n=== INITIAL BALANCES ===");
  console.log("Owner FIT Balance:", ethers.utils.formatEther(ownerBalance));
  console.log("User1 FIT Balance:", ethers.utils.formatEther(user1Balance));
  
  // Record fitness activity for user1
  console.log("\n=== RECORDING FITNESS ACTIVITY ===");
  console.log("Recording: 8000 steps + 3 workouts for User1...");
  
  const tx = await fitToken.recordActivity(user1.address, 8000, 3);
  await tx.wait();
  
  console.log("Activity recorded! Transaction hash:", tx.hash);
  
  // Check updated balances
  const newUser1Balance = await fitToken.balanceOf(user1.address);
  const user1Activity = await fitToken.getUserActivity(user1.address);
  
  console.log("\n=== AFTER ACTIVITY RECORDING ===");
  console.log("User1 New FIT Balance:", ethers.utils.formatEther(newUser1Balance));
  console.log("User1 Total Steps:", user1Activity.totalSteps.toString());
  console.log("User1 Total Workouts:", user1Activity.totalWorkouts.toString());
  console.log("User1 Total Tokens Earned:", ethers.utils.formatEther(user1Activity.totalTokensEarned));
  
  // Check milestone completion
  console.log("\n=== CHECKING MILESTONES ===");
  const milestone0 = await fitToken.getMilestone(0);
  const milestone1 = await fitToken.getMilestone(1);
  
  console.log("Milestone 0 (10k steps):", milestone0.stepsRequired.toString(), "steps required");
  console.log("Milestone 1 (10 workouts):", milestone1.workoutsRequired.toString(), "workouts required");
  
  // Calculate expected tokens
  const expectedStepTokens = 8000 * 0.001; // 8000 steps × 0.001 FIT per step
  const expectedWorkoutTokens = 3 * 1; // 3 workouts × 1 FIT per workout
  const expectedTotal = expectedStepTokens + expectedWorkoutTokens;
  
  console.log("\n=== TOKEN CALCULATION ===");
  console.log("Expected from steps (8000 × 0.001):", expectedStepTokens, "FIT");
  console.log("Expected from workouts (3 × 1):", expectedWorkoutTokens, "FIT");
  console.log("Expected total:", expectedTotal, "FIT");
  console.log("Actual earned:", ethers.utils.formatEther(user1Activity.totalTokensEarned), "FIT");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
