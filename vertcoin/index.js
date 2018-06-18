const   commands = require('./vertcoin-api');
const   jsonrpc = require('./jsonrpc');
const   rpc = new jsonrpc.Client({
    host: 'localhost',
    port: '5899',
    user: '', //RPC USER
    pass: '' //RPC PASS
});

function Client(opts) {
    this.rpc = new jsonrpc.Client(opts);
}

var getWrapper = function(protoClass, protoFn, deprecated) {
    var command = deprecated ? commandsDeprecated[protoFn] : commands[protoClass][protoFn];
    return function() {
        if (deprecated) {
            deprecate(protoFn + ' is deprecated');
        }
        var args = [].slice.call(arguments);
        callRpc(command, args);
    };
};


Client.prototype.cmd = function() {
    var args = [].slice.call(arguments);
    var cmd = args.shift();

    callRpc(cmd, args, this.rpc);
};

function callRpc(cmd, args) {
    var fn = args[args.length - 1];

    // If the last function is a callback, pop it from the args list
    if(typeof fn === 'function') {
        args.pop();
    } else {
        fn = function() {};
    }

    rpc.call(cmd, args, function(){
        var args = [].slice.call(arguments);
        args.unshift(null);
        fn.apply(this, args);
    }, function(err){
        fn(err);
    });
}

/*(function() {
    for (var protoClass in commands) {
        module.exports[protoClass] = function() { };
        for (var protoFn in commands[protoClass]) {
            module.exports[protoClass].prototype[protoFn] = getWrapper(protoClass, protoFn, false);
        }

        module.exports[protoClass] = new module.exports[protoClass]();
    }

    for (var protoClass in commands) {
        console.log('module.exports.' + protoClass + ' = function() { };');
        for (var protoFn in commands[protoClass]) {
            console.log('module.exports.' + protoClass + '.' + protoFn + " = getWrapper('" + protoClass + "', '" + protoFn + "', false);");
        }
        console.log('module.exports.' + protoClass + " = new module.exports." + protoClass + '();');
    }
})();*/

