import {it,expect} from 'vitest';
import {expandAbbreviations} from '../src/components/terminology.js';
it('places definitions inline without repeating an existing full name',()=>{
 expect(expandAbbreviations('A LAN connects devices.')).toBe('A Local Area Network (LAN) connects devices.');
 expect(expandAbbreviations('Local Area Network (LAN)')).toBe('Local Area Network (LAN)');
 expect(expandAbbreviations('DNS resolves names; DNS caches records.')).toBe('Domain Name System (DNS) resolves names; DNS caches records.');
});
