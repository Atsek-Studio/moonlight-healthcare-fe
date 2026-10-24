import type { Confirmation } from '../../types';
import { useEffect, useRef } from 'react';
export function ConfirmDialog({
  confirmation,
  onClose
}: {confirmation:Confirmation|null;onClose:()=>void}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (confirmation) ref.current!.showModal();else ref.current!.close();
  }, [confirmation]);
  return <dialog ref={ref} className="cms-confirm" aria-labelledby="cms-confirm-title" onCancel={onClose}>
    <h2 id="cms-confirm-title">{confirmation?.title}</h2><p>{confirmation?.description}</p><div className="cms-actions"><button className="cms-button" onClick={onClose}>Cancel</button><button className="cms-button cms-primary" onClick={() => {
        confirmation?.action();
        onClose();
      }}>{confirmation?.label || 'Continue'}</button></div>
  </dialog>;
}
