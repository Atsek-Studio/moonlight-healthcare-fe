import { VideoPlayer } from './VideoPlayer';
import { ContentText } from "../content/ContentText";
import { useEffect, useRef } from 'react';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function InfoDialog() {
  const {
    dialog,
    closeDialog
  } = useClinicDialog();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (dialog && !element.open) element.showModal();
    if (!dialog && element.open) element.close();
  }, [dialog]);
  return <dialog ref={ref} className={dialog?.video ? "modal modal-video" : "modal"} aria-labelledby="modalTitle" aria-describedby="modalText" onCancel={closeDialog} onClose={closeDialog} onClick={event => {
    if (event.target === ref.current) closeDialog();
  }}>
    <div className="modal-inner"><button type="button" className="modal-close" aria-label="Đóng" onClick={closeDialog}>×</button>
      <span className="eyebrow">{dialog?.video ? "GÓC VIDEO" : <ContentText id="infodialog-1" />}</span><h3 id="modalTitle">{dialog?.title}</h3><p id="modalText">{dialog?.text}</p>
      {dialog?.video && <VideoPlayer key={dialog.video.media.sourceUrl} video={dialog.video} />}
      <div className="modal-actions">{!dialog?.video && <a href="#booking" className="btn btn-primary" onClick={closeDialog}><ContentText id="infodialog-2" /></a>}<button type="button" className="btn btn-outline" onClick={closeDialog}><ContentText id="infodialog-3" /></button></div>
    </div>
  </dialog>;
}
