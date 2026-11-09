import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { topics } from '../src/topics/topicRegistry.js';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function renderSlideCard(slide, allSlidesCount, customNotes) {
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

  const notes = customNotes || {};
  const analogy = notes.analogy || slide.notes?.example || 'Relate this technical concept to familiar real-world devices, school labs, or everyday IT workflows.';
  const talkingPoints = notes.talkingPoints || (slide.notes?.emphasize ? slide.notes.emphasize.split('. ').filter(Boolean).map(s => s.endsWith('.') ? s : s + '.') : [slide.lead]);
  const askTheClass = notes.askTheClass || `Ask the class: Why is this concept essential when setting up or troubleshooting a modern network?`;
  const answer = notes.answer || `Encourages learners to explain the functional role and real-world impact of ${slide.title.toLowerCase()}.`;
  const takeaway = notes.takeaway || slide.lead;

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
          <h4 class="section-title">🌟 Real-World Analogy / Intuition</h4>
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

function generateTopicHtml(topic, customNotesMap = {}) {
  const allSlides = topic.slides.map((s, i) => ({ slideNumber: i + 1, ...s }));
  const discussionSlides = allSlides.filter(s => !['title', 'objectives', 'summary'].includes(s.kind));

  const cardsHtml = discussionSlides.map(slide => {
    return renderSlideCard(slide, allSlides.length, customNotesMap[slide.title]);
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Topic ${topic.number}: ${topic.title} — Instructor Discussion Guide</title>
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

  <div class="guide-header-cover">
    <span class="badge">Instructor's Discussion Guide</span>
    <h1>Topic ${topic.number}: ${topic.title}</h1>
    <p>${topic.description}</p>
    <div class="meta-bar">
      <span><b>Curriculum:</b> Networking 1</span>
      <span><b>Excluded:</b> Title (Slide 1), Objectives (Slide 2), and Summary (Final Slide)</span>
      <span><b>Total Discussion Units:</b> ${discussionSlides.length} Slides</span>
    </div>
  </div>

  ${cardsHtml}

</body>
</html>
  `;
}

// Generate for all topics
const outputDir = path.resolve('discussion_guides');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

console.log(`Generating discussion guides for all ${topics.length} topics...`);

topics.forEach(topic => {
  const numStr = String(topic.number).padStart(2, '0');
  const safeTitle = topic.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').slice(0, 40);
  const baseName = `Topic-${numStr}-${safeTitle}`;
  const htmlPath = path.join(outputDir, `${baseName}.html`);
  const pdfPath = path.join(outputDir, `${baseName}.pdf`);

  const html = generateTopicHtml(topic);
  fs.writeFileSync(htmlPath, html, 'utf8');

  const command = `"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "file:///${htmlPath.replace(/\\/g, '/')}"`;
  try {
    execSync(command);
    const size = fs.statSync(pdfPath).size;
    console.log(`[✓] Generated ${baseName}.pdf (${Math.round(size / 1024)} KB)`);
  } catch (err) {
    console.error(`[!] Failed for ${baseName}:`, err.message);
  }
});

console.log('All topic PDFs generated successfully in discussion_guides/');

