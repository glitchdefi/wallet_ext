import React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './message';

function Welcome(): JSX.Element {
  const { t } = useTranslation();

  return <div>{t(messages.title())}</div>;
}

export default Welcome;
