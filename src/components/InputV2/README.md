# Input V2 — updated checkout date input

Source: https://www.figma.com/design/YmluYFMIdELMbsDJqbPZBr?node-id=7-63

This is an opt-in new version of the selected date input. `Input` and its existing stories are unchanged. Only the selected date variant is versioned here, not the other input variants.

```tsx
import { InputV2 } from './components/InputV2';

<InputV2
  name="documentsReturnDate"
  label="Date you need the documents back"
  required
  onValueChange={(isoDate) => console.log(isoDate)}
/>
```

- Display and typing: `DD/MM/YYYY`; controlled/default values and submitted values: `YYYY-MM-DD`.
- The calendar remains the existing design-system Calendar. Arrow Down opens it; Escape closes it; selecting a date returns focus to its trigger.
- The update uses a 42px control, 4px corner radius, 8px label gap, existing semantic colors, and Source Sans 3 at weights 400/600.
- Source Sans 3 loads from the pinned Fontsource package on jsDelivr. Restrictive CSP or offline consumers should self-host that font; the existing design-system font is the fallback. Font loading failures do not block the component stylesheet.
- The preview uses the selected field width, 330.6953125px. The component itself fills its parent.
- The selected Figma object is a frame, not a main component with published properties. No Code Connect binding is invented for it.
- Error, success, disabled, hover and focus use existing shared input styling. Native input attributes, events and ref are forwarded; `onValueChange` reports committed ISO dates.
