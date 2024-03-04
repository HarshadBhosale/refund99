import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SendAndReceive } from '../wrappers/SendAndReceive';
import '@ton/test-utils';

describe('SendAndReceive', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sendAndReceive: SandboxContract<SendAndReceive>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sendAndReceive = blockchain.openContract(await SendAndReceive.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sendAndReceive.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sendAndReceive.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sendAndReceive are ready to use
    });
});
