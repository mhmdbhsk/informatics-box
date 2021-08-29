import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CloseIcons from '../../assets/CloseIcons';

type ModalProps = {
  isLoading: boolean;
  isOpen: boolean;
  handleClose: () => void;
  data: {
    content: any;
    contentData: {
      title: string;
      subject: string;
      statusTitle: string;
      statusColor: string;
      deadline: string;
    };
  };
};

const Modal = ({ isOpen, handleClose, data, isLoading }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={handleClose}
      >
        <div className='min-h-screen sm:px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='dialog'>
              <Dialog.Title className='text-gray-900 flex'>
                <span className='text-lg font-medium leading-6 flex-1'>
                  {data.contentData.title}
                </span>
                <div className='block md:hidden'>
                  <CloseIcons />
                </div>
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Your payment has been successfully submitted. We’ve sent your
                  an email with all of the details of your order.
                </p>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                  onClick={handleClose}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
