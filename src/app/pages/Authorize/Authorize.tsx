import React from 'react';

import { useAuthorizeReq } from 'contexts/AuthorizeReqContext/hooks';

import { PageLayout } from 'app/layouts';
import Request from './Request';

const Authorize: React.FC = () => {
  const { authRequests } = useAuthorizeReq();

  return (
    <PageLayout>
      {authRequests.map(
        ({ id, request, url }): React.ReactNode => (
          <Request authId={id} key={id} request={request} url={url} />
        )
      )}
    </PageLayout>
  );
};

export default Authorize;
