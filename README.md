# eSfz

eSfz is a desktop app to design SFZ formatted virtual instruments. Plug in your midi controller, and start mapping samples to pads/keys. Simply hit save and you will have your SFZ file ready to be used in any compatible sampler.

**What eSfz is not** ?
Well, although you can test out your mappings with a basic "play" mode, it is definitely not an SFZ player. A sampler or a DAW even less !

## Latest news


## Supported Midi Devices

- KORG nanoPAD2
- *Any digital piano with a midi output (not yet implemented)*

## Technologies

- Electron
- ViteJS
- Typescript
- Web MIDI API
- React
- Tailwind

## Getting involved

Because there is a lot to do in order to make it a fully functionnal application, any contribution would be much welcome :heart_eyes:

Don't hesitate to get in touch with me if you're interested !

## Current version (1)

### Tasks
- [x] Structuring the app
- [x] Setting fonts and colors
- [x] Navigation menu
- [x] Settings window
- [x] Device graphical interface
- [x] Device events management
- [x] Samples importation
- [x] Basic sample triggering
- [x] Logic for accessing file system through UI
- [x] Saving current project into json file
- [x] Loading existing project
- [x] SFZ export
- [ ] Autosave
- [ ] EN version
- [ ] Handling errors from main process
- [ ] Keyboard shortcuts 

### Issues  

-  __Audio output__ : cannot manage to use setSinkIk method of Audio elements to set output (triggers error *audio.ts:15 Uncaught (in promise) DOMException: The operation could not be performed and was aborted* in console). On the other hand it works if the audio elements are played straight and not mapped through the AudioContext.

## Upcoming version 

### Tasks

- [ ] Allow standard midi keyboards to be used
- [ ] nanoPAD2 : handle Scenes
- [ ] Samples setup (volume, pitch, velocity...)
- [ ] Assign a single or a set of samples to a range of pads
- [ ] Folders feature inside in the Available samples section to make things organized
- [ ] Providing prebuilt installers for Windows, Mac, Linux