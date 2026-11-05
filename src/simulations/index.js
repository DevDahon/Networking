import {introConnections,introConnectivity,introExchange} from './intro.js';
import {communication,coverage,topology,deviceExplorer,osi,mediaExplorer} from './foundations.js';
import {cable,addressExplorer,staticIP} from './addressing.js';
import {dhcp,router,fileSharing,troubleshooting} from './services.js';
import {osiIntroduction,osiStack,osiLayer,osiJourney,osiComparison,osiDevices,osiTroubleshooting} from './osi.js';
import {protocolArp,protocolWeb,protocolMail,protocolDirectory} from './protocols.js';
import {transferDemo,availabilityDemo,pathTraceDemo,layerBoundaryDemo,nextHopFrameDemo,mediumBudgetDemo,pairScanDemo,bitwiseDemo,partitionDemo,asymmetricDemo,guestIsolationDemo,ttlTraceDemo} from './extraScenes.js';
import {macLearningDemo,dnsCacheDemo,reservedPoolDemo,printQueueDemo} from './extraStateful.js';
export const simulations={introConnections,introConnectivity,introExchange,communication,coverage,topology,devices:deviceExplorer,osi,media:mediaExplorer,cable,ipv4:r=>addressExplorer(r),subnet:r=>addressExplorer(r,true),static:staticIP,dhcp,router,sharing:fileSharing,troubleshoot:troubleshooting,osiIntroduction,osiStack,osiLayer,osiJourney,osiComparison,osiDevices,osiTroubleshooting,protocolArp,protocolWeb,protocolMail,protocolDirectory,transferDemo,availabilityDemo,pathTraceDemo,layerBoundaryDemo,nextHopFrameDemo,mediumBudgetDemo,pairScanDemo,bitwiseDemo,partitionDemo,asymmetricDemo,guestIsolationDemo,ttlTraceDemo,macLearningDemo,dnsCacheDemo,reservedPoolDemo,printQueueDemo};
