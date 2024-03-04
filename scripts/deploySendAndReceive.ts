import { toNano } from '@ton/core';
import { SendAndReceive } from '../wrappers/SendAndReceive';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sendAndReceive = provider.open(await SendAndReceive.fromInit());

    await sendAndReceive.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sendAndReceive.address);

    // run methods on `sendAndReceive`
}
