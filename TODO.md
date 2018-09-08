# Portfolio Website: TODOs

## File Inspector (Manager)
* [x] Clicking a thumbnail populates the Inspector panel
* [x] Changing details updates the photo metadata
* [x] debounce
* [x] Highlight selected photo in Media viewer
* [x] BUG: Clicking same photo clings on to old state
* [x] Delete a photo
* [x] Delete uploaded file once photos created
* [ ] Handle captions from exif
* [ ] Use larger image in 500px mode
* [ ] Format date

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
* [ ] BUG: Copy photo between galleries need refetchQuery in TreeItem.js
* [ ] Display actions in toolbar when photos are selected
* [ ] Assign cover photo
* [ ] Update gallery name (and other settings, e.g. public?)
* [ ] Remove photo(s) from gallery
* [ ] Remove gallery
* [ ] Add a progress bar for uploads
* [ ] Index tables for search and sort
* [ ] Implement search/sort
* [ ] Display count on dragging image when many are selected

## Galleries View
* [ ] Grid layout of gallery cards with cover photos
* [ ] Increment view counter for albums
* [ ] MUST be mobile-first

## Gallery/Photos View
* [ ] Masonry layout of gallery cards with cover photos
* [ ] MUST be mobile-first

## Home page
* [ ] Animate login form into page
* [ ] Static image or ken burns effect
* [ ] Confirm Header actions and UI
* [ ] MUST be mobile-first

## Portfolio View (TBC)
* [ ] Smart layout for best pictures...

## General
* [ ] Performance testing in Chrome devtools
* [ ] Add a logout feature
* [ ] Create short urls to share photo links (TBC)
* [ ] Bubble up GQL errors to a toast handler

## Snagging / Bugs
* [x] Don't scroll media section topbar off screen (CSS)
* [ ] Enable a light theme for Manager


# Queries
```
mutation {
  updateAlbum(album: { id: 2, name:"Awesome Photos", cover: "http://cover2.me", isPublic:false})
}
```

```
mutation {
  removePhotosFromAlbum(albumId: 2, photoIds:[1]) {
    data
    errors {
      message
    }
  }
}
```

mutation {
  deleteAlbum(albumId:1)
}