module.exports.Blockchain = function() { };
module.exports.Blockchain.prototype.getBestBlockHash = getWrapper('Blockchain', 'getBestBlockHash', false);
module.exports.Blockchain.prototype.getBlock = getWrapper('Blockchain', 'getBlock', false);
module.exports.Blockchain.prototype.getBlockchainInfo = getWrapper('Blockchain', 'getBlockchainInfo', false);
module.exports.Blockchain.prototype.getBlockCount = getWrapper('Blockchain', 'getBlockCount', false);
module.exports.Blockchain.prototype.getBlockHash = getWrapper('Blockchain', 'getBlockHash', false);
module.exports.Blockchain.prototype.getBlockHeader = getWrapper('Blockchain', 'getBlockHeader', false);
module.exports.Blockchain.prototype.getChainTips = getWrapper('Blockchain', 'getChainTips', false);
module.exports.Blockchain.prototype.getDifficulty = getWrapper('Blockchain', 'getDifficulty', false);
module.exports.Blockchain.prototype.getMempoolAncestors = getWrapper('Blockchain', 'getMempoolAncestors', false);
module.exports.Blockchain.prototype.getMempoolDescendants = getWrapper('Blockchain', 'getMempoolDescendants', false);
module.exports.Blockchain.prototype.getMempoolEntry = getWrapper('Blockchain', 'getMempoolEntry', false);
module.exports.Blockchain.prototype.getMempoolInfo = getWrapper('Blockchain', 'getMempoolInfo', false);
module.exports.Blockchain.prototype.getRawMempool = getWrapper('Blockchain', 'getRawMempool', false);
module.exports.Blockchain.prototype.getTxOut = getWrapper('Blockchain', 'getTxOut', false);
module.exports.Blockchain.prototype.getTxOutProof = getWrapper('Blockchain', 'getTxOutProof', false);
module.exports.Blockchain.prototype.getTxOutSetInfo = getWrapper('Blockchain', 'getTxOutSetInfo', false);
module.exports.Blockchain.prototype.preciousBlock = getWrapper('Blockchain', 'preciousBlock', false);
module.exports.Blockchain.prototype.verifyChain = getWrapper('Blockchain', 'verifyChain', false);
module.exports.Blockchain.prototype.verifyTxOutProof = getWrapper('Blockchain', 'verifyTxOutProof', false);
module.exports.Blockchain = new module.exports.Blockchain();
module.exports.Control = function() { };
module.exports.Control.prototype.getInfo = getWrapper('Control', 'getInfo', false);
module.exports.Control.prototype.getMemoryInfo = getWrapper('Control', 'getMemoryInfo', false);
module.exports.Control.prototype.help = getWrapper('Control', 'help', false);
module.exports.Control.prototype.stop = getWrapper('Control', 'stop', false);
module.exports.Control = new module.exports.Control();
module.exports.Generating = function() { };
module.exports.Generating.prototype.generate_numBlocks = getWrapper('Generating', 'generate_numBlocks', false);
module.exports.Generating.prototype.generateToAddress = getWrapper('Generating', 'generateToAddress', false);
module.exports.Generating = new module.exports.Generating();
module.exports.Mining = function() { };
module.exports.Mining.prototype.getBlockTemplate = getWrapper('Mining', 'getBlockTemplate', false);
module.exports.Mining.prototype.getMiningInfo = getWrapper('Mining', 'getMiningInfo', false);
module.exports.Mining.prototype.getNetworkHPS = getWrapper('Mining', 'getNetworkHPS', false);
module.exports.Mining.prototype.prioritiseTransaction = getWrapper('Mining', 'prioritiseTransaction', false);
module.exports.Mining.prototype.submitBlock = getWrapper('Mining', 'submitBlock', false);
module.exports.Mining = new module.exports.Mining();
module.exports.Network = function() { };
module.exports.Network.prototype.addNode = getWrapper('Network', 'addNode', false);
module.exports.Network.prototype.clearBanned = getWrapper('Network', 'clearBanned', false);
module.exports.Network.prototype.disconnectNode = getWrapper('Network', 'disconnectNode', false);
module.exports.Network.prototype.getAddedNodeInfo = getWrapper('Network', 'getAddedNodeInfo', false);
module.exports.Network.prototype.getConnectionCount = getWrapper('Network', 'getConnectionCount', false);
module.exports.Network.prototype.getNetTotals = getWrapper('Network', 'getNetTotals', false);
module.exports.Network.prototype.getNetworkInfo = getWrapper('Network', 'getNetworkInfo', false);
module.exports.Network.prototype.getPeerInfo = getWrapper('Network', 'getPeerInfo', false);
module.exports.Network.prototype.listBanned = getWrapper('Network', 'listBanned', false);
module.exports.Network.prototype.ping = getWrapper('Network', 'ping', false);
module.exports.Network.prototype.setBan = getWrapper('Network', 'setBan', false);
module.exports.Network.prototype.setNetworkActive = getWrapper('Network', 'setNetworkActive', false);
module.exports.Network = new module.exports.Network();
module.exports.Transactions = function() { };
module.exports.Transactions.prototype.createRawTransaction = getWrapper('Transactions', 'createRawTransaction', false);
module.exports.Transactions.prototype.decodeRawTransaction = getWrapper('Transactions', 'decodeRawTransaction', false);
module.exports.Transactions.prototype.decodeScript = getWrapper('Transactions', 'decodeScript', false);
module.exports.Transactions.prototype.fundRawTransaction = getWrapper('Transactions', 'fundRawTransaction', false);
module.exports.Transactions.prototype.getRawTransaction = getWrapper('Transactions', 'getRawTransaction', false);
module.exports.Transactions.prototype.sendRawTransaction = getWrapper('Transactions', 'sendRawTransaction', false);
module.exports.Transactions.prototype.signRawTransaction = getWrapper('Transactions', 'signRawTransaction', false);
module.exports.Transactions = new module.exports.Transactions();
module.exports.Util = function() { };
module.exports.Util.prototype.createMultiSig = getWrapper('Util', 'createMultiSig', false);
module.exports.Util.prototype.estimateFee = getWrapper('Util', 'estimateFee', false);
module.exports.Util.prototype.estimatePriority = getWrapper('Util', 'estimatePriority', false);
module.exports.Util.prototype.estimateSmartFee = getWrapper('Util', 'estimateSmartFee', false);
module.exports.Util.prototype.estimateSmartPriority = getWrapper('Util', 'estimateSmartPriority', false);
module.exports.Util.prototype.signMessageWithPrivKey = getWrapper('Util', 'signMessageWithPrivKey', false);
module.exports.Util.prototype.validateAddress = getWrapper('Util', 'validateAddress', false);
module.exports.Util.prototype.verifyMessage = getWrapper('Util', 'verifyMessage', false);
module.exports.Util = new module.exports.Util();
module.exports.Wallet = function() { };
module.exports.Wallet.prototype.abandonTransaction = getWrapper('Wallet', 'abandonTransaction', false);
module.exports.Wallet.prototype.addMultiSigAddress = getWrapper('Wallet', 'addMultiSigAddress', false);
module.exports.Wallet.prototype.addWitnessAddress = getWrapper('Wallet', 'addWitnessAddress', false);
module.exports.Wallet.prototype.backupWallet = getWrapper('Wallet', 'backupWallet', false);
module.exports.Wallet.prototype.dumpPrivKey = getWrapper('Wallet', 'dumpPrivKey', false);
module.exports.Wallet.prototype.dumpWallet = getWrapper('Wallet', 'dumpWallet', false);
module.exports.Wallet.prototype.encryptWallet = getWrapper('Wallet', 'encryptWallet', false);
module.exports.Wallet.prototype.getAccount = getWrapper('Wallet', 'getAccount', false);
module.exports.Wallet.prototype.getAccountAddress = getWrapper('Wallet', 'getAccountAddress', false);
module.exports.Wallet.prototype.getAddressesByAccount = getWrapper('Wallet', 'getAddressesByAccount', false);
module.exports.Wallet.prototype.getBalance = getWrapper('Wallet', 'getBalance', false);

