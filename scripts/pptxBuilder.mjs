import { mkdirSync, writeFileSync, copyFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const mediaCacheDir = resolve(rootDir, '.tmp-pptx-media');
const skeletonDir = resolve(mediaCacheDir, 'skeleton');
const manifestPath = resolve(mediaCacheDir, 'manifest.json');

export const mediaManifest = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8'))
  : {};

// 10.0 in x 5.625 in (16:9 widescreen, matching 9144000 x 5143500 EMUs)
export const SLIDE_W = 10.0;
export const SLIDE_H = 5.625;
export const emu = (inches) => Math.round(Number(inches) * 914400);
export const pt = (points) => Math.round(Number(points) * 100);
export const deg = (degrees) => Math.round(((Number(degrees) % 360) + 360) % 360 * 60000);

// Palette matched to "Introduction to Mobile Programming" reference PDF
export const COLORS = {
  BG_WHITE: 'F8FAFC',
  DIAG_1: 'F1F5F9',
  DIAG_2: 'E8EEF5',
  DIAG_3: 'EDF2F8',
  NAVY_DARK: '062B61',
  NAVY_DEEP: '041D44',
  NAVY_MID: '16478C',
  BLUE_HEADING: '0066B3',
  BLUE_CALLOUT: '065A9C',
  BLUE_LIGHT: 'EBF3FA',
  BLUE_BORDER: '93C5FD',
  TEXT_DARK: '0A3366',
  TEXT_MUTED: '334E68',
  YELLOW_ACCENT: 'FFC000',
  YELLOW_BOX: 'FFE066',
  YELLOW_LIGHT: 'FFF9DB',
  RED_ORANGE: 'E63B11',
  WHITE: 'FFFFFF',
  GREEN_OK: '0D9488',
  BORDER_GRAY: 'CBD5E1'
};

export const FONTS = {
  HEADING: 'Bahnschrift SemiBold Condensed',
  BODY: 'Trebuchet MS',
  MONO: 'Consolas'
};

export function xmlEsc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export class PptxDeck {
  constructor({ title, topicId, moduleNumber, presenter = 'Rod Allen B. Agregado' }) {
    this.title = title;
    this.topicId = topicId;
    this.moduleNumber = moduleNumber;
    this.presenter = presenter;
    this.slides = [];
    this.mediaFiles = new Map(); // relPath -> { index, ext, file, width, height }
    this.nextShapeId = 100;
    this.auditWarnings = [];
  }

  allocId() {
    return this.nextShapeId++;
  }

  registerImage(relPath) {
    const cleanKey = String(relPath || '').replace(/^\/+/, '');
    if (this.mediaFiles.has(cleanKey)) {
      return this.mediaFiles.get(cleanKey);
    }
    const info = mediaManifest[cleanKey];
    if (!info) {
      throw new Error(`Image not found in manifest: ${cleanKey}`);
    }
    const index = this.mediaFiles.size + 1;
    const entry = {
      index,
      mediaName: `image${index}.png`,
      sourcePath: info.path,
      width: info.width,
      height: info.height
    };
    this.mediaFiles.set(cleanKey, entry);
    return entry;
  }

  addSlide(layoutType = 'teaching', notesText = '') {
    const slide = new PptxSlide(this, this.slides.length + 1, layoutType, notesText);
    this.slides.push(slide);
    return slide;
  }

  // Background subtle light-gray diagonal shapes (present on all slides like reference PDF)
  buildSubtleDiagonalBg(slide) {
    // Base off-white canvas rectangle
    slide.addRawShape({
      name: 'Canvas Background',
      x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
      fill: COLORS.BG_WHITE,
      decorative: true
    });
    // Subtle light-gray diagonal chevrons/stripes
    slide.addRawShape({
      name: 'Diagonal Bg 1',
      x: 1.6, y: -1.2, w: 3.4, h: 7.8,
      rot: 42,
      fill: COLORS.DIAG_1,
      decorative: true
    });
    slide.addRawShape({
      name: 'Diagonal Bg 2',
      x: 4.8, y: -0.8, w: 3.2, h: 7.4,
      rot: 42,
      fill: COLORS.DIAG_2,
      decorative: true
    });
    slide.addRawShape({
      name: 'Diagonal Bg 3',
      x: 2.8, y: 1.8, w: 2.6, h: 5.5,
      rot: 132,
      fill: COLORS.DIAG_3,
      decorative: true
    });
  }

  // Decorative corners matched to "Introduction to Mobile Programming"
  buildDecorations(slide, layoutType) {
    this.buildSubtleDiagonalBg(slide);

    if (layoutType === 'cover') {
      // Left vertical navy pillar
      slide.addRawShape({
        name: 'Cover Left Pillar',
        x: 0, y: 0, w: 1.42, h: 3.55,
        fill: COLORS.NAVY_DARK,
        decorative: true
      });
      // Bottom-left deep navy triangle block
      slide.addRawShape({
        name: 'Cover Bottom Navy Block',
        x: 0.72, y: 3.72, w: 2.85, h: 2.65,
        rot: 45,
        fill: COLORS.NAVY_DEEP,
        decorative: true
      });
      // Large medium-navy diagonal block along left edge
      slide.addRawShape({
        name: 'Cover Main Diagonal Block',
        x: -1.18, y: 1.22, w: 4.25, h: 3.65,
        rot: 45,
        fill: COLORS.NAVY_MID,
        decorative: true
      });
      // Bottom-left bright yellow accent triangle
      slide.addRawShape({
        name: 'Cover Yellow Corner',
        x: -0.58, y: 4.92, w: 1.25, h: 1.25,
        rot: 45,
        fill: COLORS.YELLOW_ACCENT,
        decorative: true
      });
      return;
    }

    if (layoutType === 'objectives') {
      // Bottom-right layered navy & yellow step bars (as on Page 2 of reference PDF)
      slide.addRawShape({
        name: 'Obj Step Top Yellow',
        x: 9.15, y: 5.18, w: 0.85, h: 0.10,
        fill: COLORS.YELLOW_ACCENT,
        decorative: true
      });
      slide.addRawShape({
        name: 'Obj Step Mid Navy',
        x: 8.88, y: 5.28, w: 1.12, h: 0.11,
        fill: COLORS.NAVY_MID,
        decorative: true
      });
      slide.addRawShape({
        name: 'Obj Step Wide Navy',
        x: 7.62, y: 5.39, w: 2.38, h: 0.13,
        fill: COLORS.NAVY_DARK,
        decorative: true
      });
      slide.addRawShape({
        name: 'Obj Step Bottom Yellow',
        x: 7.48, y: 5.52, w: 2.52, h: 0.105,
        fill: COLORS.YELLOW_ACCENT,
        decorative: true
      });
      return;
    }

    if (layoutType === 'comparison') {
      // Top-right and bottom-left layered navy + yellow ribbon badges (Page 6 style)
      slide.addRawShape({
        name: 'Comp TopRight Navy',
        x: 8.35, y: -0.75, w: 2.35, h: 1.55,
        rot: 35,
        prst: 'roundRect', adj: 35000,
        fill: COLORS.NAVY_DARK,
        decorative: true
      });
      slide.addRawShape({
        name: 'Comp TopRight Yellow Ribbon',
        x: 8.55, y: 0.12, w: 1.75, h: 0.36,
        rot: -32,
        prst: 'roundRect', adj: 25000,
        fill: COLORS.YELLOW_ACCENT,
        decorative: true
      });
      slide.addRawShape({
        name: 'Comp BottomLeft Navy',
        x: -0.75, y: 4.82, w: 2.25, h: 1.45,
        rot: 35,
        prst: 'roundRect', adj: 35000,
        fill: COLORS.NAVY_DARK,
        decorative: true
      });
      slide.addRawShape({
        name: 'Comp BottomLeft Yellow Ribbon',
        x: -0.25, y: 5.05, w: 1.65, h: 0.34,
        rot: -32,
        prst: 'roundRect', adj: 25000,
        fill: COLORS.YELLOW_ACCENT,
        decorative: true
      });
      return;
    }

    // Standard layered navy & medium-blue diagonal corner shapes + bright yellow pill strips
    // (Used on Section Dividers, Teaching Slides, Discussion Questions, Recap, Knowledge Check, References)
    // Top-Right Corner (kept strictly in x > 8.35, y < 1.35)
    slide.addRawShape({
      name: 'TR Deep Navy Ribbon',
      x: 8.45, y: -0.62, w: 2.40, h: 1.15,
      rot: 45,
      fill: COLORS.NAVY_DARK,
      decorative: true
    });
    slide.addRawShape({
      name: 'TR Medium Blue Ribbon',
      x: 8.78, y: -0.88, w: 2.35, h: 0.95,
      rot: 45,
      fill: COLORS.NAVY_MID,
      decorative: true
    });
    slide.addRawShape({
      name: 'TR Yellow Pill Upper',
      x: 8.72, y: -0.10, w: 0.92, h: 0.18,
      rot: 45,
      prst: 'roundRect', adj: 50000,
      fill: COLORS.YELLOW_ACCENT,
      decorative: true
    });
    slide.addRawShape({
      name: 'TR Yellow Pill Lower',
      x: 9.18, y: 0.72, w: 1.10, h: 0.20,
      rot: 45,
      prst: 'roundRect', adj: 50000,
      fill: COLORS.YELLOW_ACCENT,
      decorative: true
    });

    // Bottom-Left Corner (kept strictly in x < 1.45, y > 4.35)
    slide.addRawShape({
      name: 'BL Deep Navy Ribbon',
      x: -0.88, y: 4.82, w: 2.30, h: 1.10,
      rot: 45,
      fill: COLORS.NAVY_DARK,
      decorative: true
    });
    slide.addRawShape({
      name: 'BL Medium Blue Ribbon',
      x: -1.15, y: 5.05, w: 2.25, h: 0.95,
      rot: 45,
      fill: COLORS.NAVY_MID,
      decorative: true
    });
    slide.addRawShape({
      name: 'BL Yellow Pill',
      x: -0.45, y: 4.72, w: 1.15, h: 0.19,
      rot: 45,
      prst: 'roundRect', adj: 50000,
      fill: COLORS.YELLOW_ACCENT,
      decorative: true
    });
  }

  // Overlay corner ribbons on Objectives slide AFTER the left photo so they layer over its bottom-left corner like Page 2
  buildObjectivesForegroundRibbons(slide) {
    slide.addRawShape({
      name: 'Obj BL Deep Navy',
      x: -0.78, y: 3.98, w: 2.65, h: 1.22,
      rot: 45,
      fill: COLORS.NAVY_DARK,
      decorative: true
    });
    slide.addRawShape({
      name: 'Obj BL Medium Blue',
      x: -1.02, y: 4.38, w: 2.55, h: 1.15,
      rot: 45,
      fill: COLORS.NAVY_MID,
      decorative: true
    });
    slide.addRawShape({
      name: 'Obj BL Yellow Pill',
      x: -0.42, y: 4.08, w: 1.48, h: 0.24,
      rot: 45,
      prst: 'roundRect', adj: 50000,
      fill: COLORS.YELLOW_ACCENT,
      decorative: true
    });
    slide.addRawShape({
      name: 'Obj BL Yellow Corner',
      x: -0.58, y: 5.05, w: 1.15, h: 0.85,
      rot: 45,
      fill: COLORS.YELLOW_ACCENT,
      decorative: true
    });
  }

  auditDeck() {
    for (const slide of this.slides) {
      const boxes = slide.contentBoxes;
      for (let i = 0; i < boxes.length; i++) {
        const a = boxes[i];
        if (a.x < 0.25 || a.y < 0.25 || a.x + a.w > SLIDE_W - 0.25 || a.y + a.h > SLIDE_H - 0.20) {
          this.auditWarnings.push(`Slide ${slide.number} (${slide.layoutType}): Box "${a.name}" touches canvas edge (${a.x.toFixed(2)},${a.y.toFixed(2)} ${a.w.toFixed(2)}x${a.h.toFixed(2)})`);
        }
        for (let j = i + 1; j < boxes.length; j++) {
          const b = boxes[j];
          if (a.allowOverlap || b.allowOverlap) continue;
          const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (overlapX > 0.06 && overlapY > 0.06) {
            this.auditWarnings.push(`Slide ${slide.number} (${slide.layoutType}): Overlap between "${a.name}" and "${b.name}" (${overlapX.toFixed(2)}x${overlapY.toFixed(2)} in)`);
          }
        }
      }
    }
    return this.auditWarnings;
  }

  saveToPptx(outPptxPath) {
    const warnings = this.auditDeck();
    if (warnings.length > 0) {
      console.warn(`Layout warnings in ${outPptxPath}:\n  ` + warnings.join('\n  '));
    }

    const workDir = resolve(mediaCacheDir, `build_${this.moduleNumber}`);
    if (existsSync(workDir)) rmSync(workDir, { recursive: true, force: true });
    mkdirSync(workDir, { recursive: true });

    // Copy skeleton recursively
    this.copyDirRecursive(skeletonDir, workDir);

    const slidesDir = resolve(workDir, 'ppt', 'slides');
    const slidesRelsDir = resolve(slidesDir, '_rels');
    const notesDir = resolve(workDir, 'ppt', 'notesSlides');
    const notesRelsDir = resolve(notesDir, '_rels');
    const mediaDir = resolve(workDir, 'ppt', 'media');
    mkdirSync(slidesRelsDir, { recursive: true });
    mkdirSync(notesRelsDir, { recursive: true });
    mkdirSync(mediaDir, { recursive: true });

    // Copy used media files
    for (const entry of this.mediaFiles.values()) {
      copyFileSync(entry.sourcePath, resolve(mediaDir, entry.mediaName));
    }

    // Write slides and notesSlides
    for (const slide of this.slides) {
      const n = slide.number;
      writeFileSync(resolve(slidesDir, `slide${n}.xml`), slide.toSlideXml(), 'utf8');
      writeFileSync(resolve(slidesRelsDir, `slide${n}.xml.rels`), slide.toSlideRelsXml(), 'utf8');
      writeFileSync(resolve(notesDir, `notesSlide${n}.xml`), slide.toNotesXml(), 'utf8');
      writeFileSync(resolve(notesRelsDir, `notesSlide${n}.xml.rels`), slide.toNotesRelsXml(), 'utf8');
    }

    // Write ppt/presentation.xml
    writeFileSync(resolve(workDir, 'ppt', 'presentation.xml'), this.toPresentationXml(), 'utf8');
    // Write ppt/_rels/presentation.xml.rels
    writeFileSync(resolve(workDir, 'ppt', '_rels', 'presentation.xml.rels'), this.toPresentationRelsXml(), 'utf8');
    // Write [Content_Types].xml
    writeFileSync(resolve(workDir, '[Content_Types].xml'), this.toContentTypesXml(), 'utf8');
    // Write docProps/core.xml
    writeFileSync(resolve(workDir, 'docProps', 'core.xml'), this.toCorePropsXml(), 'utf8');

    // Pack and XML-validate using Python packPptx.py
    execFileSync('python', [resolve(__dirname, 'packPptx.py'), '--pack', workDir, outPptxPath], {
      stdio: 'pipe'
    });
    rmSync(workDir, { recursive: true, force: true });
  }

  copyDirRecursive(src, dest) {
    mkdirSync(dest, { recursive: true });
    const entries = execFileSync('python', [
      '-c',
      `import shutil, sys; shutil.copytree(sys.argv[1], sys.argv[2], dirs_exist_ok=True)`,
      src,
      dest
    ]);
    return entries;
  }

  toPresentationXml() {
    const notesMasterRId = `rId${this.slides.length + 2}`;
    const sldIds = this.slides
      .map((s, idx) => `<p:sldId id="${256 + idx}" r:id="rId${idx + 2}"/>`)
      .join('');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" saveSubsetFonts="1">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:notesMasterIdLst><p:notesMasterId r:id="${notesMasterRId}"/></p:notesMasterIdLst>
  <p:sldIdLst>${sldIds}</p:sldIdLst>
  <p:sldSz cx="${emu(SLIDE_W)}" cy="${emu(SLIDE_H)}"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle>
    <a:defPPr><a:defRPr lang="en-US"/></a:defPPr>
    <a:lvl1pPr marL="0" algn="l" defTabSz="713232" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1">
      <a:defRPr sz="1600" kern="1200">
        <a:solidFill><a:srgbClr val="${COLORS.TEXT_DARK}"/></a:solidFill>
        <a:latin typeface="${FONTS.BODY}"/>
        <a:ea typeface="${FONTS.BODY}"/>
        <a:cs typeface="${FONTS.BODY}"/>
      </a:defRPr>
    </a:lvl1pPr>
  </p:defaultTextStyle>
</p:presentation>`;
  }

  toPresentationRelsXml() {
    const N = this.slides.length;
    const rels = [
      `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`
    ];
    for (let i = 1; i <= N; i++) {
      rels.push(`<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`);
    }
    rels.push(`<Relationship Id="rId${N + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/>`);
    rels.push(`<Relationship Id="rId${N + 3}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/>`);
    rels.push(`<Relationship Id="rId${N + 4}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/>`);
    rels.push(`<Relationship Id="rId${N + 5}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/>`);
    rels.push(`<Relationship Id="rId${N + 6}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/>`);
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels.join('')}</Relationships>`;
  }

  toContentTypesXml() {
    const overrides = [
      `<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`,
      `<Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`,
      `<Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>`,
      `<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>`,
      `<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>`,
      `<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>`,
      `<Override PartName="/ppt/theme/theme2.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>`,
      `<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>`,
      `<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>`,
      `<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>`
    ];
    for (let i = 1; i <= 11; i++) {
      overrides.push(`<Override PartName="/ppt/slideLayouts/slideLayout${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>`);
    }
    for (let i = 1; i <= this.slides.length; i++) {
      overrides.push(`<Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`);
      overrides.push(`<Override PartName="/ppt/notesSlides/notesSlide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`);
    }
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="png" ContentType="image/png"/>
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  ${overrides.join('\n  ')}
</Types>`;
  }

  toCorePropsXml() {
    const now = new Date().toISOString();
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${xmlEsc(`NETWORKING 1 - Module ${this.moduleNumber}: ${this.title}`)}</dc:title>
  <dc:creator>${xmlEsc(this.presenter)}</dc:creator>
  <cp:lastModifiedBy>${xmlEsc(this.presenter)}</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified>
</cp:coreProperties>`;
  }
}

