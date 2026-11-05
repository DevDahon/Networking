import {it,expect,beforeEach,afterEach,vi} from 'vitest';
import {topics} from '../src/topics/topicRegistry.js';
import {protocolCatalog,arpJourney,webJourney,mailJourney} from '../src/simulations/protocolModels.js';
import {protocolArp,protocolWeb,protocolMail,protocolDirectory} from '../src/simulations/protocols.js';
import {startApp} from '../src/app.js';
import {parseRoute} from '../src/router.js';
import {loadProgress,saveProgress} from '../src/utils/progress.js';
const topic=topics.find(t=>t.id==='network-protocols-services');
let root,dispose;
beforeEach(()=>{localStorage.clear();history.replaceState(null,'','/#/');document.body.innerHTML='<div id="app"></div>';root=document.querySelector('#app');});
afterEach(()=>{dispose?.();dispose=null;vi.useRealTimers();vi.restoreAllMocks();});
const click=a=>root.querySelector(`[data-action="${a}"]`).click();
const change=(name,value)=>{const e=root.querySelector(`[name="${name}"]`);e.value=value;e.dispatchEvent(new Event('change',{bubbles:true}));};
it('inserts the new topic at 11, with the old lessons retaining their routes',()=>{
 expect(topics).toHaveLength(16);expect(topics[10]).toBe(topic);expect(topic.number).toBe(11);
 expect(topics.slice(11).map(t=>[t.number,t.id])).toEqual([[12,'10-static-ip'],[13,'11-dhcp'],[14,'12-router-wireless'],[15,'13-file-printer-sharing'],[16,'14-network-troubleshooting']]);
 expect(topic.slides).toHaveLength(29);expect(topic.slides[0]).toMatchObject({kind:'title',title:topic.title});expect(topic.slides[1].title).toBe('Learning Objectives');expect(topic.slides.at(-1).title).toBe('Summary of the Discussion');
});
it('covers all seventeen requested protocols with explicit purpose, application, and layer guidance',()=>{
 expect(protocolCatalog.map(p=>p.id)).toEqual(['TCP','UDP','IP','ARP','ICMP','DHCP','DNS','HTTP','HTTPS','FTP','SFTP','SSH','SMTP','POP3','IMAP','SNMP','NTP']);
 for(const p of protocolCatalog){expect(p.purpose.length).toBeGreaterThan(35);expect(p.use.length).toBeGreaterThan(35);expect(p.layer).toMatch(/OSI|Link/);expect(p.detail.length).toBeGreaterThan(60);}
 expect(topic.slides.some(s=>['quiz','lab','activity','assessment'].includes(s.kind))).toBe(false);
});
it.each([
 ['DHCP',['UDP:67','UDP:68']],['DNS',['UDP:53','TCP:53']],['HTTP',['TCP:80']],['HTTPS',['TCP:443','UDP:443']],
 ['FTP',['TCP:21','TCP:20']],['SSH',['TCP:22']],['SFTP',['TCP:22']],['SMTP',['TCP:25','TCP:587','TCP:465']],
 ['POP3',['TCP:110','TCP:995']],['IMAP',['TCP:143','TCP:993']],['SNMP',['UDP:161','UDP:162']],['NTP',['UDP:123']]
])('records common %s transport endpoints correctly',(id,bindings)=>expect(protocolCatalog.find(p=>p.id===id).ports.map(b=>`${b.transport}:${b.number}`)).toEqual(bindings));
it('distinguishes protocols without a single service port from TCP/UDP service bindings',()=>{for(const id of ['TCP','UDP','IP','ARP','ICMP'])expect(protocolCatalog.find(p=>p.id===id).ports).toEqual([]);expect(protocolCatalog.find(p=>p.id==='SFTP').detail).toContain('Port 115');expect(protocolCatalog.find(p=>p.id==='FTP').ports[1].role).toContain('passive');});
it('ARP distinguishes local delivery from gateway framing for remote IPv4 delivery',()=>{
 const local=arpJourney('192.168.1.20'),remote=arpJourney('192.168.2.20');
 expect(local[0].text).toContain('next-hop IPv4 address is 192.168.1.20');expect(remote[0].text).toContain('next-hop IPv4 address is 192.168.1.1');
 expect(remote.at(-1).text).toContain('IP packet destination: 192.168.2.20');expect(remote.at(-1).text).toContain('02:00:00:00:00:01');
 expect(arpJourney('192.168.1.30')[0].text).toContain('destination 192.168.1.30'.replace('destination','Destination'));
});
it('web fault conditions change the modeled path rather than displaying unrelated responses',()=>{
 expect(webJourney()).toHaveLength(9);expect(webJourney().at(-1).text).toContain('HTTP 200');
 const dns=webJourney({dns:false});expect(dns).toHaveLength(3);expect(dns.at(-1).ok).toBe(false);expect(dns.some(s=>s.title==='Establish TCP')).toBe(false);
 const tls=webJourney({certificate:false});expect(tls).toHaveLength(7);expect(tls.at(-1).text).toContain('Certificate validation fails');
 const service=webJourney({service:false});expect(service).toHaveLength(9);expect(service.at(-1).text).toContain('HTTP 503');
});
it('mail separates submission, relay, retrieval, and configurable POP3 retention',()=>{
 expect(mailJourney()[1].text).toContain('TCP 587');expect(mailJourney()[2].text).toContain('TCP 25');expect(mailJourney()[4].text).toContain('TCP 993');
 expect(mailJourney({reader:'POP3',keepCopy:true})[4].text).toContain('TCP 995');expect(mailJourney({reader:'POP3',keepCopy:true}).at(-1).text).toContain('leave the server copy');
 expect(mailJourney({reader:'POP3',keepCopy:false}).at(-1).text).toContain('server copy is removed');
});
it('protocol directory displays all seventeen selectors and each individual port binding',()=>{protocolDirectory(root);expect(root.querySelectorAll('[data-protocol]')).toHaveLength(17);for(const p of protocolCatalog){root.querySelector(`[data-protocol="${p.id}"]`).click();expect(root.querySelectorAll('[data-binding]')).toHaveLength(p.ports.length);expect(root.querySelector('.feedback').textContent).toBe(p.detail);for(let i=0;i<p.ports.length;i++){root.querySelector(`[data-binding="${i}"]`).click();expect(root.querySelector(`[data-binding="${i}"]`).getAttribute('aria-pressed')).toBe('true');}}});
it('automatic web playback pauses, resumes, steps, resets, and stops at the final state',()=>{
 vi.useFakeTimers();dispose=protocolWeb(root);click('play');vi.advanceTimersByTime(2000);expect(root.querySelector('.step-card').textContent).toContain('Stage 2 of 9');click('pause');vi.advanceTimersByTime(10000);expect(root.querySelector('.step-card').textContent).toContain('Stage 2 of 9');click('resume');change('speed','2');vi.advanceTimersByTime(1000);expect(root.querySelector('.step-card').textContent).toContain('Stage 3 of 9');click('previous');expect(vi.getTimerCount()).toBe(0);click('advance');click('reset');expect(root.querySelector('.step-card').textContent).toContain('Stage 1 of 9');click('play');vi.advanceTimersByTime(8000);expect(root.querySelector('.step-card').textContent).toContain('HTTP 200');expect(vi.getTimerCount()).toBe(1);vi.advanceTimersByTime(1000);expect(root.querySelector('.step-card').textContent).toContain('Complete');expect(vi.getTimerCount()).toBe(0);
});
it('changing the live scenario cancels playback and generates the fault path',()=>{vi.useFakeTimers();dispose=protocolWeb(root);click('play');change('dns','no');expect(vi.getTimerCount()).toBe(0);click('advance');click('advance');expect(root.querySelector('.step-card').textContent).toContain('Stage 3 of 3');expect(root.querySelector('.protocol-fault')).not.toBeNull();});
it('ARP manual controls preserve the destination and show derived frame addressing',()=>{dispose=protocolArp(root);change('destination','192.168.1.20');for(let i=0;i<4;i++)click('advance');expect(root.querySelector('.step-card').textContent).toContain('IP packet destination: 192.168.1.20');click('reset');expect(root.querySelector('[name="destination"]').value).toBe('192.168.1.20');});
it('mail controls explain both retention settings without grading',()=>{dispose=protocolMail(root);change('reader','POP3');change('keep','no');for(let i=0;i<5;i++)click('advance');expect(root.querySelector('.step-card').textContent).toContain('server copy is removed');expect(root.querySelector('[data-choice]')).toBeNull();});
it('leaving a protocol demonstration disposes timers through the existing shell',()=>{vi.useFakeTimers();const index=topic.slides.findIndex(s=>s.type==='protocolWeb');history.replaceState(null,'',`/#/topic/${topic.id}/slide/${index+1}`);dispose=startApp(root);vi.advanceTimersByTime(0);click('play');expect(vi.getTimerCount()).toBe(1);history.replaceState(null,'','/#/topic/10-static-ip/slide/1');window.dispatchEvent(new HashChangeEvent('hashchange'));vi.advanceTimersByTime(0);expect(vi.getTimerCount()).toBe(0);expect(root.querySelector('.slide-body>h2').textContent).toBe('Static Internet Protocol (IP) Configuration');});
it('preserves prior positions and archived results under their original identities',()=>{saveProgress({version:1,topics:{'10-static-ip':{slide:4,quizScore:3},'11-dhcp':{slide:5,quizScore:4},'14-network-troubleshooting':{slide:3}}});const stored=loadProgress();expect(parseRoute('#/topic/10-static-ip',topics,stored)).toMatchObject({index:4,topic:{number:12}});expect(parseRoute('#/topic/11-dhcp',topics,stored)).toMatchObject({index:5,topic:{number:13}});history.replaceState(null,'',`/#/topic/${topic.id}/slide/1`);dispose=startApp(root);expect(loadProgress().topics['11-dhcp']).toMatchObject({slide:5,quizScore:4});});
