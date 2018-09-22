// Handle Windows and Mac command keypresses
// Firefox: 224
// WebKit browsers (Safari/Chrome): 91 (Left Command) or 93 (Right Command)
const SHIFT = 16; // Mac?
const CTRL = 17;
const LEFT_CMD = 91;
const RIGHT_CMD = 93;

// Manage array of selected thumbnails, including Ctrl and Shift clicks
export const selectionState = (e, keyCode, state, photoSet) => {
  const id = parseInt(e.target.id, 10);
  // If state already contains entry, remove it. Else add it
  const index = state.indexOf(id);
  if (index > -1) {
    const newState = [...state];
    newState.splice(index, 1);
    return newState;
  }
  // Check for keyboard modifiers
  if (keyCode === CTRL || keyCode === LEFT_CMD || keyCode === RIGHT_CMD) {
    return [...state, id];
  }

  if (keyCode === SHIFT) {
    const lastClickedId = state[state.length - 1];
    const lastClickedIndex = photoSet.indexOf(lastClickedId);
    const thisIndex = photoSet.indexOf(id);
    const start = Math.min(thisIndex, lastClickedIndex);
    const end = Math.max(thisIndex, lastClickedIndex);
    const idRange = [];

    for (let i = start; i <= end; i++) {
      idRange.push(photoSet[i]);
    }
    return Array.from(new Set([...state, ...idRange]));
  }
  return [id];
};
