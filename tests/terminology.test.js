import {it,expect} from 'vitest';
import {expandAbbreviations} from '../src/components/terminology.js';
import {topics} from '../src/topics/topicRegistry.js';
it('places definitions inline without repeating an existing full name or nesting parentheses',()=>{
 expect(expandAbbreviations('A LAN connects devices.')).toBe('A Local Area Network (LAN) connects devices.');
 expect(expandAbbreviations('Local Area Network (LAN)')).toBe('Local Area Network (LAN)');
 expect(expandAbbreviations('DNS resolves names; DNS caches records.')).toBe('Domain Name System (DNS) resolves names; DNS caches records.');
 expect(expandAbbreviations('Including a Wireless LAN (WLAN).')).toBe('Including a Wireless LAN (WLAN).');
 expect(expandAbbreviations('Time-to-Live (TTL) value')).toBe('Time-to-Live (TTL) value');
});
it('produces zero nested parenthetical expansions across all 14 curriculum topics',()=>{
 for(const topic of topics){
  for(const slide of topic.slides){
   for(const text of [slide.lead,...(slide.items||[])]){
    if(text)expect(text).not.toMatch(/\([^()]*\([^()]*\)/);
   }
  }
 }
});