export class PptxSlide {
  constructor(deck, number, layoutType, notesText = '') {
    this.deck = deck;
    this.number = number;
    this.layoutType = layoutType;
    this.notesText = notesText;
    this.elements = [];
    this.imageRels = []; // { rId, mediaName }
    this.contentBoxes = [];
    this.deck.buildDecorations(this, layoutType);
  }

  setNotes(text) {
    this.notesText = text;
  }

  trackBox(name, x, y, w, h, allowOverlap = false) {
    this.contentBoxes.push({ name, x, y, w, h, allowOverlap });
  }

  // Raw geometric shape (with optional text paragraphs)
  addRawShape({
    name = 'Shape',
    x, y, w, h,
    rot = 0,
    prst = 'rect',
    adj = null,
    fill = null,
    borderColor = null,
    borderPt = 1,
    paragraphs = [],
    valign = 'ctr',
    padL = 0.12, padR = 0.12, padT = 0.08, padB = 0.08,
    txBox = false,
    decorative = false,
    allowOverlap = false
  }) {
    if (!decorative) {
      this.trackBox(name, x, y, w, h, allowOverlap);
    }
    const id = this.deck.allocId();
    const rotAttr = rot ? ` rot="${deg(rot)}"` : '';
    const avLst = adj !== null ? `<a:avLst><a:gd name="adj" fmla="val ${Math.round(adj)}"/></a:avLst>` : '<a:avLst/>';
    const fillXml = fill ? `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>` : '<a:noFill/>';
    const lnXml = borderColor
      ? `<a:ln w="${Math.round(borderPt * 12700)}"><a:solidFill><a:srgbClr val="${borderColor}"/></a:solidFill></a:ln>`
      : `<a:ln><a:noFill/></a:ln>`;

    const pXml = paragraphs.length > 0
      ? paragraphs.map(p => this.renderParagraphXml(p)).join('')
      : `<a:p><a:endParaRPr lang="en-US"/></a:p>`;

    const xml = `<p:sp>
      <p:nvSpPr>
        <p:cNvPr id="${id}" name="${xmlEsc(name)}"/>
        <p:cNvSpPr${txBox ? ' txBox="1"' : ''}/>
        <p:nvPr/>
      </p:nvSpPr>
      <p:spPr>
        <a:xfrm${rotAttr}>
          <a:off x="${emu(x)}" y="${emu(y)}"/>
          <a:ext cx="${emu(w)}" cy="${emu(h)}"/>
        </a:xfrm>
        <a:prstGeom prst="${prst}">${avLst}</a:prstGeom>
        ${fillXml}
        ${lnXml}
      </p:spPr>
      <p:txBody>
        <a:bodyPr wrap="square" lIns="${emu(padL)}" tIns="${emu(padT)}" rIns="${emu(padR)}" bIns="${emu(padB)}" anchor="${valign}">
          ${decorative ? '<a:noAutofit/>' : '<a:normAutofit/>'}
        </a:bodyPr>
        <a:lstStyle/>
        ${pXml}
      </p:txBody>
    </p:sp>`;
    this.elements.push(xml);
  }

