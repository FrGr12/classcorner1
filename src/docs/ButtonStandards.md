
# Button Standards

This document outlines the standardized button styles and usage patterns for our application.

## Button Variants

| Variant | Usage | Example |
|---------|-------|---------|
| `default` | Primary actions | Submit, Save, Continue |
| `destructive` | Destructive actions | Delete, Remove, Cancel |
| `outline` | Secondary actions | Cancel, Back, Close |
| `secondary` | Alternative primary actions | Apply, Update |
| `ghost` | Subtle actions | Navigation, toggles |
| `link` | Text links | "Learn more", inline links |
| `subtle` | Soft background actions | Filter, Sort |
| `success` | Success actions | Approve, Complete |
| `warning` | Warning actions | Flag, Mark |
| `accent` | Highlight actions | Featured actions, promotions |

## Button Sizes

| Size | Usage | Example |
|------|-------|---------|
| `default` | Standard buttons | Most form actions |
| `sm` | Small UI elements | Compact UIs, inline actions |
| `lg` | Large buttons | Call-to-actions, main page actions |
| `xl` | Extra large buttons | Hero sections, landing pages |
| `icon` | Icon-only buttons | Standard icon buttons |
| `icon-sm` | Small icon buttons | Compact icon buttons |
| `icon-lg` | Large icon buttons | Featured icon buttons |
| `full` | Full-width buttons | Mobile actions, form submissions |

## Loading States

All buttons support loading states through the `isLoading` and `loadingText` props:

```tsx
<Button 
  isLoading={isSubmitting} 
  loadingText="Saving..."
>
  Save
</Button>
```

## Accessibility

- Ensure buttons have descriptive text for screen readers
- Use `aria-label` for icon-only buttons
- Maintain adequate color contrast
- Provide focus styles (included in the button component)

## Example Usage

```tsx
// Primary action
<Button>Submit</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Secondary action
<Button variant="outline">Cancel</Button>

// Icon button
<Button variant="ghost" size="icon">
  <PlusIcon className="h-4 w-4" />
</Button>

// Loading state
<Button isLoading={isSubmitting} loadingText="Processing...">
  Submit
</Button>

// Full width button (mobile)
<Button size="full">Continue</Button>
```
