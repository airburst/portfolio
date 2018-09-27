# Portfolio Website: TODOs

## File Inspector (Manager)
* [x] Clicking a thumbnail populates the Inspector panel
* [x] Changing details updates the photo metadata
* [x] debounce
* [x] Highlight selected photo in Media viewer
* [x] BUG: Clicking same photo clings on to old state
* [x] Delete a photo
* [x] Delete uploaded file once photos created
* [x] Handle captions from exif
* [x] Format date in Inspector

## Photo Galleries (Manager)
* [x] Model for gallery object
* [x] API resolvers for create, get, update and delete gallery
* [x] UI to create a gallery (set name)
* [x] Multi-selection on photos
* [x] Add a collapsible folder tree for collections
* [x] Ability to assign to gallery (drag and drop)
* [x] Clicking an album filters photos view
* [x] Show filters in use and allow removal
* [x] Copy photo between galleries (drag and drop)
* [x] BUG: make allPhotos query network-only policy
* [-] Display actions in toolbar when photos are selected [NOT DOING]
* [x] Remove photo and albums when dropped onto Bin
* [x] Deselect album as active filter when binned
* [x] Wire up restoreAll Mutation
* [x] Wire up empty Mutation
* [x] Deselect photos after binning (should also empty Inspector)
* [x] Update gallery name, etc. in Inspector when gallery is selected
* [x] Assign cover photo
* [x] Handle Cmd click / Shift click on Mac
* [x] Handle large batches of uploads
* [x] Style: show droppble style on Bin
* [N] Add a progress bar for uploads
* [ ] BUG: Cover photo is replaced when more photos are added to album
* [ ] Implement search/sort

## Galleries Route
* [x] Route and menu entry
* [x] Masonry layout of gallery cards with cover photos
* [x] Increment view counter for albums
* [x] PublicAlbums query
* [x] Verify mobile layout
* [ ] Loader / error handler for GQL
* [ ] Search

## Gallery/n Route
* [x] Masonry layout of gallery cards with cover photos
* [x] Set max width for lightbox and masonry images (2560px)  css var
* [ ] Loader / error handler for GQL

## Home page
* [ ] Animate login form into page
* [ ] Remove semantic ui to reduce bundle size
* [ ] Static image or ken burns effect
* [ ] Confirm Header actions and UI
* [ ] Show signed-in name (with option to logout?)
* [ ] Verify mobile layout (header)

## General
* [ ] Performance testing in Chrome devtools
* [ ] Bundle splitting
* [ ] Handle validation error on uploading duplicate filename
* [ ] Add a logout feature
* [ ] Create short urls to share photo links (TBC)
* [ ] Bubble up GQL errors to a toast handler
