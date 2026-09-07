# UI Design & Page Specification

## Design Goal
The product should feel like a exact clone of  Fireflies.aiproductivity workspace, while using original implementation and assets.

## Primary Routes

### `/`
Redirect or render the meetings library.

### `/meetings`
Main meetings dashboard.

### `/meetings/[id]`
Meeting detail page.

### `/settings`
Settings placeholder page.

## Dashboard Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar / Search                                  │
│         ├───────────────────────────────────────────────────┤
│         │ Meetings                                          │
│         │ Filters / Sort                                    │
│         │                                                   │
│         │ Meeting rows/cards                                │
│         │                                                   │
└─────────┴───────────────────────────────────────────────────┘
```

### Sidebar
- Product/workspace identity
- Meetings
- Optional favorites/recent section
- Settings
- Profile placeholder

### Topbar
- Global meeting search
- Create meeting button
- Optional notification/profile controls

### Meeting List
Each row/card should show:
- Title
- Date
- Duration
- Participant avatars/initials
- Participant count
- Optional summary/topic preview

Interactions:
- Click row → detail
- Search
- Filter
- Sort
- Create
- Delete

## Meeting Detail Layout

Recommended desktop layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ Back │ Meeting title │ date │ actions                       │
├──────────────────────────────────────────────────────────────┤
│ Media player / seek bar                                     │
├───────────────────────────────┬──────────────────────────────┤
│ Transcript                    │ Summary / Notes              │
│                               │                              │
│ Search transcript             │ Overview                     │
│                               │ Key topics                   │
│ Speaker + timestamp + text    │ Action items                │
│ Speaker + timestamp + text    │ Chapters                    │
│ Speaker + timestamp + text    │                              │
└───────────────────────────────┴──────────────────────────────┘
```

## Transcript UI
Each segment:
- Speaker
- Speaker visual identifier
- Timestamp
- Transcript text
- Active state
- Search-match highlight

Interactions:
- Click segment → player seeks to `start_time`
- Player progress → active segment changes
- Search → matches are highlighted
- Optional keyboard navigation

## Player
Use an HTML5 audio/video element with a local sample asset or placeholder.
Required:
- Play/pause
- Progress
- Current time
- Duration
- Seek
- Transcript synchronization

## Summary Panel
Sections:
- Overview
- Key points
- Topics/chapters
- Action items

Action item UI:
- Checkbox
- Text
- Assignee
- Due date
- Edit
- Delete

## Modals
Required:
- Create meeting
- Edit meeting
- Delete confirmation
- Add/edit action item

## Toasts
Examples:
- Meeting created
- Meeting updated
- Meeting deleted
- Action item updated
- Action item completed

## States
Implement:
- Loading skeleton
- Empty meetings
- Empty transcript
- Empty search result
- API error
- Not-found meeting
- Disabled/coming-soon feature

## Responsive
Desktop is the primary target. Add sensible tablet/mobile behavior:
- Collapse sidebar
- Stack transcript/summary panels
- Keep player usable
- Preserve search/filter accessibility

## Visual Principles
- Clean whitespace
- Rounded cards/panels
- Subtle borders
- Clear hierarchy
- Compact productivity UI
- Consistent typography
- Original color tokens inspired by the category, not copied proprietary assets
