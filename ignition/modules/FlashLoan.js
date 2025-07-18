// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const POOL_ADDRESS_PROVIDER = "0x0496275d34753A48320CA58103d5220d394FF77F";

module.exports = buildModule("FlashLoanModule", (m) => {
  const flashLoan = m.contract("FlashLoan", [POOL_ADDRESS_PROVIDER]);

  return { flashLoan }
});
