import React from 'react';
import { PageLayout } from 'app/layouts';
import isEmpty from 'lodash/isEmpty';

import { useSigningReq } from 'contexts/SigningReqContext/hooks';
import { SubstrateSignRequest } from './components/SubstrateSignRequest';
import { EvmApprovalRequest } from './components/EvmApprovalRequest';

const Signing: React.FC = () => {
  const { signRequests } = useSigningReq();

  const request = !isEmpty(signRequests) ? signRequests[0] : ({} as any);

  const { decodedData } = request?.request?.payload || {};
  const isSubstrateSigning = !decodedData;

  return (
    <PageLayout>
      {isSubstrateSigning ? (
        <SubstrateSignRequest request={request} />
      ) : (
        <EvmApprovalRequest request={request} />
      )}
    </PageLayout>
  );
};

export default Signing;
