import {discussionData,simulationGuidance} from './discussionData.js';

export function addPresenterNotes(slides,{title,description,example,taglish}){
 slides.forEach((s,i)=>{
  if(s.expectedCount!==undefined&&s.items?.length!==s.expectedCount)throw new Error(`${title}: ${s.title} must display ${s.expectedCount} separate items.`);
  if(s.itemLabels&&s.itemLabels.length!==s.items.length)throw new Error(`${title}: every item in ${s.title} needs its own label.`);
  const existing=s.notes||{};
  s.notes={
   opening:s.kind==='title'?`Introduce ${title}. Use the visual to establish the subject, then move to the learning objectives.`:s.kind==='objectives'?`Explain the intended outcomes of the discussion: ${s.items.join(' ')}`:`Explain ${s.title.toLowerCase()}: ${s.lead||s.items?.[0]||description}`,
   emphasize:s.items?[...s.items,s.footnote||''].join(' ').trim():s.emphasis||s.lead||description,
   diagram:s.type?(simulationGuidance[s.type]||s.demo||s.lead||description):`Relate the labeled devices, connections, or example to ${title.toLowerCase()}. Distinguish the diagram from real equipment behavior.`,
   example:existing.example||example,
   demonstrate:s.type?(simulationGuidance[s.type]||s.demo||s.lead||description):s.kind==='title'?'Introduce the title without beginning a separate task; advance to Learning Objectives.':s.kind==='summary'?'Reinforce the stated takeaways, then use Restart Presentation or Back to Topics as needed.':'Explain each point in order. Where useful, return to the topic demonstration and change one configuration to illustrate the explanation.',
   transition:i<slides.length-1?`Next: ${slides[i+1].title}. Connect the current explanation to that part of the lesson.`:'The discussion is complete. Return to Topics or restart this presentation.',
   ...((existing.taglish||taglish)?{taglish:existing.taglish||taglish}:{})
  };
 });
 return slides;
}

export function topic({id,title,icon,description,objectives,concepts,application,demo,walkthrough=true}){
 const discussion=discussionData[id];
 const slides=[
  {kind:'title',title},
  {kind:'objectives',title:'Learning Objectives',lead:'At the end of this discussion, students should be able to:',items:objectives},
  ...concepts.map(({ask,...c})=>({kind:'concept',...c})),
  ...(demo?[{kind:'demo',title:demo.title,lead:demo.lead,type:demo.type}]:[]),
  ...(application?[{kind:'application',title:application.title,lead:application.lead,items:application.items}]:[]),
  ...(walkthrough?[{kind:'walkthrough',...discussion.walkthrough,lead:'How the process works, step by step.'}]:[]),
  {kind:'summary',title:'Summary of the Discussion',items:discussion.summary}
 ];
 addPresenterNotes(slides,{title,description,example:application?.lead||description});
 return {id,title,icon,description,objectives,slides};
}
