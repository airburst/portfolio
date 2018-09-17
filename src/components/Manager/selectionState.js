// Handle Windows and Mac command keypresses
// Firefox: 224
// WebKit browsers (Safari/Chrome): 91 (Left Command) or 93 (Right Command)
const SHIFT = 16; // Mac?
const CTRL = 17;
const LEFT_CMD = 91;
const RIGHT_CMD = 93;

// Manage array of selected thumbnails, including Ctrl and Shift clicks
// TODO: Accept params for sort order and use in shift modifier
export const selectionState = (e, keyCode, state, allPhotos, albumId) => {
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
    const { data } = allPhotos;
    // console.log('TCL: selectionState -> data', data);
    const last = state[state.length - 1];
    // NOTE: Only works in id sort order
    const idRange = [];
    for (let i = id; i < last; i++) {
      idRange.push(i);
    }
    return [...state, ...idRange];
  }
  return [id];
};
