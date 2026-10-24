import { ContentText } from "../content/ContentText";
import { useEffect, useRef } from 'react';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function InfoDialog() {
  const {
    dialog,
    closeDialog
  } = useClinicDialog();
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (dialog && !element.open) element.showModal();
    if (!dialog && element.open) element.close();
  }, [dialog]);
  return <dialog ref={ref} className="modal" aria-labelledby="modalTitle" aria-describedby="modalText" onCancel={closeDialog} onClose={closeDialog} onClick={event => {
    if (event.target === ref.current) closeDialog();
  }}>
    <div className="modal-inner"><button type="button" className="modal-close" aria-label="Đóng" onClick={closeDialog}>×</button>
      <span className="eyebrow"><ContentText id="infodialog-1" /></span><h3 id="modalTitle">{dialog?.title}</h3><p id="modalText">{dialog?.text}</p>
      <div className="modal-actions"><a href="#booking" className="btn btn-primary" onClick={closeDialog}><ContentText id="infodialog-2" /></a><button type="button" className="btn btn-outline" onClick={closeDialog}><ContentText id="infodialog-3" /></button></div>
    </div>
  </dialog>;
}
