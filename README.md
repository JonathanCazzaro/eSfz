# eSfz
__*Important : this is a work in progress. No functionnal version has been released yet.*__  
eSfz is a desktop app to design SFZ formatted virtual instruments. Plug in your midi controller, and start mapping samples to pads/keys. Once your work is done, simply hit export and you will have your SFZ file ready to go.

## Supported Midi Devices
- KORG nanoPAD2
- Any digital piano with a midi output

## Dev stack
- Electron
- ViteJS
- Typescript
- React
- Tailwind

## Version 1

### Tasks

- [x] Structuring the app
- [x] Setting fonts and colors
- [x] Navigation menu
- [x] Settings window
- [x] Device graphical interface
- [x] Device events management
- [x] Samples importation
- [x] Basic sample triggering
- [ ] Autosave
- [x] Logic for accessing file system through UI
- [x] Saving current project into json file
- [x] Loading existing project
- [ ] SFZ export
- [ ] EN version
- [ ] Handling errors from main process

### Issues

- __Audio output__ : cannot manage to use setSinkIk method of Audio elements to set output (triggers error *audio.ts:15 Uncaught (in promise) DOMException: The operation could not be performed and was aborted* in console). On the other hand it works if the audio elements are played straight and not mapped through the AudioContext.
 