  renderParagraphXml(p) {
    const align = p.align || 'l';
    const lineSpc = p.lineSpacingPct || 118000;
    const spcBef = p.spaceBeforePt || 0;
    const spcAft = p.spaceAfterPt || 0;
    const bullet = p.bullet;
    const marL = bullet ? emu(0.26) : 0;
    const indent = bullet ? -emu(0.18) : 0;

    let buXml = '<a:buNone/>';
    if (bullet === true || bullet === '•') {
      const bColor = p.bulletColor || p.color || COLORS.TEXT_DARK;
      buXml = `<a:buClr><a:srgbClr val="${bColor}"/></a:buClr><a:buSzPct val="100000"/><a:buFont typeface="Arial"/><a:buChar char="•"/>`;
    } else if (typeof bullet === 'string' && bullet.length > 0) {
      // Numbered or custom prefix run is rendered inline
      buXml = '<a:buNone/>';
    }

    const runs = Array.isArray(p.runs)
      ? p.runs
      : [{
          text: p.text ?? '',
          color: p.color || COLORS.TEXT_DARK,
          fontSize: p.fontSize || 16,
          fontFace: p.fontFace || FONTS.BODY,
          bold: Boolean(p.bold),
          italic: Boolean(p.italic),
          caps: Boolean(p.caps),
          spacing: p.spacing || 0
        }];

    const runsXml = runs.map(r => {
      const bAttr = r.bold ? ' b="1"' : '';
      const iAttr = r.italic ? ' i="1"' : '';
      const capAttr = r.caps ? ' cap="all"' : '';
      const spcAttr = r.spacing ? ` spc="${Math.round(r.spacing)}"` : '';
      const sz = pt(r.fontSize || p.fontSize || 16);
      const clr = r.color || p.color || COLORS.TEXT_DARK;
      const face = r.fontFace || p.fontFace || FONTS.BODY;
      return `<a:r>
        <a:rPr lang="en-US" sz="${sz}"${bAttr}${iAttr}${capAttr}${spcAttr} dirty="0">
          <a:solidFill><a:srgbClr val="${clr}"/></a:solidFill>
          <a:latin typeface="${face}"/>
          <a:ea typeface="${face}"/>
          <a:cs typeface="${face}"/>
        </a:rPr>
        <a:t>${xmlEsc(r.text)}</a:t>
      </a:r>`;
    }).join('');

    return `<a:p>
      <a:pPr marL="${marL}" indent="${indent}" algn="${align}">
        <a:lnSpc><a:spcPct val="${lineSpc}"/></a:lnSpc>
        <a:spcBef><a:spcPts val="${pt(spcBef)}"/></a:spcBef>
        <a:spcAft><a:spcPts val="${pt(spcAft)}"/></a:spcAft>
        ${buXml}
      </a:pPr>
      ${runsXml}
      <a:endParaRPr lang="en-US"/>
    </a:p>`;
  }

