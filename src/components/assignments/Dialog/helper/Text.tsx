import clsx from 'clsx';

const Text = (text: any) => {
  if (!text) {
    return null;
  }
  return text.text.map((value: any, index: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={index}
        className={clsx(
          bold ? 'font-bold' : '',
          code ? 'font-mono' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
          'text-xs sm:text-sm text-gray-500'
        )}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? (
          <a
            href={text.link.url}
            className='underline overflow-hidden whitespace-nowrap text-blue-900'
          >
            <span className='truncate'>{text.content}</span>
          </a>
        ) : (
          text.content
        )}
      </span>
    );
  });
};

export default Text;
