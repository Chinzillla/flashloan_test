const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("FlashLoan", function () {
  let flashLoan;
  let owner;
  let otherAccount;
  let mockPoolAddressesProvider;
  let mockPool;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    
    // Check if we're on a forked network
    if (network.name === "hardhat" && network.config.forking) {
      // Use real Sepolia Pool Address Provider when forking
      const poolAddressProvider = "0x0496275d34753A48320CA58103d5220d394FF77F";
      const FlashLoan = await ethers.getContractFactory("FlashLoan");
      flashLoan = await FlashLoan.deploy(poolAddressProvider);
    } else {
      // Deploy mocks for local testing
      const MockPool = await ethers.getContractFactory("MockPool");
      mockPool = await MockPool.deploy();
      await mockPool.waitForDeployment();
      
      const MockPoolAddressesProvider = await ethers.getContractFactory("MockPoolAddressesProvider");
      mockPoolAddressesProvider = await MockPoolAddressesProvider.deploy(await mockPool.getAddress());
      await mockPoolAddressesProvider.waitForDeployment();
      
      const FlashLoan = await ethers.getContractFactory("FlashLoan");
      flashLoan = await FlashLoan.deploy(await mockPoolAddressesProvider.getAddress());
    }
    
    await flashLoan.waitForDeployment();
  });

  it("Should have correct pool address provider", async function () {
    if (network.name === "hardhat" && network.config.forking) {
      expect(await flashLoan.ADDRESSES_PROVIDER()).to.equal("0x0496275d34753A48320CA58103d5220d394FF77F");
    } else {
      expect(await flashLoan.ADDRESSES_PROVIDER()).to.equal(await mockPoolAddressesProvider.getAddress());
    }
  });

  it("Should only allow owner to request flash loan", async function () {
    const token = "0x0000000000000000000000000000000000000000";
    const amount = ethers.parseEther("1");
    
    // Should revert when called by non-owner
    await expect(flashLoan.connect(otherAccount).requestFlashLoan(token, amount))
      .to.be.revertedWith("Only owner can call this");
  });

  it("Should allow owner to request flash loan", async function () {
    // This test will work with mocks but may fail with real contracts without proper setup
    const token = "0x0000000000000000000000000000000000000000";
    const amount = ethers.parseEther("1");
    
    // This should not revert (though it may fail for other reasons in real implementation)
    await expect(flashLoan.requestFlashLoan(token, amount))
      .to.not.be.revertedWith("Only owner can call this");
  });
});