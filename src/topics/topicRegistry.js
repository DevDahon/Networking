import {expandLessonTerms} from '../components/terminology.js';
import {withVisualExamples} from './visualExamples.js';
import {sequenceTopic} from './sequenceTopics.js';
import {clarifyTopic} from './clarifyTopics.js';
import t01 from './01-introduction-to-networking.js';
import t03 from './03-network-topologies.js';
import t04 from './04-network-devices.js';
import osi from './osi-reference-model.js';
import t06 from './06-network-cables-media.js';
import t07 from './07-rj45-crimping.js';
import t08 from './08-ip-addressing.js';
import t10 from './10-static-ip.js';
import protocols from './network-protocols-services.js';
import t11 from './11-dhcp.js';
import t12 from './12-router-wireless.js';
import t13 from './13-file-printer-sharing.js';
import t14 from './14-network-troubleshooting.js';
import {withAdditionalDemo} from './additionalDemos.js';

// IDs are permanent route/storage identities. Numbers describe curriculum order.
export const topics=[t01,t03,t04,osi,t06,t07,t08,t10,protocols,t11,t12,t13,t14].map((topic,index)=>({...expandLessonTerms(clarifyTopic(sequenceTopic(withVisualExamples(withAdditionalDemo(topic))))),number:index+1}));