  // Convenience helper: parse "Lead term: explanation" into bold highlighted lead + regular text
  parseRichRuns(text, { baseColor, highlightColor, fontSize, fontFace = FONTS.BODY }) {
    const str = String(text ?? '');
    const colonIdx = str.indexOf(':');
    if (colonIdx > 0 && colonIdx < 38) {
      const lead = str.slice(0, colonIdx + 1);
      const rest = str.slice(colonIdx + 1);
      return [
        { text: lead, color: highlightColor || baseColor, fontSize, fontFace, bold: true },
        { text: rest, color: baseColor, fontSize, fontFace, bold: false }
      ];
    }
    return [{ text: str, color: baseColor, fontSize, fontFace, bold: false }];
  }

  // Add a rounded-corner photo from public/images/... preserving aspect ratio inside a frame
  addPicture({ name = 'Picture', imagePath, x, y, w, h, round = true, caption = null, allowOverlap = false }) {
    this.trackBox(name, x, y, w, h, allowOverlap);
    const media = this.deck.registerImage(imagePath);
    const rId = `rId${this.imageRels.length + 3}`;
    this.imageRels.push({ rId, mediaName: media.mediaName });

    // Background card behind photo so transparent or non-matching aspect ratio photos look crisp
    const cardH = caption ? h - 0.36 : h;
    this.addRawShape({
      name: `${name} Frame`,
      x, y, w, h: cardH,
      prst: round ? 'roundRect' : 'rect',
      adj: round ? 6500 : null,
      fill: COLORS.WHITE,
      borderColor: COLORS.BORDER_GRAY,
      borderPt: 1.2,
      decorative: true
    });

    // Fit image inside (x+0.08, y+0.08, w-0.16, cardH-0.16) preserving aspect ratio
    const pad = 0.10;
    const availW = w - pad * 2;
    const availH = cardH - pad * 2;
    const imgAspect = media.width / media.height;
    const boxAspect = availW / availH;
    let drawW = availW;
    let drawH = availH;
    if (imgAspect > boxAspect) {
      drawH = availW / imgAspect;
    } else {
      drawW = availH * imgAspect;
    }
    const drawX = x + pad + (availW - drawW) / 2;
    const drawY = y + pad + (availH - drawH) / 2;

    const id = this.deck.allocId();
    const geom = round
      ? `<a:prstGeom prst="roundRect"><a:avLst><a:gd name="adj" fmla="val 5500"/></a:avLst></a:prstGeom>`
      : `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>`;

    const picXml = `<p:pic>
      <p:nvPicPr>
        <p:cNvPr id="${id}" name="${xmlEsc(name)}"/>
        <p:cNvPicPr preferRelativeResize="0"><a:picLocks noGrp="1"/></p:cNvPicPr>
        <p:nvPr/>
      </p:nvPicPr>
      <p:blipFill rotWithShape="1">
        <a:blip r:embed="${rId}"/>
        <a:stretch><a:fillRect/></a:stretch>
      </p:blipFill>
      <p:spPr>
        <a:xfrm>
          <a:off x="${emu(drawX)}" y="${emu(drawY)}"/>
          <a:ext cx="${emu(drawW)}" cy="${emu(drawH)}"/>
        </a:xfrm>
        ${geom}
      </p:spPr>
    </p:pic>`;
    this.elements.push(picXml);

    if (caption) {
      this.addRawShape({
        name: `${name} Caption`,
        x, y: y + cardH + 0.05, w, h: 0.30,
        prst: 'roundRect', adj: 25000,
        fill: COLORS.BLUE_CALLOUT,
        paragraphs: [{
          text: caption,
          color: COLORS.WHITE,
          fontSize: 11,
          bold: true,
          align: 'ctr'
        }],
        decorative: true
      });
    }
  }

