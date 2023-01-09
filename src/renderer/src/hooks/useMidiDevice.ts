import { useEffect, useState } from 'react';

interface BasicResponse {
  getDevices: () => Promise<WebMidi.MIDIInput[] | undefined>;
  error: string | undefined;
}

type StateChangeCallback = (open: boolean, connected: boolean) => void;
type NoteChangeCallback = (command: number, nodeId: number, velocity: number) => void;

export function useMidiDevice(
  device: WebMidi.MIDIInput | null,
  eventType: 'statechange',
  onEvent: StateChangeCallback,
): BasicResponse;
export function useMidiDevice(
  device: WebMidi.MIDIInput | null,
  eventType: 'midimessage',
  onEvent: NoteChangeCallback,
): BasicResponse;
export function useMidiDevice(device: WebMidi.MIDIInput | null): BasicResponse;
export function useMidiDevice(
  device: WebMidi.MIDIInput | null,
  eventType?: 'statechange' | 'midimessage',
  onEvent?: StateChangeCallback | NoteChangeCallback,
) {
  const [error, setError] = useState<string>();

  const getDevices = async () => {
    try {
      const midiAccess = await navigator.requestMIDIAccess();
      const parsedDevices = Array.from(midiAccess.inputs).map((input) => input[1]);
      return parsedDevices;
    } catch (err) {
      setError('Les périphériques MIDI sont inaccessibles !');
      return;
    }
  };

  const handleStateChange = ({ port: { connection, state } }: WebMidi.MIDIConnectionEvent) => {
    (onEvent as StateChangeCallback)(connection === 'open', state === 'connected');
  };

  const handleNoteChange = ({ data }: WebMidi.MIDIMessageEvent) => {
    const [command, note, velocity] = data;
    (onEvent as NoteChangeCallback)(command, note, velocity);
  };

  useEffect(() => {
    if (device) {
      if (eventType) {
        switch (eventType) {
          case 'statechange':
            device.addEventListener(eventType, handleStateChange);
            break;
          case 'midimessage':
            device.addEventListener(eventType, handleNoteChange);
            break;
        }
      }
    }
    return () => {
      switch (eventType) {
        case 'statechange':
          return device?.removeEventListener(eventType, handleStateChange as () => void);
        case 'midimessage':
          return device?.removeEventListener(eventType, handleNoteChange as () => void);
      }
    };
  }, [device]);

  return { getDevices, error };
}
