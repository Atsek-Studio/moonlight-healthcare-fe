import { defaultContent, cloneContent } from '../src/content/defaults';
import test from 'node:test';
import assert from 'node:assert/strict';
import { saveAndPublish } from '../src/admin/workflow.ts';
import { stableString,changedSections,plainText,friendlyError } from '../src/admin/presentation.ts';
import { safeImageUrl } from '../src/content/schema.ts';
test('Update website saves edits then publishes the returned revision',async()=>{
 const calls: [string,number][]=[];let saved: {version:number;content:{text:string}} | undefined;
 const result=await saveAndPublish({content:{text:'new'},record:{version:4,content:{text:'old'}},dirty:true},{saveDraft:async(content,version)=>{calls.push(['save',version]);return {version:5,content};},publishDraft:async version=>calls.push(['publish',version])},record=>saved=record);
 assert.deepEqual(calls,[['save',4],['publish',5]]);assert.ok(saved);assert.equal(saved.version,5);assert.equal(result.version,5);
});
test('publishing a saved private draft does not create another revision',async()=>{
 let saves=0,published;
 await saveAndPublish({record:{version:8},dirty:false},{saveDraft:async()=>{saves++;return {version:9};},publishDraft:async version=>published=version},()=>{});
 assert.equal(saves,0);assert.equal(published,8);
});
test('a failed private save never publishes stale content',async()=>{
 let published=false;
 await assert.rejects(saveAndPublish({content:{text:'new'},record:{version:2},dirty:true},{saveDraft:async()=>{throw new Error('Conflict');},publishDraft:async()=>published=true},()=>{}),/Conflict/);
 assert.equal(published,false);
});
test('publication failure retains the successful private revision for retry',async()=>{
 let saved: {version:number;content:{text:string}} | undefined;
 await assert.rejects(saveAndPublish({content:{text:'new'},record:{version:2,content:{text:'old'}},dirty:true},{saveDraft:async content=>({content,version:3}),publishDraft:async()=>{throw new Error('Offline');}},record=>saved=record),/Offline/);
 assert.ok(saved);assert.equal(saved.version,3);assert.deepEqual(saved.content,{text:'new'});
});
test('comparison ignores JSON object-key ordering but retains list ordering',()=>{
 assert.equal(stableString({a:1,b:2}),stableString({b:2,a:1}));assert.notEqual(stableString([1,2]),stableString([2,1]));
 const base=cloneContent(defaultContent);base.collections.contactInfo[0].phone='1';
 const changed=cloneContent(base);changed.collections.contactInfo[0].phone='2';
 assert.deepEqual(changedSections(changed,base),['Contact information']);
});
test('plain-text editing hides emphasis markup from staff',()=>assert.equal(plainText('Care <em>every day</em>.'),'Care every day.'));
test('photo uploads accept bounded raster data, never SVG or HTML',()=>{
 assert.equal(safeImageUrl('data:image/jpeg;base64,/9j/AA=='),true);
 assert.equal(safeImageUrl('data:image/svg+xml;base64,PHN2Zz4='),false);
 assert.equal(safeImageUrl('data:text/html;base64,PHNjcmlwdD4='),false);
 assert.equal(safeImageUrl('data:image/jpeg;base64,'+'A'.repeat(240001)),false);
});

test('staff receive clear recovery messages instead of network or storage jargon',()=>{
 assert.match(friendlyError('Failed to fetch'),/edits are still here/);
 assert.match(friendlyError('QuotaExceededError'),/smaller photos/);
 assert.match(friendlyError('Could not find the table in the schema cache'),/website owner/);
 assert.equal(friendlyError('Another editor saved changes.'),'Another editor saved changes.');
});
