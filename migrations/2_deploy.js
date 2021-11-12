const TicketContract = artifacts.require("TicketContract");

module.exports = function (deployer) {
  deployer.deploy(TicketContract);
};
