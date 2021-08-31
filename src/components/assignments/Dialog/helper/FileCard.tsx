import React from 'react';
import Link from 'next/link';
import FileIcon from '../../../../assets/FileIcon';
import DownloadIcon from '../../../../assets/DownloadIcon';

const FileCard = ({ data }: { data: any }) => {
  return (
    <Link href={`${data.file?.file?.url}`}>
      <a target='_blank' className='file-card'>
        <div className='flex flex-1'>
          <FileIcon />
          <span className='ml-4 text-xs md:text-sm'>
            {data.file.caption[0]?.text.content || `File`}
          </span>
        </div>
        <DownloadIcon />
      </a>
    </Link>
  );
};

export default FileCard;
