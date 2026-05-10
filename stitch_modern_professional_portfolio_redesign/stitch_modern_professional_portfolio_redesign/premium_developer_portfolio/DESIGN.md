---
name: Premium Developer Portfolio
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  display-mobile:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
---

## Brand & Style

This design system is built for a high-end developer portfolio, emphasizing technical mastery through a refined SaaS aesthetic. The personality is professional, precise, and sophisticated—balancing the "cold" efficiency of code with a "warm" premium touch through the use of gold-toned primary accents.

The style leans heavily into **Minimalism** with a **Glassmorphic** touch for navigation. It avoids unnecessary ornamentation, relying on perfect alignment, generous white space, and high-quality typography to communicate value. The interface should feel like a high-performance IDE translated into a marketing-ready executive summary. It is designed to be fully bilingual, ensuring the aesthetic integrity remains consistent across both LTR (English) and RTL (Arabic) scripts.

## Colors

The color palette is dual-themed, anchored by a "Legacy Gold" primary color that evokes a sense of premium craftsmanship. 

- **Dark Mode (Default):** Uses a deep charcoal base to reduce eye strain and provide a "coding environment" feel. Surfaces are subtly elevated via slight shifts in hex value rather than heavy shadows.
- **Light Mode:** Provides a clean, paper-like contrast with soft grey backgrounds to differentiate from pure white surfaces, maintaining a professional "architectural" look.
- **Semantic Usage:** The primary color is reserved for critical actions, active states, and highlights. Borders are kept thin and low-contrast to define structure without cluttering the visual field.

## Typography

Typography is the backbone of this design system, prioritizing legibility and a systematic hierarchy.

- **English Sans:** **Manrope** is used for headlines to provide a modern, geometric character. **Inter** is utilized for body text due to its exceptional readability at small sizes.
- **Arabic Sans:** **Cairo** acts as the primary headline font for Arabic, pairing well with Manrope's geometric weight. Cairo or Manrope (for Latin characters within Arabic text) ensures a harmonious bilingual flow.
- **Mono:** **JetBrains Mono** is specified for technical snippets, metadata, and version numbering, reinforcing the developer identity.
- **RTL Logic:** Line heights are slightly increased for Arabic text to accommodate the script's vertical reach. Font-weight remains consistent across languages to maintain visual balance.

## Layout & Spacing

The system employs a **Fixed Grid** model for large screens, centering content within a 1200px container to ensure readability and focus. 

- **Grid:** A 12-column grid is used for desktop layouts, collapsing to a single column on mobile.
- **Rhythm:** An 8px linear scale (with 4px increments for micro-adjustments) drives all padding and margins.
- **RTL Behavior:** In Arabic mode, the horizontal axis is flipped. Grids, floats, and flex-direction follow the `dir="rtl"` attribute. Padding-left becomes padding-right logically.
- **Sticky Header:** The navigation bar is fixed at the top, utilizing a `backdrop-filter: blur(12px)` and a semi-transparent surface color to maintain context while scrolling.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Subtle Outlines** rather than aggressive shadows.

1.  **Level 0 (Base):** The main background color.
2.  **Level 1 (Surface):** Cards and sections use the `surface` color with a 1px `border` to define boundaries.
3.  **Floating (Sticky Nav):** Uses a high-blur glassmorphism effect (80% opacity surface + blur) to indicate it exists on a separate plane above the content.
4.  **Shadows:** Shadows are reserved exclusively for "hover" states and primary action buttons. They use a wide-spread, low-opacity (10-15%) ambient shadow that inherits a slight tint of the background color.

## Shapes

The shape language is "Rounded-Technical." It utilizes varying radii to distinguish between different types of UI elements:

- **Cards:** 0.75rem (12px) provides a friendly but professional container.
- **Inputs & Fields:** 0.5rem (8px) ensures form elements feel precise and modular.
- **Navigation & Tags:** 999px (Pill) is used for the sticky navigation bar and category chips, creating a distinct "interactive" shape that stands out from static containers.

## Components

- **Buttons:** 
    - *Primary:* Solid fill using `primary` color, text in contrasting `bg`.
    - *Secondary:* Ghost style with 1px `border` and `text` color.
    - *Interaction:* On hover, buttons should scale slightly (1.02x) and increase shadow spread.
- **Navigation Pills:** The main menu uses a pill-shaped container. Active links are highlighted with a subtle `surface` background or the `primary` color for the text.
- **Cards:** Project cards should have a 1px border. On hover, the border color transitions to the `primary` color or a lighter version of the border.
- **Input Fields:** Use the `surface` color for the background with a 1px `border`. Focus state should use a 2px `primary` border or a subtle outer glow.
- **Bilingual Considerations:** Icons within buttons (like arrows) must be mirrored in RTL mode (e.g., an arrow pointing right for "Next" in English must point left in Arabic).
- **Code Blocks:** Syntax highlighting should be customized to match the portfolio's primary color palette, using a dark background regardless of the overall theme for maximum technical feel.