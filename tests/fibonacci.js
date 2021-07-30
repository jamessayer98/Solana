const anchor = require('@project-serum/anchor');
const assert = require("assert");

describe('fibonacci', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local(undefined, {
    commitment: 'finalized',
  });
  anchor.setProvider(provider);
  const program = anchor.workspace.Fibonacci;

  it('Is initialized!', async () => {
    await program.state.rpc.new(Buffer.from([1, 1]));
  });

  it('should calculate 3rd number correctly', async () => {
    await program.state.rpc.next();
    const state = await program.state.fetch();
    assert.equal(state.count, 3);
    assert.deepEqual(state.list.splice(0, 3), [1, 1, 2]);
  });

  it('should calculate 5th number correctly', async () => {
    await program.state.rpc.next();
    await program.state.rpc.next();
    const state = await program.state.fetch();
    assert.equal(state.count, 5);
    assert.deepEqual(state.list.splice(0, 5), [1, 1, 2, 3, 5]);
  });

  it('demonstrate failing example', async () => {
    await program.state.rpc.next();
    await program.state.rpc.next();
    const state = await program.state.fetch();
    assert.equal(state.count, 7);
    // should be [1, 1, 2, 3, 5, 8, 13]
    assert.deepEqual(state.list.splice(0, 7), [1, 1, 2, 3, 5, 8, 15]);
  });
});