/**
 * Gets a new address for the provided account
 * @param {string} account - Name of the account
 * @type {string}
 */
module.exports.Wallet.prototype.getNewAddress = getWrapper('Wallet', 'getNewAddress', false);
module.exports.Wallet.prototype.getRawChangeAddress = getWrapper('Wallet', 'getRawChangeAddress', false);
module.exports.Wallet.prototype.getReceivedByAccount = getWrapper('Wallet', 'getReceivedByAccount', false);
module.exports.Wallet.prototype.getReceivedByAddress = getWrapper('Wallet', 'getReceivedByAddress', false);
module.exports.Wallet.prototype.getTransaction = getWrapper('Wallet', 'getTransaction', false);
module.exports.Wallet.prototype.getUnconfirmedBalance = getWrapper('Wallet', 'getUnconfirmedBalance', false);
module.exports.Wallet.prototype.getWalletInfo = getWrapper('Wallet', 'getWalletInfo', false);
module.exports.Wallet.prototype.importAddress = getWrapper('Wallet', 'importAddress', false);
module.exports.Wallet.prototype.importMulti = getWrapper('Wallet', 'importMulti', false);
module.exports.Wallet.prototype.importPrivKey = getWrapper('Wallet', 'importPrivKey', false);
module.exports.Wallet.prototype.importPrunedFunds = getWrapper('Wallet', 'importPrunedFunds', false);
module.exports.Wallet.prototype.importPubKey = getWrapper('Wallet', 'importPubKey', false);
module.exports.Wallet.prototype.importWallet = getWrapper('Wallet', 'importWallet', false);
module.exports.Wallet.prototype.keyPoolRefill = getWrapper('Wallet', 'keyPoolRefill', false);
module.exports.Wallet.prototype.getAccounts = getWrapper('Wallet', 'listAccounts', false);
module.exports.Wallet.prototype.listAddressGroupings = getWrapper('Wallet', 'listAddressGroupings', false);
module.exports.Wallet.prototype.listLockUnspent = getWrapper('Wallet', 'listLockUnspent', false);
module.exports.Wallet.prototype.listReceivedByAccount = getWrapper('Wallet', 'listReceivedByAccount', false);
module.exports.Wallet.prototype.listReceivedByAddress = getWrapper('Wallet', 'listReceivedByAddress', false);
module.exports.Wallet.prototype.listSinceBlock = getWrapper('Wallet', 'listSinceBlock', false);
module.exports.Wallet.prototype.getTransactions = getWrapper('Wallet', 'listTransactions', false);
module.exports.Wallet.prototype.listUnspent = getWrapper('Wallet', 'listUnspent', false);
module.exports.Wallet.prototype.lockUnspent = getWrapper('Wallet', 'lockUnspent', false);
module.exports.Wallet.prototype.move = getWrapper('Wallet', 'move', false);
module.exports.Wallet.prototype.removePrunedFunds = getWrapper('Wallet', 'removePrunedFunds', false);
module.exports.Wallet.prototype.sendFrom = getWrapper('Wallet', 'sendFrom', false);
module.exports.Wallet.prototype.sendMany = getWrapper('Wallet', 'sendMany', false);
module.exports.Wallet.prototype.sendToAddress = getWrapper('Wallet', 'sendToAddress', false);
module.exports.Wallet.prototype.setAccount = getWrapper('Wallet', 'setAccount', false);
module.exports.Wallet.prototype.setTxFee = getWrapper('Wallet', 'setTxFee', false);
module.exports.Wallet.prototype.signMessage = getWrapper('Wallet', 'signMessage', false);
module.exports.Wallet.prototype.walletpassphrase = getWrapper('Wallet', 'walletpassphrase', false);
module.exports.Wallet = new module.exports.Wallet();