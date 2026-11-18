import { COLORS, FONTS } from './pptxBuilder.mjs';

// 1. COVER SLIDE (matches Page 1 of "Introduction to Mobile Programming")
export function addCoverSlide(deck, { moduleNumber, topicTitle }) {
  const slide = deck.addSlide(
    'cover',
    `Title Slide — NETWORKING 1 (Module ${moduleNumber}: ${topicTitle}). Prepared by: ${deck.presenter}. Use this slide alongside the Networking 1 website (#/topic/${deck.topicId}/slide/1).`
  );

  const upperTitle = String(topicTitle || '').toUpperCase();
  const titleFontSize = upperTitle.length > 52 ? 32 : upperTitle.length > 38 ? 37 : 42;

  // Course & Module Kicker + Oversized Navy Title (Right-aligned, clear of left geometric shapes)
  slide.addRawShape({
    name: 'Cover Title Box',
    x: 2.38, y: 0.92, w: 7.12, h: 2.85,
    txBox: true,
    valign: 'b',
    paragraphs: [
      {
        text: `NETWORKING 1 · MODULE ${String(moduleNumber).padStart(2, '0')}`,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: 21,
        bold: true,
        caps: true,
        align: 'r',
        spacing: 140,
        spaceAfterPt: 8
      },
      {
        text: upperTitle,
        color: COLORS.NAVY_DARK,
        fontFace: FONTS.HEADING,
        fontSize: titleFontSize,
        bold: true,
        caps: true,
        align: 'r',
        lineSpacingPct: 104000
      }
    ]
  });

  // Presenter Name beneath the title (matches "JAY-AR D. MESQUIOLA, LPT" on Page 1)
  slide.addRawShape({
    name: 'Cover Presenter Box',
    x: 2.55, y: 3.92, w: 6.95, h: 0.65,
    txBox: true,
    valign: 't',
    paragraphs: [
      {
        text: deck.presenter.toUpperCase(),
        color: COLORS.NAVY_DARK,
        fontFace: FONTS.BODY,
        fontSize: 17.5,
        bold: true,
        caps: true,
        align: 'r',
        spacing: 240
      }
    ]
  });

  return slide;
}

