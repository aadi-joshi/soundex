const Soundex = artifacts.require("Soundex");

module.exports = function (deployer) {
  deployer.deploy(Soundex);
};
