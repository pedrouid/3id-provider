import { EventEmitter } from 'events';

import { IRpcConnection } from '../../src';

export class MockIdentityWallet {
  dispatch(payload: any) {}
}

export class MockRpcConnection extends EventEmitter implements IRpcConnection {
  public connected: boolean = false;

  constructor(private readonly identityWallet: MockIdentityWallet) {
    super();
  }

  public async open(): Promise<void> {
    this.connected = true;
  }

  public async close(): Promise<void> {
    this.connected = false;
  }

  public async send(payload: any) {
    return this.identityWallet.dispatch(payload);
  }
}

export function getMockConnection() {
  const identityWallet = new MockIdentityWallet();
  return new MockRpcConnection(identityWallet);
}