// 2. LEARNING OBJECTIVES SLIDE (matches Page 2 of "Introduction to Mobile Programming")
export function addObjectivesSlide(deck, { objectives, imagePath = null, diagramSpec = null }) {
  const slide = deck.addSlide(
    'objectives',
    `Learning Objectives for Module ${deck.moduleNumber}: ${deck.title}.\nAt the end of the lesson, students should be able to:\n` +
      objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')
  );

  // Left Rounded-Corner Visual (x=0.58, y=0.68, w=2.92, h=4.02)
  if (imagePath) {
    slide.addPicture({
      name: 'Objectives Visual',
      imagePath,
      x: 0.58, y: 0.68, w: 2.92, h: 4.02,
      round: true,
      allowOverlap: true
    });
  } else if (diagramSpec) {
    slide.addLabeledDiagram({
      name: 'Objectives Visual Diagram',
      x: 0.58, y: 0.68, w: 2.92, h: 4.02,
      ...diagramSpec
    });
  } else {
    // Editable Target / Objectives graphic card
    slide.addRawShape({
      name: 'Objectives Visual Card',
      x: 0.58, y: 0.68, w: 2.92, h: 4.02,
      prst: 'roundRect', adj: 6500,
      fill: COLORS.NAVY_DARK,
      decorative: true
    });
    slide.addRawShape({
      name: 'Target Outer Ring',
      x: 1.04, y: 1.45, w: 2.00, h: 2.00,
      prst: 'ellipse',
      fill: COLORS.RED_ORANGE,
      borderColor: COLORS.WHITE,
      borderPt: 3,
      decorative: true
    });
    slide.addRawShape({
      name: 'Target Middle Ring',
      x: 1.36, y: 1.77, w: 1.36, h: 1.36,
      prst: 'ellipse',
      fill: COLORS.WHITE,
      decorative: true
    });
    slide.addRawShape({
      name: 'Target Bullseye',
      x: 1.68, y: 2.09, w: 0.72, h: 0.72,
      prst: 'ellipse',
      fill: COLORS.RED_ORANGE,
      paragraphs: [{ text: `M${String(deck.moduleNumber).padStart(2, '0')}`, color: COLORS.WHITE, fontSize: 14, bold: true, align: 'ctr' }],
      decorative: true
    });
  }

  // Layer the bottom-left diagonal navy/blue/yellow corner ribbons over the bottom-left corner of the visual card (like Page 2)
  deck.buildObjectivesForegroundRibbons(slide);

  // Right Side: "OBJECTIVES" heading
  slide.addRawShape({
    name: 'Objectives Heading',
    x: 3.78, y: 0.42, w: 5.72, h: 0.64,
    txBox: true,
    valign: 'ctr',
    paragraphs: [
      {
        text: 'OBJECTIVES',
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: 36,
        bold: true,
        caps: true
      }
    ]
  });

  // Intro line + Bulleted objectives list
  const objFontSize = objectives.length >= 6 ? 12.2 : objectives.length >= 5 ? 13.0 : 14.5;
  const paragraphs = [
    {
      text: 'At the end of the lesson, students should be able to:',
      color: COLORS.TEXT_DARK,
      fontFace: FONTS.BODY,
      fontSize: 15,
      bold: false,
      spaceAfterPt: 6
    },
    ...objectives.map(obj => ({
      text: obj,
      color: COLORS.TEXT_DARK,
      fontFace: FONTS.BODY,
      fontSize: objFontSize,
      bullet: '•',
      bulletColor: COLORS.BLUE_HEADING,
      spaceAfterPt: 4,
      lineSpacingPct: 112000
    }))
  ];

  slide.addRawShape({
    name: 'Objectives List Box',
    x: 3.78, y: 1.10, w: 5.72, h: 3.95,
    txBox: true,
    valign: 't',
    paragraphs
  });

  return slide;
}

// 3. SECTION DIVIDER SLIDE (matches Pages 5, 7, 15, 20, 26)
export function addSectionDividerSlide(deck, { sectionNumber, title, overview, notes = '' }) {
  const slide = deck.addSlide(
    'section',
    notes || `Section ${sectionNumber}: ${title}\nOverview: ${overview}`
  );

  const upperTitle = String(title || '').toUpperCase();
  const titleFontSize = upperTitle.length > 44 ? 32 : upperTitle.length > 30 ? 36 : 40;

  // Section Kicker + Large Bold Condensed Uppercase Bright-Blue Title
  slide.addRawShape({
    name: 'Section Title Box',
    x: 1.35, y: 1.15, w: 7.30, h: 1.65,
    txBox: true,
    valign: 'b',
    paragraphs: [
      {
        text: `SECTION ${String(sectionNumber).padStart(2, '0')} · NETWORKING 1`,
        color: COLORS.NAVY_MID,
        fontFace: FONTS.HEADING,
        fontSize: 15,
        bold: true,
        caps: true,
        align: 'ctr',
        spacing: 160,
        spaceAfterPt: 6
      },
      {
        text: upperTitle,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: titleFontSize,
        bold: true,
        caps: true,
        align: 'ctr',
        lineSpacingPct: 105000
      }
    ]
  });

  // Centered Beginner-Friendly Overview Paragraph in Dark-Blue Body Text
  slide.addRawShape({
    name: 'Section Overview Box',
    x: 1.45, y: 2.95, w: 7.10, h: 1.65,
    txBox: true,
    valign: 't',
    paragraphs: [
      {
        text: overview,
        color: COLORS.TEXT_DARK,
        fontFace: FONTS.BODY,
        fontSize: 17.5,
        align: 'ctr',
        lineSpacingPct: 124000
      }
    ]
  });

  return slide;
}

