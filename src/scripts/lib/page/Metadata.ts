import type {
  InjectedMetadata,
  InjectedMetadataKnown,
  MetadataDef,
} from '@polkadot/extension-inject/types';

// External to class, this.# is not private enough (yet)
let sendRequest: any;

export default class Metadata implements InjectedMetadata {
  constructor(_sendRequest: any) {
    sendRequest = _sendRequest;
  }

  public get(): Promise<InjectedMetadataKnown[]> {
    return sendRequest('pub(metadata.list)');
  }

  public provide(definition: MetadataDef): Promise<boolean> {
    return sendRequest('pub(metadata.provide)', definition);
  }
}
