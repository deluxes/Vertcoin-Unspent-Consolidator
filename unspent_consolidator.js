const Vertcoin = require("./vertcoin");
const Decimal = require("decimal");


let from_address = '';
let to_address = '';
let walletpassphrase = '';
let unspentTransactions = [];

Vertcoin.Wallet.listUnspent(function (err, unspent) {
    for (var i in unspent) {
        let tx = unspent[i];
        if (tx.address === from_address) {
            unspentTransactions.push(tx);
        }
    }

    createSignedTransaction(unspentTransactions);
});


function createSignedTransaction(txs) {
    let inputs = [];
    let outputs = {};
    outputs[to_address] = 0;

    for (var i in txs) {
        let tx = txs[i];
        inputs.push({ txid: tx.txid, vout: tx.vout });
        outputs[to_address] = Decimal(outputs[to_address]).add(tx.amount).toNumber();
    }

    Vertcoin.Transactions.createRawTransaction(inputs, outputs, function (err, hex) {
        Vertcoin.Transactions.fundRawTransaction(hex, function (err, fundedHex) {
            Vertcoin.Wallet.walletpassphrase(walletpassphrase, 5, function (err, result) {
                Vertcoin.Transactions.signRawTransaction(fundedHex.hex, function (err, signedHex) {
                    Vertcoin.Transactions.sendRawTransaction(signedHex.hex, function (err, result) {
                        console.log(result);
                    });
                });
            });
        });
    });
}