// 4. TEACHING SLIDE — Short Explanation + Blue Callout Box + Right Photo or Editable Labeled Diagram
// (matches Pages 3, 9–13, 16–18, 22–25, 27)
export function addTeachingSlide(deck, {
  title,
  explanation,
  calloutBullets = [],
  calloutText = '',
  visual = null,
  notes = ''
}) {
  const slide = deck.addSlide(
    'teaching',
    notes || `${title}\n${explanation}\n` + (calloutText || calloutBullets.join('\n'))
  );

  const upperTitle = String(title || '').toUpperCase();
  const titleFontSize = upperTitle.length > 46 ? 22 : upperTitle.length > 34 ? 25 : 28;

  // Top-Left Heading
  slide.addRawShape({
    name: 'Teaching Heading',
    x: 0.78, y: 0.40, w: 5.45, h: 0.82,
    txBox: true,
    valign: 'b',
    paragraphs: [
      {
        text: upperTitle,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: titleFontSize,
        bold: true,
        caps: true,
        lineSpacingPct: 104000
      }
    ]
  });

  // Middle-Left Beginner-Friendly Explanation
  const expFontSize = String(explanation || '').length > 140 ? 12.5 : 13.6;
  slide.addRawShape({
    name: 'Teaching Explanation',
    x: 0.78, y: 1.24, w: 5.45, h: 0.96,
    txBox: true,
    valign: 't',
    paragraphs: [
      {
        text: explanation,
        color: COLORS.TEXT_DARK,
        fontFace: FONTS.BODY,
        fontSize: expFontSize,
        lineSpacingPct: 108000
      }
    ]
  });

  // Bottom-Left Medium-Blue Callout Box with White Text (& Yellow highlighted lead terms like Page 27)
  const calloutParas = [];
  if (calloutText) {
    calloutParas.push({
      runs: slide.parseRichRuns(calloutText, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: String(calloutText).length > 210 ? 12.2 : 13.5
      }),
      lineSpacingPct: 112000
    });
  }
  const totalChars = calloutBullets.reduce((acc, s) => acc + String(s).length, 0);
  const bulletFontSize = (calloutBullets.length >= 4 || totalChars > 320) ? 11.4 : totalChars > 220 ? 12.2 : 13.2;
  for (const b of calloutBullets) {
    calloutParas.push({
      runs: slide.parseRichRuns(b, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: bulletFontSize
      }),
      bullet: '•',
      bulletColor: COLORS.YELLOW_ACCENT,
      spaceAfterPt: 4,
      lineSpacingPct: 110000
    });
  }

  slide.addRawShape({
    name: 'Teaching Blue Callout Box',
    x: 0.78, y: 2.32, w: 5.45, h: 2.58,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.BLUE_CALLOUT,
    valign: 'ctr',
    padL: 0.16, padR: 0.16, padT: 0.10, padB: 0.10,
    paragraphs: calloutParas
  });

  // Right Column Visual (Photo, Editable Labeled Diagram, or Mini Table)
  const vx = 6.42, vy = 0.78, vw = 2.95, vh = 4.10;
  if (visual?.kind === 'photo' && visual.imagePath) {
    slide.addPicture({
      name: 'Teaching Photo',
      imagePath: visual.imagePath,
      x: vx, y: vy, w: vw, h: vh,
      round: true,
      caption: visual.caption || null
    });
  } else if (visual?.kind === 'table') {
    slide.addTable({
      name: 'Teaching Mini Table',
      x: vx, y: vy, w: vw, h: vh,
      headers: visual.headers,
      rows: visual.rows,
      colWeights: visual.colWeights,
      fontSize: visual.fontSize || 10.5
    });
  } else if (visual?.kind === 'diagram') {
    slide.addLabeledDiagram({
      name: 'Teaching Editable Diagram',
      x: vx, y: vy, w: vw, h: vh,
      title: visual.title || 'CONCEPT DIAGRAM',
      nodes: visual.nodes || [],
      arrows: visual.arrows || [],
      footer: visual.footer || null
    });
  }

  return slide;
}

