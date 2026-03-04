import React from 'react';
import Image from 'next/image';

import type { PlannerMember } from './PlannerModal';

interface TeamMemberProps extends PlannerMember {
  onMeetClick?: () => void;
}

export default function TeamMember({ 
  name, 
  role, 
  profession, 
  experience, 
  image,
  description,
  nickname,
  onMeetClick,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full mb-3 overflow-hidden group">
        <div className="team-member-image relative aspect-[3/4] bg-gray-200">
          {image ? (
            <>
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-geologica">No photo</div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transform translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            type="button"
            className="team-member-button w-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onMeetClick?.();
            }}
          >
            MEET THE PLANNER
          </button>
        </div>
        {role && (
          <div className="absolute top-4 left-4 team-member-role">
            <span>{role}</span>
          </div>
        )}
      </div>
      <h3 className="team-member-name text-base mb-1.5 text-left leading-none">{name}</h3>
      {nickname && (
        <p className="team-member-description font-geologica text-primary text-xs mb-1 leading-[0.75] tracking-tight">"{nickname}"</p>
      )}
      {profession && (
        <p className="team-member-description font-geologica text-gray-600 text-xs mb-1 text-left leading-[0.75] tracking-tight">{profession}</p>
      )}
      {experience && (
        <p className="team-member-description font-geologica text-gray-600 text-xs text-left leading-[0.75] tracking-tight mb-2">{experience}</p>
      )}
    </div>
  );
} 