# Quick Test Guide - Progress Tracking

## 5-Minute Manual Test

### Setup

1. Open http://localhost:3000
2. Open browser console (F12)
3. Clear any existing progress:
   ```javascript
   window.progressManager.clearProgress();
   location.reload();
   ```

### Test 1: Exercise Completion ✏️

**Steps:**

1. Navigate to "SQL Basics" module
2. Click "Try It" on Exercise 1
3. Run this query:
   ```sql
   SELECT * FROM books;
   ```
4. See results appear
5. Notice "✓ Completed" badge on exercise card
6. In console, check:
   ```javascript
   window.progressManager.getProgressStats();
   // Should show: totalExercisesCompleted: 1
   ```

**Test Persistence:** 7. Refresh page (F5) 8. Navigate back to "SQL Basics" 9. ✅ Exercise 1 should still show "✓ Completed"

### Test 2: MCQ Answer 📝

**Steps:**

1. Stay in "SQL Basics" module
2. Scroll to "Practice Quiz" section
3. Answer Question 1 (any option)
4. Click "Submit Answer"
5. See feedback (correct/incorrect with explanation)
6. In console:
   ```javascript
   window.progressManager.getProgressStats();
   // Should show: totalMCQsAnswered: 1
   ```

**Test Persistence:** 7. Refresh page (F5) 8. Navigate to "SQL Basics" → scroll to quiz 9. ✅ Your answer should still be selected 10. ✅ Feedback should still be showing

### Test 3: Progress Bar 📊

**Steps:**

1. In "SQL Basics", complete 2-3 more exercises
2. Notice progress bar at top updates
3. Answer 2-3 more MCQs
4. Progress percentage increases
5. Refresh page
6. ✅ Progress bar should match what you had

### Test 4: Multiple Modules 🔀

**Steps:**

1. Navigate to "Joins" module
2. Complete Exercise 1
3. Answer an MCQ from Joins quiz
4. Navigate back to "SQL Basics"
5. ✅ SQL Basics progress still intact
6. Navigate back to "Joins"
7. ✅ Joins progress still intact

### Test 5: Export/Import 💾

**Steps:**

1. In console:

   ```javascript
   // Export current progress
   const backup = window.progressManager.exportProgress();
   console.log(backup);
   // Copy the JSON output
   ```

2. Clear progress:

   ```javascript
   window.progressManager.clearProgress();
   location.reload();
   ```

3. Verify everything reset (no completed exercises)

4. Import backup:

   ```javascript
   const backup = `paste your copied JSON here`;
   window.progressManager.importProgress(backup);
   location.reload();
   ```

5. ✅ All progress should be restored

## Visual Verification Checklist

After completing exercises and MCQs:

- [ ] Exercise cards show "✓ Completed" badge
- [ ] Completed exercise cards have green highlight
- [ ] MCQ cards show selected answer highlighted
- [ ] MCQ feedback appears (green for correct, red for incorrect)
- [ ] Progress bar shows percentage
- [ ] Progress text shows "X of Y completed"
- [ ] All persists after page refresh
- [ ] Each module tracks separately

## Console Commands Quick Reference

```javascript
// Check progress
window.progressManager.getProgressStats();

// View raw data
window.progressManager.exportProgress();

// Reset everything
window.progressManager.clearProgress();

// Check if specific exercise completed
window.progressManager.isExerciseCompleted('sql-basics-1');

// Get MCQ answer
window.progressManager.getMCQAnswer('sql-basics-mcq-1');
```

## Expected Console Output

On page load, you should see:

```
Progress loaded: { exercises: 0, mcqs: 0 }  // or actual counts
🛠️ Debug tools available:
  - window.sqlManager
  - window.uiController
  - window.progressManager
📊 Progress commands:
  - window.progressManager.getProgressStats()
  - window.progressManager.exportProgress()
  - window.progressManager.clearProgress()
```

## Test Coverage

This manual test covers:

- ✅ Exercise completion tracking
- ✅ MCQ answer tracking
- ✅ localStorage persistence
- ✅ Page refresh survival
- ✅ Multi-module isolation
- ✅ Progress statistics
- ✅ Export/import functionality
- ✅ Clear functionality
- ✅ UI visual indicators
- ✅ Progress bar updates

## Automated Test Ideas (Future)

For future automated testing:

1. Playwright/Cypress end-to-end tests
2. Test localStorage mocking
3. Test with localStorage disabled
4. Test storage quota exceeded
5. Test invalid JSON import
6. Test concurrent tab updates
