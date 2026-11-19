import { COLORS, FONTS } from './pptxBuilder.mjs';

// 1. COVER SLIDE (matches Page 1 of "Introduction to Mobile Programming")
export function addCoverSlide(deck, { moduleNumber, topicTitle }) {
  const slide = deck.addSlide(
    'cover',
    `Title Slide — NETWORKING 1 (Module ${moduleNumber}: ${topicTitle}). Prepared by: ${deck.presenter}. Use this slide alongside the Networking 1 website (#/topic/${deck.topicId}/slide/1).`
  );

  const upperTitle = String(topicTitle || '').toUpperCase();
  const titleFontSize = upperTitle.length > 52 ? 26 : upperTitle.length > 34 ? 30 : 37;

  // Course & Module Kicker + Oversized Navy Title (Right-aligned, completely clear of left geometric shapes)
  slide.addRawShape({
    name: 'Cover Title Box',
    x: 3.72, y: 0.92, w: 5.78, h: 2.85,
    txBox: true,
    valign: 'b',
    paragraphs: [
      {
        text: `NETWORKING 1 · MODULE ${String(moduleNumber).padStart(2, '0')}`,
        color: COLORS.BLUE_HEADING,
        fontFace: FONTS.HEADING,
        fontSize: 20,
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
        lineSpacingPct: 105000
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

  // Large Bold Condensed Uppercase Bright-Blue Title
  slide.addRawShape({
    name: 'Section Title Box',
    x: 1.35, y: 1.15, w: 7.30, h: 1.55,
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
        align: 'ctr',
        lineSpacingPct: 105000
      }
    ]
  });

  // Centered Beginner-Friendly Overview Paragraph in Dark-Blue Body Text
  slide.addRawShape({
    name: 'Section Overview Box',
    x: 1.45, y: 2.86, w: 7.10, h: 1.65,
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

// 4. TEACHING SLIDE — Short Explanation + Blue Callout Box (+ Optional Right Photo / Diagram / Table)
// When visual is null, expands cleanly to full classroom width so no generic filler diagram is repeated.
export function addTeachingSlide(deck, {
  title,
  explanation,
  calloutBullets = [],
  calloutText = '',
  itemLabels = null,
  visual = null,
  notes = ''
}) {
  const slide = deck.addSlide(
    'teaching',
    notes || `${title}\n${explanation}\n` + (calloutText || calloutBullets.join('\n'))
  );

  const hasVisual = Boolean(visual);
  const contentW = hasVisual ? 5.45 : 8.44;
  const upperTitle = String(title || '').toUpperCase();
  const titleFontSize = hasVisual
    ? (upperTitle.length > 46 ? 22 : upperTitle.length > 34 ? 25 : 28)
    : (upperTitle.length > 54 ? 25 : 29);

  // Top-Left Heading
  slide.addRawShape({
    name: 'Teaching Heading',
    x: 0.78, y: 0.40, w: hasVisual ? 5.45 : 7.60, h: 0.82,
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
  const expFontSize = hasVisual
    ? (String(explanation || '').length > 140 ? 12.5 : 13.6)
    : (String(explanation || '').length > 180 ? 14.0 : 15.2);
  slide.addRawShape({
    name: 'Teaching Explanation',
    x: 0.78, y: 1.24, w: contentW, h: hasVisual ? 0.96 : 0.86,
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

  // Bottom-Left (or Full-Width) Medium-Blue Callout Box with White Text (& Yellow highlighted lead terms)
  const calloutParas = [];
  if (calloutText) {
    calloutParas.push({
      runs: slide.parseRichRuns(calloutText, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: hasVisual ? (String(calloutText).length > 210 ? 12.2 : 13.5) : 14.8
      }),
      lineSpacingPct: 112000
    });
  }
  const totalChars = calloutBullets.reduce((acc, s) => acc + String(s).length, 0);
  const bulletFontSize = hasVisual
    ? ((calloutBullets.length >= 4 || totalChars > 320) ? 11.4 : totalChars > 220 ? 12.2 : 13.2)
    : ((calloutBullets.length >= 4 || totalChars > 520) ? 13.2 : 14.4);
  calloutBullets.forEach((b, idx) => {
    const labelPrefix = Array.isArray(itemLabels) && itemLabels[idx] ? `${itemLabels[idx]}. ` : '';
    const textWithLabel = labelPrefix ? `${labelPrefix}${b}` : b;
    calloutParas.push({
      runs: slide.parseRichRuns(textWithLabel, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: bulletFontSize
      }),
      bullet: labelPrefix ? false : '•',
      bulletColor: COLORS.YELLOW_ACCENT,
      spaceAfterPt: hasVisual ? 4 : 7,
      lineSpacingPct: 112000
    });
  });

  slide.addRawShape({
    name: 'Teaching Blue Callout Box',
    x: 0.78, y: hasVisual ? 2.32 : 2.18, w: contentW, h: hasVisual ? 2.58 : 2.72,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.BLUE_CALLOUT,
    valign: 'ctr',
    padL: hasVisual ? 0.16 : 0.22, padR: hasVisual ? 0.16 : 0.22, padT: 0.12, padB: 0.12,
    paragraphs: calloutParas
  });

  // Right Column Visual (Photo, Editable Labeled Diagram, or Mini Table — ONLY when directly relevant)
  if (hasVisual) {
    const vx = 6.42, vy = 0.78, vw = 2.95, vh = 4.10;
    if (visual.kind === 'photo' && visual.imagePath) {
      slide.addPicture({
        name: 'Teaching Photo',
        imagePath: visual.imagePath,
        x: vx, y: vy, w: vw, h: vh,
        round: true,
        caption: visual.caption || null
      });
    } else if (visual.kind === 'table') {
      slide.addTable({
        name: 'Teaching Mini Table',
        x: vx, y: vy, w: vw, h: vh,
        headers: visual.headers,
        rows: visual.rows,
        colWeights: visual.colWeights,
        fontSize: visual.fontSize || 10.5
      });
    } else if (visual.kind === 'diagram') {
      slide.addLabeledDiagram({
        name: 'Teaching Editable Diagram',
        x: vx, y: vy, w: vw, h: vh,
        title: visual.title || 'CONCEPT DIAGRAM',
        nodes: visual.nodes || [],
        arrows: visual.arrows || [],
        footer: visual.footer || null
      });
    }
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
  const titleFontSize = upperTitle.length > 44 ? 24 : 28;

  // Heading
  slide.addRawShape({
    name: 'Comparison Heading',
    x: 0.78, y: 0.45, w: 7.45, h: 0.78,
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

  const leftFontSize = leftBullets.length >= 4 ? 11.8 : 12.8;
  const leftParas = [
    {
      text: leftTitle,
      color: COLORS.WHITE,
      fontFace: FONTS.BODY,
      fontSize: leftTitle.length > 30 ? 14.5 : 15.8,
      bold: true,
      spaceAfterPt: 5
    },
    ...leftBullets.map(b => ({
      runs: slide.parseRichRuns(b, {
        baseColor: COLORS.WHITE,
        highlightColor: COLORS.YELLOW_ACCENT,
        fontSize: leftFontSize
      }),
      bullet: '•',
      bulletColor: COLORS.YELLOW_ACCENT,
      spaceAfterPt: 3.5,
      lineSpacingPct: 109000
    }))
  ];

  // Left Blue Box with White Text
  slide.addRawShape({
    name: 'Comparison Left Blue Box',
    x: 0.78, y: 1.30, w: 4.08, h: 3.62,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.BLUE_CALLOUT,
    valign: 't',
    padL: 0.16, padR: 0.14, padT: 0.12, padB: 0.12,
    paragraphs: leftParas
  });

  const rightFontSize = rightBullets.length >= 4 ? 11.8 : 12.8;
  const rightParas = [
    {
      text: rightTitle,
      color: COLORS.TEXT_DARK,
      fontFace: FONTS.BODY,
      fontSize: rightTitle.length > 30 ? 14.5 : 15.8,
      bold: true,
      spaceAfterPt: 5
    },
    ...rightBullets.map(b => ({
      runs: slide.parseRichRuns(b, {
        baseColor: COLORS.TEXT_DARK,
        highlightColor: COLORS.NAVY_DARK,
        fontSize: rightFontSize
      }),
      bullet: '•',
      bulletColor: COLORS.TEXT_DARK,
      spaceAfterPt: 3.5,
      lineSpacingPct: 109000
    }))
  ];

  // Right Yellow Box with Dark-Blue Text
  slide.addRawShape({
    name: 'Comparison Right Yellow Box',
    x: 5.14, y: 1.30, w: 4.08, h: 3.62,
    prst: 'roundRect', adj: 4500,
    fill: COLORS.YELLOW_BOX,
    valign: 't',
    padL: 0.16, padR: 0.14, padT: 0.12, padB: 0.12,
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

// 8. FINAL SLIDE: SUMMARY OF THE DISCUSSION
export function addSummaryOfDiscussionSlide(deck, { summaryItems = [] }) {
  return addTableOrBarsSlide(deck, {
    title: 'SUMMARY OF THE DISCUSSION',
    lead: `Key concepts covered in Module ${String(deck.moduleNumber).padStart(2, '0')}:`,
    bars: summaryItems,
    notes: `Summary of the Discussion — Module ${deck.moduleNumber}:\n` + summaryItems.map((r, i) => `${i + 1}. ${r}`).join('\n')
  });
}
