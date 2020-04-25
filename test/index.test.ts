import ThreeIdProvider from '../src';

import { getMockConnection } from './shared';

describe('3id-provider', () => {
  it('should instantiate sucessfully', async () => {
    const connection = getMockConnection();
    const provider = new ThreeIdProvider(connection);
    expect(provider).toBeTruthy();
  });
});
