import { EventEmitter } from 'events';
import { IJsonRpcConnection } from '@json-rpc-tools/utils';

export class MockIdentityWallet {
  dispatch(payload: any) {}
}

export class MockRpcConnection extends IJsonRpcConnection {
  public events = new EventEmitter();

  public connected: boolean = false;

  constructor(private readonly identityWallet: MockIdentityWallet) {
    super();
  }

  public on(event: string, listener: any): void {
    this.events.on(event, listener);
  }

  public once(event: string, listener: any): void {
    this.events.once(event, listener);
  }

  public off(event: string, listener: any): void {
    this.events.off(event, listener);
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
