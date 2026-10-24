import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultContent, cloneContent } from '../src/content/defaults';
import { editableItems, replaceEditableItem } from '../src/admin/visualEditing.ts';
test('a visual edit replaces only the selected item without mutating the saved preview', () => {
  const content = cloneContent(defaultContent);
  const original = content.pageContent[0];
  const next = replaceEditableItem(content, 'pageContent', {...original,vi:'New headline'});
  assert.equal(content.pageContent[0].vi, original.vi);
  assert.equal(next.pageContent[0].vi, 'New headline');
  assert.deepEqual(next.collections,content.collections);
});
test('visual selection resolves collection cards and rejects stale targets', () => {
  const items = editableItems(defaultContent,'serviceCards');
  assert.ok(items.length);
  const next=replaceEditableItem(defaultContent,'serviceCards',{...items[0],published:false});
  assert.equal(next.collections.serviceCards[0].published,false);
  assert.equal(defaultContent.collections.serviceCards[0].published,true);
  assert.throws(()=>replaceEditableItem(defaultContent,'serviceCards',{id:'missing'}),/no longer exists/);
});
