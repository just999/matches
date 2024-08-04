'use client';

import LikeButton from '@/components/like-button';
import PresenceDot from '@/components/presence-dot';
import { calculateAge, transformImageUrl } from '@/lib/utils';
import { Card, CardFooter, Image } from '@/lib/next-ui';

import { Member } from '@prisma/client';

import Link from 'next/link';
import { toggleLikeMember } from '@/actions/like-actions';
import { useState } from 'react';

type MemberCardProps = {
  member: Member;
  likeIds: string[];
};

const MemberCard = ({ member, likeIds }: MemberCardProps) => {
  const [hasLiked, setHasLiked] = useState(likeIds.includes(member.userId));
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    setLoading(true);
    try {
      await toggleLikeMember(member.userId, hasLiked);
      setHasLiked(!hasLiked);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={transformImageUrl(member.image) || '/images/user.png'}
        className='aspect-square object-cover '
      />
      <div onClick={preventLinkAction}>
        <div className='absolute top-3 right-3 z-50'>
          <LikeButton
            toggleLike={toggleLike}
            loading={loading}
            hasLiked={hasLiked}
          />
        </div>
        <div className='absolute top-2 left-3 z-50 '>
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className='flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient '>
        <div className='flex flex-col text-white '>
          <span className='font-semibold '>
            {member.name}, {calculateAge(member.dateOfBirth)}{' '}
          </span>
          <span className='text-sm'>{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
