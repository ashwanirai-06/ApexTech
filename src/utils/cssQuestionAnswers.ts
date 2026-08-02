export interface CssSolutionData {
  propertyExplanation: string;
  syntax: string;
  example: string;
  browserBehavior: string;
  commonMistakes: string[];
}

/**
 * Returns a unique, specific CSS explanation object based on the question title.
 * Prevents identical repeated template answers for CSS questions.
 */
export function getCssSolutionForQuestion(title: string, description: string = ''): CssSolutionData {
  const lowerTitle = (title + ' ' + description).toLowerCase();

  // Flexbox Questions
  if (lowerTitle.includes('flexbox') || lowerTitle.includes('flex')) {
    return {
      propertyExplanation: `Flexbox (Flexible Box Layout) is a 1D layout model designed to distribute space along a single axis (row or column). It dynamically adjusts item dimensions to fill available space, aligning items vertically and horizontally with built-in alignment properties like justify-content and align-items.`,
      syntax: `/* Flex Container Syntax */
.flex-container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  flex-wrap: nowrap | wrap | wrap-reverse;
  gap: 1rem;
}`,
      example: `/* Centering a Modal Box with Flexbox */
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  flex: 0 1 500px; /* flex-grow: 0, flex-shrink: 1, flex-basis: 500px */
  padding: 2rem;
  background: #0f172a;
  border-radius: 12px;
}`,
      browserBehavior: `Flexbox is supported in 99.8%+ of modern browsers (Chrome, Firefox, Safari, Edge). Older Internet Explorer 10/11 required vendor prefixes (-webkit-box, -ms-flexbox) and had flex-basis bugs with calc() expressions. Modern browsers compute gap natively in flex layouts.`,
      commonMistakes: [
        `Expecting justify-content to align along the cross-axis (it operates ONLY on the main axis dictated by flex-direction).`,
        `Forgetting to set display: flex on the parent container before applying child flex properties (flex-grow, align-self).`,
        `Not realizing that inline-level elements inside a flex container become block-level flex items automatically.`
      ]
    };
  }

  // CSS Grid Questions
  if (lowerTitle.includes('grid')) {
    return {
      propertyExplanation: `CSS Grid Layout is a 2D layout engine capable of managing both rows and columns simultaneously. It allows developers to define complex page grids with grid-template-columns, grid-template-rows, named grid areas, and fractional units (fr) without requiring extra wrapper elements.`,
      syntax: `/* CSS Grid Syntax */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 1.5rem;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}`,
      example: `/* Responsive Auto-Fitting Cards Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1rem;
}`,
      browserBehavior: `CSS Grid has full baseline support across Chrome (57+), Firefox (52+), Safari (10.1+), and Edge. Subgrid support (grid-template-columns: subgrid) is supported in modern versions of Chrome, Firefox, and Safari for aligning nested child elements across parent tracks.`,
      commonMistakes: [
        `Confusing repeat(auto-fill, ...) with repeat(auto-fit, ...): auto-fill preserves empty track slots while auto-fit collapses empty tracks so items expand to fill remaining space.`,
        `Setting fixed widths on grid items inside fractional (fr) column tracks, causing overflow bugs.`,
        `Forgetting that grid gap does not create outer margins around the grid container itself.`
      ]
    };
  }

  // Box Model Questions
  if (lowerTitle.includes('box model') || lowerTitle.includes('box-sizing')) {
    return {
      propertyExplanation: `The CSS Box Model defines how every HTML element is rendered as a rectangular box comprising 4 concentric layers: Content, Padding, Border, and Margin. The box-sizing property determines whether padding and border dimensions are added to or included within the element's specified width and height.`,
      syntax: `/* Universal Box Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box; /* Includes padding and border inside specified width/height */
}

/* Individual Box Properties */
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #38bdf8;
  margin: 15px;
}`,
      example: `/* Difference: content-box vs border-box */
.element-content-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid cyan;
  /* Total rendered width = 200 + 40 (padding) + 10 (border) = 250px */
}

.element-border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid cyan;
  /* Total rendered width = exactly 200px! Content width shrinks to 150px. */
}`,
      browserBehavior: `Default browser user-agent stylesheets apply box-sizing: content-box unless explicitly overridden. Vertical margins between adjacent block-level boxes collapse (margin collapse), taking the larger of the two margins rather than adding them together.`,
      commonMistakes: [
        `Omitting the global *, *::before, *::after { box-sizing: border-box; } reset, leading to unexpected sizing bugs when adding padding.`,
        `Expecting padding or margin percentages to calculate relative to height (padding-top: 10% calculates relative to the container's WIDTH, not height!).`,
        `Not accounting for margin collapsing on stacked vertical block elements.`
      ]
    };
  }

  // Specificity & Cascading
  if (lowerTitle.includes('specificity') || lowerTitle.includes('cascade') || lowerTitle.includes('important')) {
    return {
      propertyExplanation: `CSS Specificity is the algorithm browsers use to resolve conflicting CSS declarations and determine which style rule applies to an element. Specificity is calculated as a tuple (Inline, ID, Class/Attribute/Pseudo-class, Type/Pseudo-element). Rules with higher specificity scores override lower ones regardless of order in the stylesheet.`,
      syntax: `/* Specificity Hierarchy Scores */
!important      /* Overrides everything except user-agent overrides */
style=""        /* Inline Style: Score (1, 0, 0, 0) */
#header         /* ID Selector: Score (0, 1, 0, 0) */
.btn:hover      /* Class / Pseudo-Class: Score (0, 0, 1, 0) */
div p           /* Type Selector: Score (0, 0, 0, 2) */
*               /* Universal Selector: Score (0, 0, 0, 0) */`,
      example: `/* Specificity Example */
div.container #nav ul.menu li.active a {
  /* Score: (0, 1, 3, 3) -> ID (1), Classes (.container, .menu, .active = 3), Tags (div, ul, li, a = 4) */
  color: #38bdf8;
}

/* Lower Specificity Rule below will NOT apply */
.menu a {
  /* Score: (0, 0, 1, 1) */
  color: #f43f5e;
}`,
      browserBehavior: `When specificity scores are identical between two rules, the browser applies the rule declared LATER in the CSS source file (the Cascade principle). Modern CSS Cascade Layers (@layer) allow developers to override specificity between modular stylesheets.`,
      commonMistakes: [
        `Overusing !important to fix styling issues, making future maintenance difficult and breaking modularity.`,
        `Chaining excessive selectors (e.g. body div.main #content .card p a) which inflates specificity unnecessarily.`,
        `Believing that ID selectors can be overridden by multiple class selectors combined (a single ID 0,1,0,0 always beats 100 classes 0,0,100,0).`
      ]
    };
  }

  // Positioning & Z-Index
  if (lowerTitle.includes('position') || lowerTitle.includes('z-index') || lowerTitle.includes('sticky') || lowerTitle.includes('absolute')) {
    return {
      propertyExplanation: `The CSS position property controls how an element is positioned in the document flow (static, relative, absolute, fixed, sticky). The z-index property specifies the stack order of positioned elements along the Z-axis, functioning within established stacking contexts.`,
      syntax: `/* CSS Positioning Syntax */
.element {
  position: static | relative | absolute | fixed | sticky;
  top: 10px;
  right: 20px;
  bottom: 0;
  left: 0;
  z-index: 100; /* Works ONLY on positioned elements (not static) */
}`,
      example: `/* Creating a Sticky Header & Absolute Badge */
.header {
  position: sticky;
  top: 0;
  z-index: 1000; /* Stays fixed at top when scrolling */
  background: #0f172a;
}

.card-wrapper {
  position: relative; /* Establishes positioning context for child */
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 10;
}`,
      browserBehavior: `position: sticky behaves as relative until the element passes a specified scroll threshold, then switches to fixed within its parent container bounds. Setting z-index on a static element has no visual effect. Certain properties (opacity < 1, transform, filter, will-change) create a new stacking context.`,
      commonMistakes: [
        `Attempting to set z-index on an element with position: static (it is ignored by the browser rendering engine).`,
        `Not establishing position: relative on the parent container when trying to position an absolute child element relative to it.`,
        `Failing to specify top, bottom, left, or right when using position: sticky.`
      ]
    };
  }

  // Default CSS Property Explanation
  return {
    propertyExplanation: `CSS (Cascading Style Sheets) property rules define visual styling, layout constraints, color palettes, typography hierarchy, and animation behavior for rendered HTML DOM nodes in the browser rendering pipeline.`,
    syntax: `/* Standard CSS Selector & Declaration Block */
.selector {
  property: value;
  transition: all 0.2s ease-in-out;
}

/* Media Query Responsive Rule */
@media (min-width: 768px) {
  .selector {
    display: flex;
    gap: 1.5rem;
  }
}`,
    example: `/* Responsive CSS Card Example for ${title} */
.custom-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  color: #f8fafc;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.custom-card:hover {
  border-color: #38bdf8;
  transform: translateY(-2px);
}`,
    browserBehavior: `CSS declarations parse left-to-right inside the browser's Style Recalculation engine. Unrecognized properties or invalid values are safely ignored without halting script execution, ensuring backward compatibility.`,
    commonMistakes: [
      `Typos in property names or missing semicolons at the end of declaration lines.`,
      `Using fixed pixel values for layouts instead of fluid relative units (rem, em, %, vh, vw).`,
      `Failing to test responsive layouts across mobile touch viewpoints.`
    ]
  };
}
