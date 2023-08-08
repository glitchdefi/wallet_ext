import React from 'react';
import { PageLayout } from 'app/layouts';
import isEmpty from 'lodash/isEmpty';

import { useSigningReq } from 'contexts/SigningReqContext/hooks';
import { SubstrateSignRequest } from './components/SubstrateSignRequest';
import { EvmApprovalRequest } from './components/EvmApprovalRequest';
import { EvmSignTypedData } from './components/EvmSignTypedData';

const Signing: React.FC = () => {
  const { signRequests } = useSigningReq();

  const request = !isEmpty(signRequests) ? signRequests[0] : ({} as any);

  const { decodedData, typedDataJSON } = request?.request?.payload || {};

  return (
    <PageLayout>
      {!decodedData && !typedDataJSON && (
        <SubstrateSignRequest request={request} />
      )}
      {decodedData && !typedDataJSON && (
        <EvmApprovalRequest request={request} />
      )}
      {!decodedData && typedDataJSON && <EvmSignTypedData request={request} />}
    </PageLayout>
  );
};

export default Signing;
