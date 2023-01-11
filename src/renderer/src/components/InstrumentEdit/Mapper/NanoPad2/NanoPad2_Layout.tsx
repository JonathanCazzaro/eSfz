import { AppData } from '@renderer/store';
import { AppDataState, Instrument } from '@renderer/types/types';
import React, { useContext, useEffect, useState } from 'react';
import PlayPad from './PlayPad';
import nanopad2 from '../../../../devices_json/nanopad2.json';

interface NanoPad2_LayoutProps {
  padId: number | undefined;
  isPlaying: boolean;
  isActive: boolean;
  setPadId: (note: number) => void;
  isConfigVisible: boolean;
  instrument: Instrument;
}

const NanoPad2_Layout: React.FC<NanoPad2_LayoutProps> = ({
  isActive,
  padId,
  setPadId,
  isConfigVisible,
  instrument,
}) => {
  const [currentScene, setCurrentScene] = useState(1);
  const {
    updateInstrument,
    pads: [pads, setPads],
  } = useContext(AppData) as AppDataState;

  useEffect(() => {
    const foundMapping = instrument.mappings.find(({ device }) => device === 'nanoPAD2');
    if (foundMapping) {
      setPads(
        foundMapping.pads.map(({ id, samples }) => ({
          id,
          label: pads.find((pad) => pad.id === id)?.label || '',
          affectedSamples: samples,
        })),
      );
    } else {
      updateInstrument({
        ...instrument,
        mappings: [
          ...instrument.mappings,
          { device: 'nanoPAD2', pads: nanopad2.pads.map(({ id }) => ({ id, samples: [] })) },
        ],
      });
    }
  }, [instrument]);

  return (
    <div
      className={`+1504:h-align absolute bottom-0 left-0 w-[63rem] rounded-2xl bg-neutral-800 p-6 ${
        isConfigVisible ? '+1504:h-align' : '+1184:h-align'
      }`}
    >
      <div className='flex h-5 items-start'>
        <div
          className={`h-1.5 w-8 rounded-full ${
            isActive ? 'bg-slate-50 shadow-bright' : 'bg-neutral-600'
          }`}
        ></div>
        <div className='flex h-full w-full justify-end gap-12 pr-16'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlSpace='preserve'
            width='124.827'
            height='41.23'
            viewBox='-1.237 -1.237 124.827 41.23'
            fill='currentColor'
            className='h-full w-fit'
          >
            <path d='M122.043-1.031h-17.962c-8.714 0-9.327 8.525-9.327 8.525V31.17c.013 7.605 8.675 8.584 8.675 8.584h18.614V17.65c2.138 0 1.988-3.986 0-3.986h-11.837v15.103c0 2.807-4.075 2.807-4.075 0V9.99c0-1.817 2.037-2.041 2.037-2.041h13.875v-8.98M77.967 13.258c0 2.416-4.088 2.682-4.088 0V9.175c-.112-2.802 4.1-2.851 4.088 0zm9.787 7.346-4.9-1.224c3.825-1.005 5.913-3.107 5.975-6.557v-7.95c0-1.35-1.712-5.7-7.2-5.903H62.454v40.821H73.88V24.278c-.262-.803 1.838-2.605 2.425-.25l3.288 15.763h12.662l-4.5-19.187m-41.638 8.164c0 2.55-4.075 2.595-4.075 0V9.99c0-2.569 4.075-2.55 4.075 0v18.778zm11.4-21.347s-.4-8.25-9.35-8.657h-8.163c-1.05-.036-9.289 1.157-9.401 9.39v23.201s.712 8.619 9.401 8.638h8.163s9.4-.32 9.387-9.387l-.037-23.185m-58.753 32.37V-1.032h11.438V14.07c.187 2.052 2.275 1.14 2.425.195L15.1-1.03h12.65l-4.487 18.777-4.9 1.223 5.3 1.226 4.5 19.595H15.502l-2.876-16.539c-.138-1.28-2.388-1.29-2.425.21-.038 1.5 0 16.33 0 16.33H-1.237' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlSpace='preserve'
            width='339.668'
            height='41.187'
            viewBox='-1.237 -1.237 339.668 41.187'
            fill='currentColor'
            className='h-full w-fit'
          >
            <path d='M-.8 39.123c-.858-.559-.507-3.04 1.544-10.929 1.46-5.613 2.66-10.506 2.67-10.874.023-1.032 25.756-.796 27.717.254 2.243 1.2 2.176 3.814-.356 13.79-1.77 6.975-2.306 8.065-4.094 8.324-3.52.51-3.846-.922-1.898-8.36 1.007-3.843 1.83-7.514 1.83-8.157 0-.89-2.203-1.17-9.196-1.17H8.22l-2.234 8.694c-1.796 6.99-2.571 8.74-3.956 8.923-.947.125-2.221-.098-2.83-.495zm35.983-.962c-1.307-1.444-1.375-2.234-.497-5.723.56-2.227 2.015-4.984 3.233-6.128 2.027-1.905 3.144-2.106 13.284-2.394 13.426-.381 13.96-1.915.668-1.915-9.328 0-9.41-.017-8.877-2.006.296-1.104.543-2.307.55-2.675.019-1.026 20.405-.794 22.364.254 1.265.677 1.724 1.876 1.724 4.498 0 4.062-2.493 14.969-3.806 16.649-.626.802-4.555 1.115-13.999 1.115-11.713 0-13.292-.181-14.644-1.675zm24.348-5.682c.417-1.104.581-2.307.365-2.675-.47-.797-15.576-.906-17.605-.128-.775.298-1.41 1.502-1.41 2.676 0 2.108.105 2.133 8.946 2.133 8.458 0 8.987-.109 9.704-2.006zm9.885 6.87c0-.328 1.278-5.57 2.84-11.648l2.84-11.05H87.92c7.134 0 13.588.41 14.548.923 2.288 1.225 2.173 5.456-.4 14.682-1.69 6.055-2.302 7.179-4.049 7.432-3.443.5-3.754-.887-1.859-8.295.985-3.851 1.79-7.554 1.79-8.228 0-.977-1.855-1.175-9.135-.972l-9.135.254-2.235 8.471c-2.21 8.372-2.27 8.475-5.132 8.751-1.594.154-2.897.01-2.897-.32zm37.894-.743c-1.56-1.14-1.602-1.664-.581-7.203 1.523-8.266 3.398-12.542 6.025-13.74 3.268-1.488 23.645-1.338 25.735.19 1.92 1.404 1.617 4.739-1.284 14.131-1.358 4.398-2.326 6.02-4.064 6.812-3.367 1.534-23.677 1.385-25.83-.19zm24.605-9.025c2.744-7.811 2.976-7.58-7.57-7.58h-9.274l-1.058 4.682c-.582 2.575-1.256 5.398-1.497 6.274-.403 1.465.292 1.572 8.697 1.337l9.135-.255zm11.513 9.4c0-1.01 7.136-28.835 9.156-35.706l1.18-4.013h37.085l1.8 2.225c1.508 1.863 1.71 3.008 1.238 7.022-.873 7.421-4.025 14.423-7.565 16.804-2.652 1.784-4.209 2.05-12.484 2.135-5.2.054-11.861.354-14.803.67l-5.35.571-1.409 5.35-1.409 5.35-3.72.275c-2.226.164-3.719-.11-3.719-.684zm39.014-18.986c1.196-1.503 3.855-12.324 3.263-13.282-.26-.42-6.203-.763-13.209-.763H159.76l-1.923 7.018c-1.058 3.86-1.924 7.271-1.924 7.58 0 .309 5.77.562 12.821.562 9.189 0 13.072-.316 13.709-1.115zm5.575 18.726c.005-1.48 1.939-4.418 11.305-17.175 18.355-24.998 16.3-22.73 20.589-22.73 2.246 0 4 .461 4.244 1.115.462 1.238 7.328 32.403 8.166 37.064l.531 2.955-3.841-.28c-3.504-.256-3.933-.555-4.886-3.401l-1.045-3.121-11.674-.249-11.675-.248-2.886 3.592c-2.33 2.9-3.46 3.592-5.86 3.592-1.784 0-2.97-.445-2.968-1.114zm32.991-14.356c0-2.565-2.984-15.745-3.56-15.719-.249.013-3.148 3.723-6.441 8.249-6.824 9.376-6.973 9.017 3.848 9.254 5.744.126 6.153.008 6.153-1.784zm17.847 13.464c.008-1.103 1.616-8.025 3.575-15.382 1.959-7.357 4.017-15.181 4.574-17.388 1.678-6.65.642-6.367 22.268-6.067 25.365.353 24.693-.397 18.975 21.171-5.355 20.201-4.533 19.673-30.59 19.673h-18.815l.013-2.007zm37.66-5.475c1.202-1.202 6.913-21.89 6.913-25.043 0-1.164-2.097-1.36-14.523-1.36h-14.523l-3.407 12.86c-1.874 7.073-3.163 13.255-2.865 13.737.31.503 6.21.929 13.818.997 10.61.095 13.54-.144 14.587-1.191zm15.83 5.414c0-4.296 2.864-11.512 5.905-14.878 3.579-3.961 5.02-4.51 18.996-7.238 10.158-1.983 13.443-3.596 13.443-6.603 0-2.29-4.09-3.099-15.663-3.099-11.972 0-12.048-.036-10.22-4.846l.87-2.287h12.535c15.033 0 17.986.87 19.607 5.782.91 2.76.841 3.914-.44 7.269-2.236 5.855-5.908 7.878-19.192 10.578-6.12 1.244-11.834 2.484-12.698 2.755-1.525.48-4.226 4.675-4.226 6.565 0 .616 5.035.936 14.713.936 16.027 0 15.57-.166 14.152 5.127-.536 2-.602 2.007-19.16 2.007h-18.622z' />
          </svg>
        </div>
        <div className='flex'>
          <div className='upper-button-container'>
            <button className='upper-button'></button>
            HOLD
          </div>
          <div className='upper-button-container'>
            <button className='upper-button'></button>
            GATE ARP
          </div>
          <div className='upper-button-container'>
            <button className='upper-button'></button>
            TOUCH SCALE
          </div>
          <div className='upper-button-container'>
            <button className='upper-button'></button>
            KEY/RANGE
          </div>
          <div className='upper-button-container'>
            <button className='upper-button'></button>
            SCALE/TAP
          </div>
        </div>
        <div className='ml-6 flex items-end gap-3'>
          <div className='upper-button-container w-fit'>
            <button
              className='upper-button'
              onClick={() => {
                const newScene = currentScene === 4 ? 1 : currentScene + 1;
                setCurrentScene(newScene);
              }}
            ></button>
            SCENE
          </div>
          <div className='flex gap-3'>
            {[1, 2, 3, 4].map((scene) => (
              <div key={`scene-${scene}`} className='upper-button-container w-fit gap-1'>
                <div
                  className={`h-2 w-2 rounded-full bg-neutral-600 ${
                    isActive && currentScene === scene ? 'bg-red-600 shadow-m shadow-red-500' : ''
                  }`}
                ></div>
                {scene}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-10 flex h-40 gap-8'>
        <div
          className={`h-full w-1/3 rounded-sm bg-neutral-400 shadow-center ${
            isActive && padId && padId <= 2 ? 'shadow-emerald-400' : 'shadow-neutral-900'
          }`}
        ></div>
        <div className='grid h-full w-full grid-flow-col grid-cols-8 grid-rows-2 gap-3'>
          {[37, 36, 39, 38, 41, 40, 43, 42, 45, 44, 47, 46, 49, 48, 51, 50].map((pad) => (
            <PlayPad
              key={`pad-${pad}`}
              currentPad={padId}
              padId={pad}
              isActive={isActive}
              setPadId={(id) => setPadId(id)}
              instrument={instrument}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NanoPad2_Layout;
