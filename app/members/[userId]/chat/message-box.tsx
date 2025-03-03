'use client';

import PresenceAvatar from '@/components/presence-avatar';
import { timeAgo, transformImageUrl } from '@/lib/utils';
import { MessageDto } from '@/types';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';

type MessageBoxProps = {
  message: MessageDto;
  currentUserId: string;
};

const MessageBox = ({ message, currentUserId }: MessageBoxProps) => {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messageEndRef]);

  const renderAvatar = () => (
    // <Avatar
    //   name={message.senderName}
    //   className='self-end '
    //   src={transformImageUrl(message.senderImage) || '/images/user.png'}
    // />
    <div className='self-end'>
      <PresenceAvatar
        src={transformImageUrl(message.senderImage) || '/images/user.png'}
        userId={message.senderId}
      />
    </div>
  );
  const messageContentClasses = clsx('flex flex-col w-[50%] px-2 py-1', {
    'rounded-l-xl rounded-tr-xl text-white bg-blue-100': isCurrentUserSender,
    'rounded-r-xl rounded-tl-xl border-gry-200 bg-green-100':
      !isCurrentUserSender,
  });

  const renderMessageHeader = () => (
    <div
      className={clsx('flex items-center w-full', {
        'justify-between': isCurrentUserSender,
      })}
    >
      {message.dateRead && message.recipientId !== currentUserId ? (
        <span className='text-xs text-black text-italic '>
          (read {timeAgo(message.dateRead)})
        </span>
      ) : (
        <div></div>
      )}

      <div className='flex'>
        <span className='text-sm font-semibold text-gray-900 '>
          {message.senderName}
        </span>
        <span className='text-sm text-gray-500 ml-2'>{message.created}</span>
      </div>
    </div>
  );

  const renderMessageContent = () => (
    <div className={messageContentClasses}>
      {renderMessageHeader()}
      <p className='text-sm py-3 text-gray-900 '>{message.text}</p>
    </div>
  );

  return (
    <div className='grid grid-rows-1 '>
      <div
        className={clsx('flex gap-2 mb-3', {
          'justify-end text-right': isCurrentUserSender,
          'justify-start': !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        {renderMessageContent()}
        {isCurrentUserSender && renderAvatar()}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageBox;
