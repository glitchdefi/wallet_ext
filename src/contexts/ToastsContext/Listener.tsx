import React from 'react';
import { ToastContainer } from 'app/components/Toast';
import { useToast } from 'hooks/useToast';

const ToastListener: React.FC = () => {
  const { toasts, remove } = useToast();

  const handleRemove = (id: string) => remove(id);

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />;
};

export default ToastListener;
