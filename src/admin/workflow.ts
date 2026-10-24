// Save and publish the exact revision returned by storage.
export async function saveAndPublish<T, R extends {version:number}>(
  {content, record, dirty}: {content?:T;record:R;dirty:boolean},
  storage: {saveDraft:(content:T,version:number)=>Promise<R>;publishDraft:(version:number)=>Promise<unknown>},
  onSaved: (record:R)=>void,
): Promise<R> {
  let next = record;
  if (dirty || !record.version) {
    if (content === undefined) throw new Error('Content is required to save a draft.');
    next = await storage.saveDraft(content, record.version);
    onSaved(next);
  }
  await storage.publishDraft(next.version);
  return next;
}
