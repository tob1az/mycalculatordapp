const assert = require('assert')
const anchor = require('@coral-xyz/anchor')
const {SystemProgram} = anchor.web3
describe('mycalculatordapp', () => {
    const provider = anchor.getProvider()
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalculatordapp

    it('Creates a calculator', async() => {
        await program.rpc.create('Hello world', {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting == 'Hello world')
    })

})