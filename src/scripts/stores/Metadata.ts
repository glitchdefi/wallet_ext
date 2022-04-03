import type { MetadataDef } from '@polkadot/extension-inject/types';
import { EXTENSION_PREFIX } from '../../constants/messages';
import BaseStore from './Base';

export default class MetadataStore extends BaseStore<MetadataDef> {
  constructor() {
    super(`${EXTENSION_PREFIX}metadata`);
  }
}
