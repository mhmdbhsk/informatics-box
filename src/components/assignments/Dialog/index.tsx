import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CloseIcon from '../../../assets/CloseIcon';
import DownloadIcon from '../../../assets/DownloadIcon';
import FileIcon from '../../../assets/FileIcon';
import Link from 'next/link';
import { BlockItem } from '../../../types/notion';
import Badge from '../../Badge';
import ClipIcon from '../../../assets/ClipIcon';
import {
  dateFormatter,
  datePastChecker,
  dateRenderer,
} from '../../../utils/date';
import clsx from 'clsx';
import renderBlock from './helper/renderBlock';
import FileCard from './helper/FileCard';

type ModalProps = {
  isLoading: boolean;
  isOpen: boolean;
  handleClose: () => void;
  data: {
    content: BlockItem[];
    contentData: {
      title: string;
      subject: string;
      statusTitle: string;
      statusColor: string;
      deadline: string;
      info: string;
      link: string | null;
      submitPlace: string;
    };
  };
};

const Modal = ({ isOpen, handleClose, data, isLoading }: ModalProps) => {
  const dateNow = new Date();

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
              <Dialog.Title className='text-gray-900 flex sticky top-0 bg-white z-20 p-4 sm:p-6 border-b border-gray-100'>
                <span className='text-lg font-bold leading-6 flex-1'>
                  {data.contentData.title}
                </span>
                <button
                  className='block sm:hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200'
                  onClick={handleClose}
                >
                  <CloseIcon />
                </button>
              </Dialog.Title>

              <section className='p-4 sm:p-6'>
                {isLoading ? (
                  <div className='w-full min-h-32 h-full flex items-center justify-center text-sm'>
                    <span>Fetching Data...</span>
                  </div>
                ) : (
                  <div>
                    <div className='flex flex-col mb-4'>
                      <span className='mb-2 font-bold text-sm'>Status</span>
                      <div className='flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0'>
                        <div className='flex flex-col'>
                          <span className='text-xs md:text-sm mb-2'>
                            Tempat Pengumpulan
                          </span>
                          {data.contentData.submitPlace ? (
                            <Badge value={data.contentData.submitPlace} />
                          ) : (
                            <span className='text-xs md:text-sm text-gray-500'>
                              Belum ada keterangan
                            </span>
                          )}
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-xs md:text-sm mb-2'>
                            Terakhir Pengumpulan
                          </span>
                          <div className='flex space-x-2'>
                            <span
                              className={clsx(
                                datePastChecker(
                                  dateFormatter(data.contentData.deadline),
                                  dateNow
                                ) && 'text-red-500'
                              )}
                            >
                              {dateRenderer(data.contentData.deadline)}
                            </span>
                            <Badge value={data.contentData.statusTitle} />
                          </div>
                        </div>
                      </div>
                      {data.contentData.submitPlace === 'Link Kustom' && (
                        <div className='mt-4'>
                          <div className='flex flex-col'>
                            <span className='text-xs md:text-sm mb-2'>
                              Link Pengumpulan
                            </span>
                            {data.contentData.link ? (
                              <Link href={`https://${data.contentData.link}`}>
                                <a target='_blank' className='file-card'>
                                  <span className='text-xs md:text-sm mr-4'>
                                    Link Pengumpulan
                                  </span>
                                  <ClipIcon />
                                </a>
                              </Link>
                            ) : (
                              <span className='text-xs md:text-sm text-gray-500'>
                                Tidak ada link pengumpulan
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {data.contentData.info && (
                        <div className='mt-4'>
                          <div className='flex flex-col'>
                            <span className='text-xs md:text-sm mb-2'>
                              Keterangan
                            </span>
                            {data.contentData.link ? (
                              <span className='text-xs md:text-sm text-gray-500'>
                                {data.contentData.info}
                              </span>
                            ) : (
                              <span className='text-xs md:text-sm text-gray-500'>
                                Tidak ada keterangan
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='flex flex-col my-4'>
                      <span className='mb-2 font-bold text-sm'>
                        Keterangan Tugas
                      </span>
                      {console.log(data.contentData.title, data.content)}
                      {data.content?.length === 0 ? (
                        <span className='text-xs md:text-sm text-gray-500'>
                          Belum ada keterangan
                        </span>
                      ) : (
                        data.content?.map((block) => (
                          <Fragment key={block.id}>
                            {renderBlock(block)}
                          </Fragment>
                        ))
                      )}
                    </div>

                    <div className='flex flex-col my-4'>
                      <span className='mb-2 font-bold text-sm'>File</span>
                      <div className='flex flex-col space-y-4'>
                        {data.content?.some((item) => item.type === 'file') ? (
                          data.content.map((item, index) => {
                            if (item.type === 'file') {
                              return <FileCard data={item} key={index} />;
                            }
                          })
                        ) : (
                          <span className='text-xs md:text-sm text-gray-500'>
                            Belum ada file
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className='mt-6 hidden sm:flex justify-end'>
                  <button
                    type='button'
                    className='button focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-200'
                    onClick={handleClose}
                  >
                    Tutup
                  </button>
                </div>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
