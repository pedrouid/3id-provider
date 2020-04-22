export interface IRpcConnection extends NodeJS.EventEmitter {
  connected: boolean;

  send(payload: any): Promise<any>;
  open(): Promise<void>;
  close(): Promise<void>;
}

export interface ThreeIdAuthOptions {
  address: string;
  spaces?: any;
  authData?: any;
}
