# Testing & Acceptance Criteria

## P0 Functional Checklist

### Meetings
- [ ] Library loads seeded meetings
- [ ] Search works
- [ ] Participant filter works
- [ ] Date filter works
- [ ] Sorting works
- [ ] Meeting detail opens

### Transcript
- [ ] Speaker labels render
- [ ] Timestamps render
- [ ] Transcript is ordered
- [ ] Transcript search works
- [ ] Matches highlight
- [ ] Clicking segment seeks player
- [ ] Player time highlights active segment

### Summary
- [ ] Overview renders
- [ ] Key points render
- [ ] Topics/chapters render
- [ ] Action items render

### CRUD
- [ ] Create meeting works
- [ ] Pasted transcript is parsed
- [ ] Meeting persists after refresh
- [ ] Edit metadata works
- [ ] Delete works
- [ ] Add action works
- [ ] Edit action works
- [ ] Complete action works
- [ ] Delete action works

### UX
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Toasts
- [ ] Confirmation modal
- [ ] Settings placeholder
- [ ] Responsive layout

## Backend Tests

At minimum:
- meeting CRUD
- transcript parsing
- transcript search
- action item CRUD
- not-found handling
- validation errors

## Frontend Tests / Manual QA
Test:
- fast search typing
- empty search
- long transcript
- long meeting title
- no participants
- many participants
- completed action items
- player seek
- refresh after mutations

## Acceptance Scenario

1. Open app.
2. See seeded meetings.
3. Search for a meeting.
4. Filter by participant.
5. Open meeting.
6. Play sample media.
7. Click transcript segment.
8. Confirm player seeks.
9. Move player.
10. Confirm active transcript segment changes.
11. Search transcript.
12. Confirm highlighted results.
13. Read summary/topics.
14. Complete action item.
15. Create new meeting with pasted transcript.
16. Refresh.
17. Confirm new meeting persists.
18. Edit title/participants.
19. Delete meeting.
20. Confirm it disappears.
