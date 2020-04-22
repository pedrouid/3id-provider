import BasicProvider from 'basic-provider';

import { ThreeIdAuthOptions } from './interfaces';

class ThreeIdProvider extends BasicProvider {
  get is3idProvider(): boolean {
    return true;
  }

  public async enable(authOpts: ThreeIdAuthOptions): Promise<any> {
    try {
      if (!this.connected) {
        await this.open();
      }
      const result = await this.send('3id_authenticate', authOpts);
      this.emit('enable');
      return result;
    } catch (err) {
      await this.close();
      throw err;
    }
  }
}

export default ThreeIdProvider;
