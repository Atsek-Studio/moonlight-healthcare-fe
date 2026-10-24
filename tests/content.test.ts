import { upgradeContactContent, isValidPhone, isExternalWebUrl, locationQuery, directionsUrl } from '../src/content/contact.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as clinic from '../src/data/clinic.ts';
import { validateContent, validateItem, safeImageUrl, toPublishedContent, contentSections } from '../src/content/schema.ts';
function fixture() {return upgradeContactContent({schemaVersion:1,collections:Object.fromEntries(Object.entries(clinic).map(([key,items])=>[key,items.map(item=>({...item,published:true}))])),pageContent:JSON.parse(fs.readFileSync(new URL('../src/content/pageDefaults.json',import.meta.url),'utf8'))});}
test('the migrated public content is valid',()=>assert.equal(validateContent(fixture()).schemaVersion,1));
test('publishing strips hidden entries from the public document without altering the draft',()=>{
  const content=fixture();content.collections.serviceCards[0].published=false;
  const published=toPublishedContent(content);
  assert.equal(published.collections.serviceCards.length,5);
  assert.ok(!published.collections.serviceCards.find(item=>item.id==='service-card-1'));
  assert.equal(content.collections.serviceCards.length,6);
  published.pageContent[0].alt='Changed';assert.notEqual(content.pageContent[0].alt,'Changed');
});
test('publishing an empty collection does not restore starter cards',()=>{
  const content=fixture();content.collections.serviceCards=[];assert.deepEqual(toPublishedContent(content).collections.serviceCards,[]);
});
test('duplicate IDs are rejected before saving',()=>{
  const content=fixture();content.collections.serviceCards.push({...content.collections.serviceCards[0]});assert.throws(()=>validateContent(content),/duplicate ID/);
});
test('non-string content and missing collections are rejected',()=>{
  const content=fixture();Object.assign(content.collections.serviceCards[0],{title:{html:'unsafe'}});assert.throws(()=>validateContent(content),/Invalid Title/);
  Reflect.deleteProperty(content.collections,'doctorCards');assert.throws(()=>validateContent(content));
});
test('image inputs reject executable and data URLs',()=>{
  for(const value of ['javascript:alert(1)','data:image/svg+xml,<svg/>','ftp://example.com/a.jpg']) assert.equal(safeImageUrl(value),false);
  for(const value of ['https://example.com/a.jpg','/images/herb.jpg','images/herb.jpg','']) assert.equal(safeImageUrl(value),true);
});
test('required fields block blank cards and invalid image URLs',()=>{
  const section=contentSections.find(section=>section.key==='serviceCards');assert.ok(section);
  assert.match(validateItem(section,{title:' ',description:'Example'}),/Title is required/);
  assert.match(validateItem(section,{title:'Example',description:'Example',image:'javascript:alert(1)'}),/HTTP/);
});

test('existing content gains contact settings without replacing existing cards or page copy',()=>{
  const old=fixture();Reflect.deleteProperty(old.collections,'contactInfo');Reflect.deleteProperty(old.collections,'locations');
  const upgraded=upgradeContactContent(old);
  assert.equal(upgraded.collections.contactInfo.length,1);
  assert.deepEqual(upgraded.collections.locations,[]);
  assert.deepEqual(upgraded.collections.serviceCards,old.collections.serviceCards);
  assert.ok(!Object.hasOwn(old.collections,'contactInfo'));
  assert.equal(validateContent(upgraded).schemaVersion,1);
});
test('saved contact settings and an empty location list survive upgrades',()=>{
  const content=fixture();content.collections.contactInfo[0].phone='+84 901 234 567';
  assert.equal(upgradeContactContent(content).collections.contactInfo[0].phone,'+84 901 234 567');
  assert.deepEqual(upgradeContactContent(content).collections.locations,[]);
});
test('invalid contact channels cannot be saved',()=>{
  const section=contentSections.find(section=>section.key==='contactInfo');assert.ok(section);
  assert.match(validateItem(section,{zaloUrl:'javascript:alert(1)'}),/HTTP/);
  assert.match(validateItem(section,{zaloUrl:'/local-path'}),/HTTP/);
  assert.match(validateItem(section,{email:'not-an-email'}),/valid email/);
  assert.match(validateItem(section,{phone:'call-me'}),/digits/);
  assert.equal(validateItem(section,{phone:'+84 901 234 567',email:'clinic@example.com',zaloUrl:'https://zalo.me/84901234567'}),'');
  assert.equal(isValidPhone('++++'),false);assert.equal(isExternalWebUrl('data:text/html,example'),false);
});
test('publishing keeps contact settings but removes hidden clinic locations',()=>{
  const content=fixture();content.collections.locations=[{id:'a',title:'Visible clinic',address:'Example address',published:true},{id:'b',title:'Hidden clinic',address:'Private draft address',published:false}];
  const published=toPublishedContent(content);
  assert.equal(published.collections.locations.length,1);assert.equal(published.collections.contactInfo.length,1);
  assert.equal(content.collections.locations.length,2);
});
test('map URLs safely encode the chosen location and fall back to its address',()=>{
  const location={address:'Example clinic & garden',mapQuery:''};
  assert.equal(locationQuery(location),location.address);
  assert.equal(new URL(directionsUrl(location)).searchParams.get('query'),location.address);
  assert.equal(locationQuery({address:'Address',mapQuery:'10.75,106.67'}),'10.75,106.67');
});
test('contact settings cannot be deleted or hidden',()=>{
  const content=fixture();content.collections.contactInfo=[];assert.throws(()=>validateContent(content),/exactly one/);
});