// 5. BLUE VS. YELLOW COMPARISON SLIDE (matches Page 6 of "Introduction to Mobile Programming")
export function addComparisonSlide(deck, {
  title,
  leftTitle,
  leftBullets,
  rightTitle,
  rightBullets,
  notes = ''
}) {
  const slide = deck.addSlide(
    'comparison',
    notes || `${title}\n${leftTitle}: ${leftBullets.join('; ')}\n${rightTitle}: ${rightBullets.join('; ')}`
  );

  const upperTitle = String(title || '').toUpperCase();
  const titleFontSize = upperTitle.length > 44 ? 26 : 30;

  // Heading
  slide.addRawShape({
    name: 'Comparison Heading',
    x: 0.78, y: 0.55, w: 7.45, h: 0.78,
    txBox: true,
    valign: 'ctr',
    paragraphs: [
      {
        text: upperTitle,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: titleFontSize,
        bold: true,
        caps: true
      }
    ]
  });

  const leftFontSize = leftBullets.length >= 5 ? 11.8 : 12.8;
  const leftParas = [
    {
      text: leftTitle,
      color: COLORS.WHITE,
      fontFace: FONTS.BODY,
      fontSize: 16.5,
      bold: true,
      spaceAfterPt: 6
    },
    ...leftBullets.map(b => ({
      runs: slide.parseRichRuns(b, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: leftFontSize
      }),
      bullet: '•',
      bulletColor: COLORS.YELLOW_ACCENT,
      spaceAfterPt: 4,
      lineSpacingPct: 112000
    }))
  ];

  // Left Blue Box with White Text
  slide.addRawShape({
    name: 'Comparison Left Blue Box',
    x: 0.78, y: 1.36, w: 4.08, h: 3.52,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.BLUE_CALLOUT,
    valign: 't',
    padL: 0.18, padR: 0.16, padT: 0.14, padB: 0.14,
    paragraphs: leftParas
  });

  const rightFontSize = rightBullets.length >= 5 ? 11.8 : 12.8;
  const rightParas = [
    {
      text: rightTitle,
      color: COLORS.TEXT_DARK,
      fontFace: FONTS.BODY,
      fontSize: 16.5,
      bold: true,
      spaceAfterPt: 6
    },
    ...rightBullets.map(b => ({
      runs: slide.parseRichRuns(b, {
        baseColor: COLORS.TEXT_DARK,
        highlightColor: COLORS.NAVY_DARK,
        fontSize: rightFontSize
      }),
      bullet: '•',
      bulletColor: COLORS.TEXT_DARK,
      spaceAfterPt: 4,
      lineSpacingPct: 112000
    }))
  ];

  // Right Yellow Box with Dark-Blue Text
  slide.addRawShape({
    name: 'Comparison Right Yellow Box',
    x: 5.14, y: 1.36, w: 4.08, h: 3.52,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.YELLOW_BOX,
    valign: 't',
    padL: 0.18, padR: 0.16, padT: 0.14, padB: 0.14,
    paragraphs: rightParas
  });

  return slide;
}

