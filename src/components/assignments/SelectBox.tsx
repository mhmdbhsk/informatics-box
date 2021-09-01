import { Listbox, Transition } from '@headlessui/react';
import CheckIcon from '../../assets/CheckIcon';
import { Fragment } from 'react';
import ArrowDownIcon from '../../assets/ArrowDownIcon';

type OptionType = { id: string; value: string; title: string };

type SelectBoxProps = {
  selected: OptionType;
  setSelected: any;
  option: OptionType[];
};

const SelectBox = ({ selected, setSelected, option }: SelectBoxProps) => {
  return (
    <div className='w-full sm:w-72'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative z-10'>
          <Listbox.Button className='relative w-full py-2 pl-3 pr-6 text-left bg-white rounded-lg border cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm hover:bg-gray-100'>
            <span className='block truncate'>{selected.title}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <ArrowDownIcon
                className='w-3 h-3 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {option.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4 z-10 hover:bg-gray-100`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {item.title}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectBox;
