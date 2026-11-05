import {describe,it,expect} from 'vitest';
import {ipv4,dotted,subnet,maskPrefix,classify,connectivity,T568A,T568B,cableTest,DHCP,sharing} from '../src/utils/network.js';
import {layouts,reachable,diagnosticState,diagnose,faults} from '../src/simulations/models.js';
describe('IPv4 and subnet calculations',()=>{
 it.each(['256.1.1.1','01.2.3.4','1.2.3','a.b.c.d','1.2.3.4.5','','-1.2.3.4'])('rejects invalid address %s',s=>expect(()=>ipv4(s)).toThrow());
 it.each([-1,33,2.5,'','abc'])('rejects invalid prefix %s',p=>expect(()=>subnet('192.168.1.1',p)).toThrow());
 it('converts the full unsigned range',()=>{expect(ipv4('255.255.255.255')).toBe(4294967295);expect(dotted(4294967295)).toBe('255.255.255.255');expect(dotted(0)).toBe('0.0.0.0');});
 it.each([[24,'255.255.255.0','192.168.10.0','192.168.10.255',254],[25,'255.255.255.128','192.168.10.0','192.168.10.127',126],[26,'255.255.255.192','192.168.10.64','192.168.10.127',62],[27,'255.255.255.224','192.168.10.64','192.168.10.95',30],[28,'255.255.255.240','192.168.10.64','192.168.10.79',14],[30,'255.255.255.252','192.168.10.68','192.168.10.71',2]])('calculates /%i',(p,mask,network,broadcast,usable)=>expect(subnet('192.168.10.70',p)).toMatchObject({mask,network,broadcast,usable}));
 it('handles /0, /31, /32',()=>{expect(subnet('192.168.10.70',0)).toMatchObject({network:'0.0.0.0',total:4294967296});expect(subnet('192.168.10.70',31)).toMatchObject({usable:2,broadcast:null,first:'192.168.10.70',last:'192.168.10.71'});expect(subnet('192.168.10.70',32)).toMatchObject({usable:1,total:1,broadcast:null,first:'192.168.10.70',last:'192.168.10.70'});});
 it('validates contiguous masks',()=>{expect(maskPrefix('255.255.255.192')).toBe(26);expect(()=>maskPrefix('255.0.255.0')).toThrow();});
 it.each(['10.2.3.4','172.16.0.0','172.31.255.255','192.168.2.1'])('classifies private %s',ip=>expect(classify(ip)).toMatch(/^Private/));
 it.each(['127.0.0.1','169.254.1.1','100.64.1.1','192.0.2.1','198.51.100.1','203.0.113.1','224.0.0.1','255.255.255.255'])('handles special %s',ip=>expect(classify(ip)).toMatch(/^Special/));
 it('does not call all 172 space private',()=>expect(classify('172.32.0.1')).toMatch(/^Global/));
});
describe('wire maps',()=>{
 it('has exact standard pin order',()=>{expect(T568A).toEqual(['White/Green','Green','White/Orange','Blue','White/Blue','Orange','White/Brown','Brown']);expect(T568B).toEqual(['White/Orange','Orange','White/Green','Blue','White/Blue','Green','White/Brown','Brown']);});
 it('passes straight standards and detects crossover',()=>{expect(cableTest(T568B,T568B)).toMatchObject({straight:true,standard:true,open:false,short:false});expect(cableTest(T568A,T568B).crossover).toBe(true);});
 it('derives open, short, and crossed paths',()=>{const end=[...T568B];end[0]='';expect(cableTest(T568B,end).open).toBe(true);end[0]=end[1];expect(cableTest(T568B,end).short).toBe(true);const swapped=[...T568B];[swapped[0],swapped[1]]=[swapped[1],swapped[0]];expect(cableTest(T568B,swapped).mapping[0]).toEqual([2]);expect(cableTest(T568B,swapped).straight).toBe(false);});
 it('does not confuse nonstandard straight continuity with certification',()=>{const a=[...T568B].reverse();expect(cableTest(a,a)).toMatchObject({straight:true,standard:false});});
});
const a={ip:'192.168.1.10',mask:'255.255.255.0',gateway:'192.168.1.1',dns:'192.168.1.1'};
describe('static connectivity',()=>{
 it('allows compatible hosts without gateway',()=>expect(connectivity({...a,gateway:''},{...a,ip:'192.168.1.20',gateway:''}).ok).toBe(true));
 it('detects duplicates, network addresses, bad masks, bad DNS, links',()=>{for(const b of [a,{...a,ip:'192.168.1.0'},{...a,ip:'192.168.1.20',mask:'255.0.255.0'},{...a,ip:'192.168.1.20',dns:'invalid'}])expect(connectivity(a,b).ok).toBe(false);expect(connectivity(a,{...a,ip:'192.168.1.20'},false,false).ok).toBe(false);});
 it('requires routing and valid local gateways across subnets',()=>{const b={...a,ip:'192.168.2.20',gateway:'192.168.2.1'};expect(connectivity(a,b).ok).toBe(false);expect(connectivity(a,b,true).ok).toBe(true);expect(connectivity(a,{...b,gateway:'192.168.1.1'},true).ok).toBe(false);});
});
describe('DHCP leases',()=>{
 it('assigns unique pool addresses and handles exhaustion',()=>{const d=new DHCP();expect(d.request('A').ip).toBe('192.168.1.100');expect(d.request('B').ip).toBe('192.168.1.101');expect(d.request('C').ip).toBe('192.168.1.102');expect(()=>d.request('D')).toThrow(/exhausted/);expect(d.request('A').ip).toBe('192.168.1.100');});
 it('releases, renews and expires predictably',()=>{const d=new DHCP();d.request('A');d.tick();expect(d.request('A').expires).toBe(90);d.release('A');expect(d.request('B').ip).toBe('192.168.1.100');d.tick();d.tick();expect(Object.keys(d.leases)).toHaveLength(0);});
 it('rejects invalid pools and unreachable service',()=>{expect(()=>new DHCP('192.168.2.100','192.168.2.102')).toThrow();const d=new DHCP();d.online=false;expect(()=>d.request('A')).toThrow(/No DHCP/);});
});
describe('topology, permissions and diagnostics',()=>{
 it('models star, mesh, ring and bus assumptions',()=>{expect(reachable(layouts.Star.nodes,layouts.Star.edges,0,0)).toHaveLength(4);expect(reachable(layouts.Star.nodes,layouts.Star.edges,0,-1,0)).toHaveLength(0);expect(reachable(layouts.Mesh.nodes,layouts.Mesh.edges,0,0)).toHaveLength(5);for(const k of ['Ring','Bus'])expect(reachable(layouts[k].nodes,layouts[k].edges,0,0,-1,k)).toEqual([0]);});
 it('requires both permission layers and identity',()=>{expect(sharing({share:2,ntfs:1,action:'Write'})).toMatch(/^Denied/);expect(sharing({share:2,ntfs:1,action:'Read'})).toMatch(/^Allowed/);expect(sharing({share:2,ntfs:2,action:'Write',authenticated:false})).toMatch(/^Denied/);});
 it('all nine faults produce evidence and repairs change results',()=>{expect(faults).toHaveLength(9);expect(diagnose(diagnosticState(0),'ipconfig')).toMatch(/disconnected/);expect(diagnose(diagnosticState(2),'ping 192.168.1.200')).toMatch(/No reply/);expect(diagnose(diagnosticState(6),'nslookup classroom.example')).toMatch(/timed out/);expect(diagnose(diagnosticState(7),'Open shared folder')).toMatch(/denied/);expect(diagnose(diagnosticState(-1),'Open shared folder')).toMatch(/opened/);});
});