// 6. EDITABLE TABLE OR STACKED ARCHITECTURE BARS SLIDE (matches Page 21)
export function addTableOrBarsSlide(deck, {
  title,
  lead,
  table = null,
  bars = null,
  notes = ''
}) {
  const slide = deck.addSlide(
    'teaching',
    notes || `${title}\n${lead}`
  );

  const upperTitle = String(title || '').toUpperCase();
  const titleFontSize = upperTitle.length > 44 ? 26 : 30;

  slide.addRawShape({
    name: 'TableBars Heading',
    x: 0.78, y: 0.48, w: 7.55, h: 0.68,
    txBox: true,
    valign: 'ctr',
    paragraphs: [
      {
        text: upperTitle,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: titleFontSize,
        bold: true,
        caps: true
      }
    ]
  });

  slide.addRawShape({
    name: 'TableBars Lead',
    x: 0.78, y: 1.18, w: 8.35, h: 0.55,
    txBox: true,
    valign: 't',
    paragraphs: [
      {
        text: lead,
        color: COLORS.TEXT_DARK,
        fontFace: FONTS.BODY,
        fontSize: 14.5
      }
    ]
  });

  if (table) {
    slide.addTable({
      name: 'Main Reference Table',
      x: 0.78, y: 1.78, w: 8.44, h: 3.12,
      headers: table.headers,
      rows: table.rows,
      colWeights: table.colWeights,
      fontSize: table.fontSize || 11.2
    });
  } else if (Array.isArray(bars) && bars.length > 0) {
    const count = bars.length;
    const availH = 3.22;
    const gap = count >= 6 ? 0.08 : 0.11;
    const barH = (availH - gap * (count - 1)) / count;
    const barFontSize = count >= 6 ? 11.4 : count >= 5 ? 12.2 : 13.5;
    bars.forEach((b, idx) => {
      const isYellow = idx % 2 === 1;
      const by = 1.72 + idx * (barH + gap);
      slide.addRawShape({
        name: `Stacked Bar ${idx + 1}`,
        x: 0.85, y: by, w: 8.30, h: barH,
        prst: 'roundRect', adj: 15000,
        fill: isYellow ? COLORS.YELLOW_BOX : COLORS.BLUE_CALLOUT,
        valign: 'ctr',
        padL: 0.18, padR: 0.18, padT: 0.04, padB: 0.04,
        paragraphs: [
          {
            runs: slide.parseRichRuns(b, {
              baseColor: isYellow ? COLORS.TEXT_DARK : COLORS.WHITE,
              highlightColor: isYellow ? COLORS.NAVY_DARK : COLORS.YELLOW_ACCENT,
              fontSize: barFontSize
            }),
            align: 'l',
            lineSpacingPct: 108000
          }
        ]
      });
    });
  }

  return slide;
}

// 7. STANDALONE DISCUSSION QUESTION SLIDE (matches Pages 4, 8, 14, 19)
export function addDiscussionSlide(deck, { question, notes = '' }) {
  const slide = deck.addSlide(
    'discussion',
    notes || `CLASSROOM DISCUSSION QUESTION:\n${question}\nEncourage students to connect the concept to their school lab or home network experience.`
  );

  const upperQ = String(question || '').toUpperCase();
  const qFontSize = upperQ.length > 95 ? 30 : upperQ.length > 70 ? 34 : 38;

  slide.addRawShape({
    name: 'Discussion Question Text',
    x: 1.42, y: 1.32, w: 7.16, h: 2.98,
    txBox: true,
    valign: 'ctr',
    paragraphs: [
      {
        text: upperQ,
        color: COLORS.RED_ORANGE,
        fontFace: FONTS.HEADING,
        fontSize: qFontSize,
        bold: true,
        caps: true,
        align: 'ctr',
        lineSpacingPct: 108000
      }
    ]
  });

  return slide;
}