  // Native editable PowerPoint Table (<p:graphicFrame><a:tbl>)
  addTable({ name = 'Table', x, y, w, h, headers, rows, colWeights = null, fontSize = 11.5 }) {
    this.trackBox(name, x, y, w, h);
    const id = this.deck.allocId();
    const colCount = headers.length;
    const weights = colWeights || Array(colCount).fill(1);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const colWidthsEmu = weights.map(wt => Math.round((wt / totalWeight) * emu(w)));

    const totalRows = rows.length + 1;
    const rowH = Math.round(emu(h) / totalRows);

    const renderCell = (text, { isHeader = false, isFirstCol = false, rowIdx = 0 }) => {
      const bg = isHeader
        ? COLORS.BLUE_CALLOUT
        : rowIdx % 2 === 1
          ? COLORS.YELLOW_LIGHT
          : COLORS.WHITE;
      const fg = isHeader ? COLORS.WHITE : COLORS.TEXT_DARK;
      const bold = isHeader || isFirstCol ? ' b="1"' : '';
      const sz = pt(isHeader ? fontSize + 0.5 : fontSize);
      return `<a:tc>
        <a:txBody>
          <a:bodyPr/>
          <a:lstStyle/>
          <a:p>
            <a:pPr algn="${isHeader ? 'l' : 'l'}"/>
            <a:r>
              <a:rPr lang="en-US" sz="${sz}"${bold} dirty="0">
                <a:solidFill><a:srgbClr val="${fg}"/></a:solidFill>
                <a:latin typeface="${FONTS.BODY}"/>
                <a:ea typeface="${FONTS.BODY}"/>
                <a:cs typeface="${FONTS.BODY}"/>
              </a:rPr>
              <a:t>${xmlEsc(text)}</a:t>
            </a:r>
            <a:endParaRPr lang="en-US"/>
          </a:p>
        </a:txBody>
        <a:tcPr marL="55000" marR="55000" marT="32000" marB="32000" anchor="ctr">
          <a:lnL w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:srgbClr val="${COLORS.BORDER_GRAY}"/></a:solidFill></a:lnL>
          <a:lnR w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:srgbClr val="${COLORS.BORDER_GRAY}"/></a:solidFill></a:lnR>
          <a:lnT w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:srgbClr val="${COLORS.BORDER_GRAY}"/></a:solidFill></a:lnT>
          <a:lnB w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:srgbClr val="${COLORS.BORDER_GRAY}"/></a:solidFill></a:lnB>
          <a:solidFill><a:srgbClr val="${bg}"/></a:solidFill>
        </a:tcPr>
      </a:tc>`;
    };

    const gridColsXml = colWidthsEmu.map(cw => `<a:gridCol w="${cw}"/>`).join('');
    const headerRowXml = `<a:tr h="${rowH}">${headers.map((hText, ci) => renderCell(hText, { isHeader: true, isFirstCol: ci === 0 })).join('')}</a:tr>`;
    const bodyRowsXml = rows
      .map((r, ri) => `<a:tr h="${rowH}">${r.map((cellText, ci) => renderCell(cellText, { isHeader: false, isFirstCol: ci === 0, rowIdx: ri })).join('')}</a:tr>`)
      .join('');

    const tblXml = `<p:graphicFrame>
      <p:nvGraphicFramePr>
        <p:cNvPr id="${id}" name="${xmlEsc(name)}"/>
        <p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr>
        <p:nvPr/>
      </p:nvGraphicFramePr>
      <p:xfrm>
        <a:off x="${emu(x)}" y="${emu(y)}"/>
        <a:ext cx="${emu(w)}" cy="${emu(h)}"/>
      </p:xfrm>
      <a:graphic>
        <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table">
          <a:tbl>
            <a:tblPr firstRow="1" bandRow="1">
              <a:tableStyleId>{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}</a:tableStyleId>
            </a:tblPr>
            <a:tblGrid>${gridColsXml}</a:tblGrid>
            ${headerRowXml}
            ${bodyRowsXml}
          </a:tbl>
        </a:graphicData>
      </a:graphic>
    </p:graphicFrame>`;
    this.elements.push(tblXml);
  }

