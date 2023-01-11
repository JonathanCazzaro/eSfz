interface Buttons {
  createInstrument: string[];
  openInstrument: string[];
  openSettings: string[];
  openGithub: string[];
  validate: string[];
  cancel: string[];
  open: string[];
  select: string[];
  closeWindow: string[];
  showSettings: string[];
  hideSettings: string[];
  saveAndQuit: string[];
  quitWithoutSaving: string[];
  welcomeTab: string[];
}

interface Sliders {
  mode_edit: string[];
  mode_play: string[];
  mode_label: string[];
  state_active: string[];
  state_disabled: string[];
  state_label: string[];
}

interface Sections {
  welcome_gettingStarted: string[];
  settings_general: string[];
  settings_midiInput: string[];
  settings_audioOut: string[];
  edit_instrument: string[];
  edit_author: string[];
  edit_samples: string[];
  edit_pad: string[];
  edit_pad_samples: string[];
}

interface Inputs {
  defaultDirectory_label: string[];
  version_label: string[];
  version_values: string[];
  instrument_label: string[];
  author_label: string[];
  directory_label: string[];
}

interface Headers {
  newInstrument: string[];
  selectInstrument: string[];
  selectFolder: string[];
  selectSamples: string[];
  settings: string[];
}

interface TextContent {
  welcome: string[];
}

export interface TranslationInterface {
  buttons: Buttons;
  sliders: Sliders;
  sections: Sections;
  inputs: Inputs;
  headers: Headers;
  textContent: TextContent;
}

export type Lang = 'fr' | 'en';