// 8. END-OF-MODULE SLIDES: Short Recap + 5-Question Knowledge Check (2 slides, answer key in speaker notes) + References
export function addEndOfModuleSlides(deck, { recapItems, quizQuestions, references }) {
  // 8A. Short Recap Slide
  addTableOrBarsSlide(deck, {
    title: 'MODULE RECAP & KEY TAKEAWAYS',
    lead: `Review these core takeaways from Module ${String(deck.moduleNumber).padStart(2, '0')} before taking the five-question knowledge check:`,
    bars: recapItems,
    notes: `Module ${deck.moduleNumber} Recap:\n` + recapItems.map((r, i) => `${i + 1}. ${r}`).join('\n')
  });

  // Full 5-Question Answer Key for Speaker Notes
  const fullAnswerKeyText = [
    `ANSWER KEY — MODULE ${String(deck.moduleNumber).padStart(2, '0')}: ${deck.title.toUpperCase()}`,
    ...quizQuestions.map((q, idx) => `Q${idx + 1}: Correct Answer = ${q.answer} — ${q.explanation}`)
  ].join('\n');

  // 8B. Knowledge Check Slide 1 (Questions 1–3)
  const qPart1 = quizQuestions.slice(0, 3);
  const kc1 = deck.addSlide('teaching', fullAnswerKeyText);
  kc1.addRawShape({
    name: 'KC1 Heading',
    x: 0.78, y: 0.45, w: 7.55, h: 0.65,
    txBox: true,
    valign: 'ctr',
    paragraphs: [{
      text: 'FIVE-QUESTION KNOWLEDGE CHECK (QUESTIONS 1–3)',
      color: COLORS.BLUE_HEADING,
      fontFace: FONTS.HEADING,
      fontSize: 28,
      bold: true,
      caps: true
    }]
  });
  qPart1.forEach((q, idx) => {
    const qy = 1.18 + idx * 1.24;
    const isYellow = idx === 1;
    kc1.addRawShape({
      name: `KC1 Question Card ${idx + 1}`,
      x: 0.78, y: qy, w: 8.44, h: 1.12,
      prst: 'roundRect', adj: 8000,
      fill: isYellow ? COLORS.YELLOW_BOX : COLORS.BLUE_CALLOUT,
      valign: 'ctr',
      padL: 0.18, padR: 0.18, padT: 0.08, padB: 0.08,
      paragraphs: [
        {
          text: `${idx + 1}. ${q.question}`,
          color: isYellow ? COLORS.TEXT_DARK : COLORS.WHITE,
          fontFace: FONTS.BODY,
          fontSize: 13.5,
          bold: true,
          spaceAfterPt: 4
        },
        {
          text: q.choices.join('     '),
          color: isYellow ? COLORS.NAVY_DARK : COLORS.YELLOW_ACCENT,
          fontFace: FONTS.BODY,
          fontSize: 12.5,
          bold: true
        }
      ]
    });
  });

  // 8C. Knowledge Check Slide 2 (Questions 4–5)
  const qPart2 = quizQuestions.slice(3, 5);
  const kc2 = deck.addSlide('teaching', fullAnswerKeyText);
  kc2.addRawShape({
    name: 'KC2 Heading',
    x: 0.78, y: 0.45, w: 7.55, h: 0.65,
    txBox: true,
    valign: 'ctr',
    paragraphs: [{
      text: 'FIVE-QUESTION KNOWLEDGE CHECK (QUESTIONS 4–5)',
      color: COLORS.BLUE_HEADING,
      fontFace: FONTS.HEADING,
      fontSize: 28,
      bold: true,
      caps: true
    }]
  });
  qPart2.forEach((q, idx) => {
    const qNum = idx + 4;
    const qy = 1.22 + idx * 1.38;
    const isYellow = idx === 1;
    kc2.addRawShape({
      name: `KC2 Question Card ${qNum}`,
      x: 0.78, y: qy, w: 8.44, h: 1.22,
      prst: 'roundRect', adj: 8000,
      fill: isYellow ? COLORS.YELLOW_BOX : COLORS.BLUE_CALLOUT,
      valign: 'ctr',
      padL: 0.18, padR: 0.18, padT: 0.10, padB: 0.10,
      paragraphs: [
        {
          text: `${qNum}. ${q.question}`,
          color: isYellow ? COLORS.TEXT_DARK : COLORS.WHITE,
          fontFace: FONTS.BODY,
          fontSize: 14,
          bold: true,
          spaceAfterPt: 5
        },
        {
          text: q.choices.join('     '),
          color: isYellow ? COLORS.NAVY_DARK : COLORS.YELLOW_ACCENT,
          fontFace: FONTS.BODY,
          fontSize: 13,
          bold: true
        }
      ]
    });
  });
  const compactKey = quizQuestions.map((q, idx) => `Q${idx + 1}: ${q.answer}`).join('   ·   ');
  kc2.addRawShape({
    name: 'KC2 Answer Key Banner',
    x: 0.78, y: 4.02, w: 8.44, h: 0.78,
    prst: 'roundRect', adj: 15000,
    fill: COLORS.BLUE_LIGHT,
    borderColor: COLORS.BLUE_HEADING,
    borderPt: 1.2,
    valign: 'ctr',
    paragraphs: [
      {
        text: 'KNOWLEDGE CHECK ANSWER KEY',
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: 13,
        bold: true,
        caps: true,
        align: 'ctr',
        spaceAfterPt: 2
      },
      {
        text: compactKey,
        color: COLORS.TEXT_DARK,
        fontFace: FONTS.BODY,
        fontSize: 11.5,
        bold: true,
        align: 'ctr'
      }
    ]
  });

  // 8D. References Slide
  const refSlide = deck.addSlide(
    'comparison',
    `References and Source Pages for Module ${deck.moduleNumber}: ${deck.title}.\nPrepared by: ${deck.presenter}.\n` +
      references.websiteLinks.concat(references.standards).join('\n')
  );
  refSlide.addRawShape({
    name: 'References Heading',
    x: 0.78, y: 0.52, w: 7.45, h: 0.75,
    txBox: true,
    valign: 'ctr',
    paragraphs: [{
      text: 'REFERENCES & SOURCE WEBSITE LINKS',
      color: COLORS.BLUE_HEADING,
      fontFace: FONTS.HEADING,
      fontSize: 30,
      bold: true,
      caps: true
    }]
  });

  // Left Blue Box: Source Website Pages Used
  refSlide.addRawShape({
    name: 'References Website Card',
    x: 0.78, y: 1.34, w: 4.10, h: 3.52,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.BLUE_CALLOUT,
    valign: 't',
    padL: 0.16, padR: 0.14, padT: 0.14, padB: 0.12,
    paragraphs: [
      {
        text: 'Networking 1 Website Pages',
        color: COLORS.WHITE,
        fontFace: FONTS.BODY,
        fontSize: 16,
        bold: true,
        spaceAfterPt: 6
      },
      ...references.websiteLinks.map(link => ({
        runs: refSlide.parseRichRuns(link, {
          baseColor: COLORS.WHITE,
          highlightColor: COLORS.YELLOW_ACCENT,
          fontSize: 11.8
        }),
        bullet: '•',
        bulletColor: COLORS.YELLOW_ACCENT,
        spaceAfterPt: 4,
        lineSpacingPct: 112000
      }))
    ]
  });

  // Right Yellow Box: Technical Standards & Module Credits
  refSlide.addRawShape({
    name: 'References Standards Card',
    x: 5.12, y: 1.34, w: 4.10, h: 3.52,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.YELLOW_BOX,
    valign: 't',
    padL: 0.16, padR: 0.14, padT: 0.14, padB: 0.12,
    paragraphs: [
      {
        text: 'Standards & Module Reference',
        color: COLORS.TEXT_DARK,
        fontFace: FONTS.BODY,
        fontSize: 16,
        bold: true,
        spaceAfterPt: 6
      },
      ...references.standards.map(std => ({
        runs: refSlide.parseRichRuns(std, {
          baseColor: COLORS.TEXT_DARK,
          highlightColor: COLORS.NAVY_DARK,
          fontSize: 11.8
        }),
        bullet: '•',
        bulletColor: COLORS.TEXT_DARK,
        spaceAfterPt: 4,
        lineSpacingPct: 112000
      }))
    ]
  });
}
