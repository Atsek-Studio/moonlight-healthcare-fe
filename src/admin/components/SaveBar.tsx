export function SaveBar({
  editor,
  onPreview,
  onUpdate,
  onUndo,
  uploading
}: {editor:ReturnType<typeof import('../hooks/useContentEditor').useContentEditor>;onPreview:()=>void;onUpdate:()=>void;onUndo:()=>void;uploading:boolean}) {
  const state = uploading ? 'Uploading your photo…' : editor.busy ? 'Saving your changes…' : editor.dirty ? 'You have unsaved changes' : editor.pending ? 'Saved for later · Not on the website yet' : 'Your website is up to date';
  return <div className="cms-savebar"><div><strong role="status">{state}</strong><span>{editor.dirty || editor.pending ? 'Update the website when you want visitors to see them.' : 'You can safely make changes and preview them first.'}</span></div><div className="cms-actions">{editor.dirty && <button className="cms-text-button" disabled={editor.busy || uploading} onClick={onUndo}>Undo changes</button>}<button className="cms-button" disabled={editor.busy || uploading} onClick={onPreview}>Preview</button><button className="cms-button" disabled={editor.busy || uploading || !editor.dirty} onClick={() => editor.save()}>Save for later</button><button className="cms-button cms-primary" disabled={editor.busy || uploading || !editor.pending && !editor.dirty} onClick={onUpdate}>Update website</button></div></div>;
}
