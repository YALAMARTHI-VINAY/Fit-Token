const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FitToken", function () {
  let FitToken;
  let fitToken;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    
    FitToken = await ethers.getContractFactory("FitToken");
    fitToken = await FitToken.deploy();
    await fitToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await fitToken.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await fitToken.name()).to.equal("FitToken");
      expect(await fitToken.symbol()).to.equal("FIT");
    });
  });

  describe("Activity Recording", function () {
    it("Should record activity and mint tokens", async function () {
      const steps = 5000;
      const workouts = 2;
      
      await fitToken.recordActivity(user1.address, steps, workouts);
      
      const activity = await fitToken.getUserActivity(user1.address);
      expect(activity.totalSteps).to.equal(steps);
      expect(activity.totalWorkouts).to.equal(workouts);
    });
  });
});
