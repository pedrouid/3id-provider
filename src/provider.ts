import JsonRpcProvider from '@json-rpc-tools/provider';
import { formatJsonRpcRequest } from '@json-rpc-tools/utils';

import { ThreeIdAuthOptions } from './interfaces';

class ThreeIdProvider extends JsonRpcProvider {
  get is3idProvider(): boolean {
    return true;
  }

  public async enable(authOpts: ThreeIdAuthOptions): Promise<any> {
    try {
      if (!this.connection.connected) {
        await this.connect();
      }
      const request = formatJsonRpcRequest('3id_authenticate', authOpts);
      const result = await this.request(request);
      this.events.emit('enable');
      return result;
    } catch (err) {
      await this.disconnect();
      throw err;
    }
  }
}

export default ThreeIdProvider;
