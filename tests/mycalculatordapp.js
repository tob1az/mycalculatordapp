const assert = require('assert')
const anchor = require('@coral-xyz/anchor')
const { SystemProgram } = anchor.web3
describe('mycalculatordapp', () => {
    const provider = anchor.getProvider()
    anchor.setProvider(provider)
    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalculatordapp

    it('Creates a calculator', async () => {
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

    it('Adds 2 numbers', async () => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(40), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.deepEqual(account.result, new anchor.BN(42))
    })

    it('Subtracts 2 numbers', async () => {
        await program.rpc.subtract(new anchor.BN(20), new anchor.BN(4), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.deepEqual(account.result, new anchor.BN(16))
    })

    it('Multiply 2 numbers', async () => {
        await program.rpc.multiply(new anchor.BN(20), new anchor.BN(4), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.deepEqual(account.result, new anchor.BN(80))
    })

    it('Divide 2 numbers', async () => {
        await program.rpc.divide(new anchor.BN(21), new anchor.BN(4), {
            accounts: {
                calculator: calculator.publicKey
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.deepEqual(account.result, new anchor.BN(5))
        assert.deepEqual(account.remainder, new anchor.BN(1))
    })

})