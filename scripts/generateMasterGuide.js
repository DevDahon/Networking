import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { topics } from '../src/topics/topicRegistry.js';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('discussion_guides');

function renderSlideCard(slide, allSlidesCount) {
  let itemsHtml = '';
  if (slide.items && slide.items.length > 0) {
    itemsHtml = `
      <ul class="content-bullets">
        ${slide.items.map(it => `<li>${it}</li>`).join('')}
      </ul>
    `;
  } else if (slide.type) {
    itemsHtml = `
      <div class="demo-badge">
        <b>Interactive Demonstration:</b> <code>${slide.type}</code> — Use on-screen controls to step through or demonstrate the concept visually.
      </div>
    `;
  }

  const analogy = slide.notes?.example || 'Relate this technical concept to familiar real-world devices, school computer labs, or everyday IT workflows.';
  const talkingPoints = slide.notes?.emphasize
    ? slide.notes.emphasize.split('. ').filter(Boolean).map(s => s.endsWith('.') ? s : s + '.')
    : [slide.lead];
  const askTheClass = `How does this concept apply when configuring or troubleshooting a real network?`;
  const answer = `Encourages learners to explain the functional purpose and practical impact of ${slide.title.toLowerCase()}.`;
  const takeaway = slide.lead || slide.notes?.opening || slide.title;

  return `
    <div class="slide-card">
      <div class="card-header">
        <span class="slide-pill">Slide ${slide.slideNumber} of ${allSlidesCount}</span>
        <h2 class="slide-title">${slide.title}</h2>
        <span class="type-tag ${slide.kind}">${slide.type ? 'Simulation' : slide.kind}</span>
      </div>

      <div class="reading-box">
        <div class="box-label">📖 What to Read & Display on Screen</div>
        <p class="lead-text">${slide.lead || ''}</p>
        ${itemsHtml}
      </div>

      <div class="teacher-guide-box">
        <div class="guide-header">
          <span class="guide-icon">💡</span>
          <span class="guide-title">Brief Explanation After Reading (Teacher's Discussion Notes)</span>
        </div>

        <div class="guide-section">
          <h4 class="section-title">🌟 Practical Context / Intuition</h4>
          <p class="analogy-text">${analogy}</p>
        </div>

        <div class="guide-section">
          <h4 class="section-title">🗣️ How to Explain It (Talking Points)</h4>
          <ul class="talking-points">
            ${talkingPoints.map(tp => `<li>${tp}</li>`).join('')}
          </ul>
        </div>

        <div class="guide-section q-and-a">
          <h4 class="section-title">❓ Quick Check for Understanding (Ask the Class)</h4>
          <p class="question-text"><strong>Teacher Asks:</strong> "${askTheClass}"</p>
          <p class="answer-text"><strong>Expected Answer / Guidance:</strong> ${answer}</p>
        </div>

        <div class="takeaway-banner">
          <strong>Key Takeaway:</strong> ${takeaway}
        </div>
      </div>
    </div>
  `;
}

let allTopicsHtml = '';

topics.forEach((topic, idx) => {
  const allSlides = topic.slides.map((s, i) => ({ slideNumber: i + 1, ...s }));
  const discussionSlides = allSlides.filter(s => !['title', 'objectives', 'summary'].includes(s.kind));

  const cardsHtml = discussionSlides.map(slide => renderSlideCard(slide, allSlides.length)).join('');

  allTopicsHtml += `
    <section class="topic-section">
      <div class="guide-header-cover">
        <span class="badge">Topic ${topic.number} of ${topics.length}</span>
        <h1>Topic ${topic.number}: ${topic.title}</h1>
        <p>${topic.description}</p>
        <div class="meta-bar">
          <span><b>Curriculum:</b> Networking 1</span>
          <span><b>Excluded:</b> Title (Slide 1), Objectives (Slide 2), and Summary (Final Slide)</span>
          <span><b>Discussion Units:</b> ${discussionSlides.length} Slides</span>
        </div>
      </div>

      ${cardsHtml}
    </section>
  `;
});

const masterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Networking 1 — Complete Instructor Discussion Guide</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      font-size: 13px;
    }
    .topic-section {
      page-break-before: always;
      break-before: page;
    }
    .topic-section:first-of-type {
      page-break-before: avoid;
      break-before: avoid;
    }
    .master-cover {
      padding: 40px 30px;
      text-align: center;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      border-radius: 12px;
      margin-bottom: 30px;
      page-break-after: always;
      break-after: page;
    }
    .master-cover h1 {
      font-size: 32px;
      font-weight: 800;
      margin: 16px 0 10px 0;
      color: #ffffff;
    }
    .master-cover .subtitle {
      font-size: 16px;
      color: #93c5fd;
      margin-bottom: 24px;
    }
    .toc-card {
      text-align: left;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .toc-card h3 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #38bdf8;
      margin-bottom: 12px;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      font-size: 12px;
    }
    .toc-item {
      color: #cbd5e1;
    }
    .toc-item b {
      color: #ffffff;
    }

    .guide-header-cover {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 24px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .guide-header-cover .badge {
      display: inline-block;
      background: #38bdf8;
      color: #0f172a;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    .guide-header-cover h1 {
      font-size: 23px;
      font-weight: 800;
      margin-bottom: 6px;
      color: #ffffff;
    }
    .guide-header-cover p {
      font-size: 13px;
      color: #cbd5e1;
      max-width: 95%;
    }
    .meta-bar {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.2);
      display: flex;
      gap: 20px;
      font-size: 11px;
      color: #94a3b8;
    }
    .meta-bar b {
      color: #ffffff;
    }

    .slide-card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      margin-bottom: 20px;
      background: #ffffff;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .card-header {
      background: #f1f5f9;
      padding: 10px 14px;
      border-bottom: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .slide-pill {
      background: #0f172a;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .slide-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      flex-grow: 1;
    }
    .type-tag {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #e2e8f0;
      color: #475569;
    }
    .type-tag.example {
      background: #fef3c7;
      color: #92400e;
    }

    .reading-box {
      background: #f8fafc;
      padding: 12px 14px;
      border-bottom: 1px dashed #cbd5e1;
    }
    .box-label {
      font-size: 10px;
      text-transform: uppercase;
      font-weight: 800;
      color: #64748b;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .lead-text {
      font-weight: 600;
      color: #1e293b;
      font-size: 13px;
      margin-bottom: 6px;
    }
    .content-bullets {
      margin-left: 18px;
      font-size: 12px;
      color: #334155;
    }
    .content-bullets li {
      margin-bottom: 3px;
    }
    .demo-badge {
      background: #e0f2fe;
      border: 1px solid #bae6fd;
      color: #0369a1;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 4px;
    }

    .teacher-guide-box {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 12px 14px;
    }
    .guide-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .guide-icon {
      font-size: 14px;
    }
    .guide-title {
      font-weight: 800;
      font-size: 12px;
      text-transform: uppercase;
      color: #1e40af;
      letter-spacing: 0.3px;
    }

    .guide-section {
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-bottom: 3px;
    }
    .analogy-text {
      font-size: 12px;
      color: #1e293b;
      font-style: italic;
      background: rgba(255,255,255,0.7);
      padding: 6px 8px;
      border-radius: 4px;
      border-left: 2px solid #3b82f6;
    }
    .talking-points {
      margin-left: 16px;
      font-size: 12px;
      color: #1e293b;
    }
    .talking-points li {
      margin-bottom: 3px;
    }

    .q-and-a {
      background: #ffffff;
      border: 1px solid #bfdbfe;
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 12px;
    }
    .question-text {
      color: #1e3a8a;
      margin-bottom: 4px;
    }
    .answer-text {
      color: #047857;
    }

    .takeaway-banner {
      margin-top: 8px;
      background: #dbeafe;
      color: #1e40af;
      font-size: 12px;
      padding: 5px 8px;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <div class="master-cover">
    <div style="font-size: 40px; margin-bottom: 8px;">🌐</div>
    <h1>Networking 1 · Complete Instructor Guide</h1>
    <div class="subtitle">Comprehensive Lecture & Discussion Handbook for All ${topics.length} Curriculum Topics</div>
    <p style="max-width: 600px; margin: 0 auto; color: #cbd5e1; font-size: 13px;">
      This master handbook compiles step-by-step teaching notes, everyday analogies, talking points, and classroom check-for-understanding questions for every lesson slide. Slide 1 (Title), Slide 2 (Objectives), and the Summary slide are excluded from each topic.
    </p>

    <div class="toc-card">
      <h3>Curriculum Table of Contents</h3>
      <div class="toc-grid">
        ${topics.map(t => `<div class="toc-item"><b>Topic ${t.number}:</b> ${t.title}</div>`).join('')}
      </div>
    </div>
  </div>

  ${allTopicsHtml}

</body>
</html>
`;

const masterHtmlPath = path.join(outputDir, 'Networking-1-Complete-Instructor-Discussion-Guide.html');
const masterPdfPath = path.join(outputDir, 'Networking-1-Complete-Instructor-Discussion-Guide.pdf');

fs.writeFileSync(masterHtmlPath, masterHtml, 'utf8');
console.log('Generating Master Complete Instructor Guide PDF...');

const cmd = `"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${masterPdfPath}" --no-pdf-header-footer "file:///${masterHtmlPath.replace(/\\/g, '/')}"`;
execSync(cmd);

const stats = fs.statSync(masterPdfPath);
console.log(`[✓] Master PDF generated successfully at ${masterPdfPath} (${Math.round(stats.size / 1024)} KB)`);

