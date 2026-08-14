# KisanMitra - Marathi Localization Implementation Plan

## Objective
Convert KisanMitra into a fully bilingual application (English + Marathi) to ensure maximum accessibility for farmers in Maharashtra.

## Phase 1: Language State Management
1. **Storage Update**: Update `lib/storage.js` to persist a user's language preference (`'en'` or `'mr'`).
2. **Context API**: Create a React Context (`LanguageProvider`) in a new file `lib/LanguageContext.js`. This will allow any component in the app to instantly know the current language and change it without reloading the page.

## Phase 2: Translation Dictionary
1. **Dictionary File**: Create `lib/dictionary.js` containing translations for all static UI strings (e.g., "Find Best Mandi", "Total Earnings", "Net Realization", "Transport", "Market Fee").
2. **Translation Hook**: Create a custom hook `useTranslation()` that components will use to easily swap text dynamically (e.g., `t('market_fee')`).

## Phase 3: AI Prompt Adaptation
1. **Dynamic Prompting**: Update the `app/api/explain/route.js` and `lib/prompts.js`. If the user's selected language is Marathi, the system prompt to the Groq/Llama 3 model will explicitly instruct it to: *"Respond strictly in simple, native Marathi script (Devanagari)."*

## Phase 4: UI Integration
1. **Language Toggle**: Add a slick "English / मराठी" toggle button on the Header of the Dashboard and Market pages.
2. **Component Refactoring**: Update all UI components to use the new translation hook instead of hardcoded English strings:
   - `ProfileForm.jsx` (Form labels and dropdowns)
   - `DashboardCards.jsx` (Crop, District, Quantity labels)
   - `ActionCards.jsx` (Action text)
   - `MandiCard.jsx` (Deduction names and labels)

## Timeline
This structural change can be implemented **shortly (within a few minutes)** by replacing hardcoded strings with exact dictionary variable mappings and applying the React Context to `layout.js`.
