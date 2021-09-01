import { ContributorItem } from '../../types/notion';
import Link from 'next/link';
import InstagramIcon from '../../assets/InstagramIcon';

type CardContibutorProps = {
  data: ContributorItem;
};

const CardContributor = ({ data }: CardContibutorProps) => {
  const image = (data: ContributorItem) => data.properties.Photo.url;
  const name = (data: ContributorItem) =>
    data.properties.Name.title[0]?.text.content;
  const instagram = (data: ContributorItem) =>
    data.properties['Username Instagram'].rich_text[0]?.plain_text;
  const roles = (data: ContributorItem) => data.properties.Role.multi_select;

  const Card = () => (
    <div className='contributor-card group'>
      {image(data) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={'https://' + image(data)}
          alt={name(data)}
          className='w-16 h-16 sm:w-24 sm:h-24'
        />
      ) : (
        <div className='w-16 h-16 sm:w-24 sm:h-24 bg-black rounded-full text-white text-5xl font-bold flex items-center justify-center'>
          {name(data).charAt(0)}
        </div>
      )}
      <div className='flex flex-col flex-1 max-w-[328px] sm:max-w-full whitespace-nowrap overflow-hidden'>
        <span className='text-xs sm:text-sm truncate'>{name(data)}</span>
        <div className='flex space-x-1 truncate'>
          {roles(data).map((role, roleIdx) => (
            <span
              className='text-[10px] sm:text-xs text-gray-500'
              key={roleIdx}
            >
              {role.name}
              {roleIdx !== roles(data).length - 1 && ' / '}
            </span>
          ))}
        </div>
      </div>
      {instagram(data) && (
        <div className='px-4 hidden group-hover:flex'>
          <InstagramIcon />
        </div>
      )}
    </div>
  );

  return instagram(data) ? (
    <Link href={`https://instagram.com/` + instagram(data)}>
      <a target='_blank'>
        <Card />
      </a>
    </Link>
  ) : (
    <Card />
  );
};

export default CardContributor;
