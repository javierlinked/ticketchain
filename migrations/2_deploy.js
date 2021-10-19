const TicketService = artifacts.require("TicketService");

module.exports = function (deployer) {
  deployer.deploy(TicketService);
};
