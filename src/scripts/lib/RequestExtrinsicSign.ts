import type { KeyringPair } from '@polkadot/keyring/types';
import type { SignerPayloadJSON } from '@polkadot/types/types';
import type { RequestSign } from './types';

import { TypeRegistry } from '@polkadot/types';

export default class RequestExtrinsicSign implements RequestSign {
  public readonly payload: SignerPayloadJSON;

  constructor(payload: SignerPayloadJSON) {
    this.payload = payload;
  }

  sign(registry: TypeRegistry, pair: KeyringPair): { signature: any } {
    return registry
      .createType('ExtrinsicPayload', this.payload, {
        version: this.payload.version,
      })
      .sign(pair);
  }
}
