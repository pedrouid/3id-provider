import EventEmitter from 'eventemitter3';

import { IRpcConnection, ThreeIdAuthOptions } from './interfaces';
import { payloadId } from './utils';

class ThreeIdProvider extends EventEmitter {
  private _connected = false;
  private connection: IRpcConnection;

  constructor(connection: IRpcConnection) {
    super();
    this.connection = connection;
  }

  get is3idProvider(): boolean {
    return true;
  }

  set connected(value: boolean) {
    this._connected = value;
    if (value === true) {
      this.emit('connect');
    } else {
      this.emit('close');
    }
  }

  get connected(): boolean {
    return this._connected;
  }

  public open(): void {
    new Promise((resolve, reject) => {
      this.connection.on('close', () => {
        this.connected = false;
        reject();
      });

      this.connection.on('connect', () => {
        this.connected = true;
        resolve();
      });

      this.connection.open();
    });
  }

  public close(): void {
    this.connected = false;
    this.connection.close();
  }

  public async enable(authOpts: ThreeIdAuthOptions): Promise<string> {
    try {
      if (!this.connected) {
        await this.open();
      }
      const result = await this.send('3id_authenticate', authOpts);
      this.emit('enable');
      return result;
    } catch (err) {
      this.connected = false;
      this.connection.close();
      throw err;
    }
  }

  public async send(method: string, params: any = {}): Promise<any> {
    return this.connection.send({
      id: payloadId(),
      jsonrpc: '2.0',
      method,
      params,
    });
  }
}

export default ThreeIdProvider;