  // Native editable labeled diagram panel (renders an editable diagram card with title, node boxes, arrows, and labels)
  addLabeledDiagram({ name = 'Diagram', x, y, w, h, title, nodes = [], arrows = [], footer = null }) {
    this.trackBox(name, x, y, w, h);
    // Outer diagram container card
    this.addRawShape({
      name: `${name} Container`,
      x, y, w, h,
      prst: 'roundRect', adj: 4500,
      fill: COLORS.WHITE,
      borderColor: COLORS.BLUE_BORDER,
      borderPt: 1.5,
      decorative: true
    });
    // Header strip inside diagram container
    this.addRawShape({
      name: `${name} Header`,
      x: x + 0.08, y: y + 0.08, w: w - 0.16, h: 0.36,
      prst: 'roundRect', adj: 18000,
      fill: COLORS.NAVY_DARK,
      paragraphs: [{
        text: title,
        color: COLORS.YELLOW_ACCENT,
        fontSize: 11.5,
        bold: true,
        align: 'ctr'
      }],
      decorative: true
    });

    const innerX = x + 0.12;
    const innerY = y + 0.50;
    const innerW = w - 0.24;
    const innerH = footer ? h - 0.90 : h - 0.58;

    // Connectors / lines (drawn before node boxes so node boxes sit cleanly on top)
    for (const arr of arrows) {
      const ax = innerX + arr.x * innerW;
      const ay = innerY + arr.y * innerH;
      const aw = Math.max(0.03, arr.w * innerW);
      const ah = Math.max(0.03, arr.h * innerH);
      this.addRawShape({
        name: `${name} Link`,
        x: ax, y: ay, w: aw, h: ah,
        prst: arr.prst || 'rect',
        fill: arr.color || COLORS.BLUE_HEADING,
        decorative: true
      });
    }

    // Editable node boxes
    for (const nd of nodes) {
      const nx = innerX + nd.x * innerW;
      const ny = innerY + nd.y * innerH;
      const nw = nd.w * innerW;
      const nh = nd.h * innerH;
      const isYellow = nd.variant === 'yellow';
      const isNavy = nd.variant === 'navy';
      const isWhite = nd.variant === 'white';
      const fill = isYellow
        ? COLORS.YELLOW_BOX
        : isNavy
          ? COLORS.NAVY_DARK
          : isWhite
            ? COLORS.BLUE_LIGHT
            : COLORS.BLUE_CALLOUT;
      const fg = isYellow || isWhite ? COLORS.TEXT_DARK : COLORS.WHITE;
      const subFg = isYellow || isWhite ? COLORS.TEXT_MUTED : COLORS.YELLOW_ACCENT;

      const paras = [
        {
          text: nd.label,
          color: fg,
          fontSize: nd.fontSize || 11.5,
          bold: true,
          align: 'ctr',
          spaceAfterPt: nd.sub ? 1 : 0
        }
      ];
      if (nd.sub) {
        paras.push({
          text: nd.sub,
          color: subFg,
          fontSize: (nd.fontSize || 11.5) - 1.5,
          bold: false,
          align: 'ctr'
        });
      }

      this.addRawShape({
        name: `${name} Node ${nd.label}`,
        x: nx, y: ny, w: nw, h: nh,
        prst: nd.shape || 'roundRect',
        adj: nd.shape === 'ellipse' ? null : 16000,
        fill,
        borderColor: isWhite ? COLORS.BLUE_HEADING : null,
        borderPt: 1.2,
        paragraphs: paras,
        padL: 0.05, padR: 0.05, padT: 0.03, padB: 0.03,
        decorative: true
      });
    }

    if (footer) {
      this.addRawShape({
        name: `${name} Footer`,
        x: x + 0.10, y: y + h - 0.36, w: w - 0.20, h: 0.28,
        prst: 'roundRect', adj: 20000,
        fill: COLORS.YELLOW_BOX,
        paragraphs: [{
          text: footer,
          color: COLORS.TEXT_DARK,
          fontSize: 10.5,
          bold: true,
          align: 'ctr'
        }],
        decorative: true
      });
    }
  }

  toSlideXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" showMasterSp="0" showMasterPhAnim="0">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name="SlideGroup ${this.number}"/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
      ${this.elements.join('\n      ')}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
  }

  toSlideRelsXml() {
    const rels = [
      `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout7.xml"/>`,
      `<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide" Target="../notesSlides/notesSlide${this.number}.xml"/>`
    ];
    for (const img of this.imageRels) {
      rels.push(`<Relationship Id="${img.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/${img.mediaName}"/>`);
    }
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rels.join('')}</Relationships>`;
  }

  toNotesXml() {
    const lines = String(this.notesText || '')
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);
    const pXml = lines.length > 0
      ? lines.map(line => `<a:p><a:r><a:rPr lang="en-US" sz="1200"/><a:t>${xmlEsc(line)}</a:t></a:r></a:p>`).join('')
      : `<a:p><a:endParaRPr lang="en-US"/></a:p>`;

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="2" name="Slide Image Placeholder 1"/>
          <p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr>
          <p:nvPr><p:ph type="sldImg"/></p:nvPr>
        </p:nvSpPr>
        <p:spPr/>
      </p:sp>
      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="3" name="Notes Placeholder 2"/>
          <p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>
          <p:nvPr><p:ph type="body" idx="1"/></p:nvPr>
        </p:nvSpPr>
        <p:spPr/>
        <p:txBody>
          <a:bodyPr/>
          <a:lstStyle/>
          ${pXml}
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:notes>`;
  }

  toNotesRelsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${this.number}.xml"/>
</Relationships>`;
  }
}
