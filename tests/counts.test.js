import {it,expect,afterEach} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {startApp} from '../src/app.js';
import {addPresenterNotes} from '../src/topics/createTopic.js';
import {T568A,T568B,subnet} from '../src/utils/network.js';
const words={one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
const counted=topics.flatMap(topic=>topic.slides.flatMap((slide,index)=>slide.expectedCount?[{topic,slide,index}]:[]));
let cleanup;
afterEach(()=>{cleanup?.();cleanup=null;});
it.each(counted.map(c=>[`${c.topic.number}: ${c.slide.title}`,c]))('renders the full stated count: %s',(_, {topic,slide,index})=>{
 const stated=slide.title.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten)\b/i);
 expect(stated).not.toBeNull();
 const count=words[stated[1].toLowerCase()];
 expect(slide.expectedCount).toBe(count);
 document.body.innerHTML='<div id="app"></div>';
 history.replaceState(null,'',`/#/topic/${topic.id}/slide/${index+1}`);
 cleanup=startApp(document.querySelector('#app'));
 const rows=[...document.querySelectorAll('.teaching-points>li')];
 expect(rows).toHaveLength(count);
 expect(rows.map(row=>row.querySelector('.point-index').textContent)).toEqual(slide.itemLabels||Array.from({length:count},(_,i)=>String(i+1).padStart(2,'0')));
 expect(new Set(rows.map(row=>row.textContent)).size).toBe(count);
 if(slide.footnote)expect(document.querySelector('.list-explanation').textContent).toBe(slide.footnote);
});
it('rejects lesson data that groups a claimed count into too few entries',()=>{
 expect(()=>addPresenterNotes([{title:'Five parts',expectedCount:5,items:['Sender + receiver','Message + medium','Protocol']}],{title:'Example',description:'Example',example:'Example'})).toThrow('must display 5 separate items');
});
it('both wiring reference slides enumerate the exact eight standard pins',()=>{
 const cable=topics.find(t=>t.id==='06-network-cables-media');
 for(const [standard,order] of [['A',T568A],['B',T568B]]){
  const slide=cable.slides.find(s=>s.title.startsWith(`T568${standard}:`));
  expect(slide.items).toEqual(order.map((color,i)=>`Pin ${i+1}: ${color}.`));
 }
});
it('the four DHCP messages are displayed independently in protocol order',()=>{
 const slide=topics.find(t=>t.id==='11-dhcp').slides.find(s=>s.expectedCount===4);
 expect(slide.items.map(item=>item.split(':')[0])).toEqual(['Discover','Offer','Request','Acknowledgment (ACK)']);
});
it('the seven OSI rows use layer numbers rather than merged mapping groups',()=>{
 const slide=topics.find(t=>t.id==='osi-reference-model').slides.find(s=>s.expectedCount===7);
 expect(slide.itemLabels).toEqual(['7','6','5','4','3','2','1']);
 expect(slide.items.map(item=>item.split(':')[0])).toEqual(['Application','Presentation','Session','Transport','Network','Data Link','Physical']);
});
