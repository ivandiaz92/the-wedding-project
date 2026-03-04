'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type PlannerMember = {
  id: string;
  name: string;
  role?: string;
  profession?: string;
  experience?: string;
  description?: string;
  longDescription?: unknown;
  nickname?: string;
  image: string;
  order: number;
};

function blocksToText(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  function extractText(node: unknown): string {
    if (!node || typeof node !== 'object') return '';
    const n = node as { text?: string; children?: unknown[] };
    if (typeof n.text === 'string') return n.text;
    if (Array.isArray(n.children)) return n.children.map(extractText).join('');
    return '';
  }
  return blocks
    .map((block: unknown) => extractText(block))
    .filter(Boolean)
    .join('\n\n');
}

type Props = {
  member: PlannerMember | null;
  onClose: () => void;
};

const BACKDROP_DURATION = 0.25;
const CARD_DURATION = 0.4;
const CARD_DELAY = 0.08;
const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function PlannerModal({ member, onClose }: Props) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!member) return;
    setIsExiting(false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [member]);

  const handleClose = useCallback(() => {
    setIsExiting((prev) => {
      if (prev) return prev;
      return true;
    });
  }, []);

  function onExitComplete() {
    onClose();
  }

  useEffect(() => {
    if (!member) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    document.addEventListener('keydown', onEscape, true);
    return () => document.removeEventListener('keydown', onEscape, true);
  }, [member, handleClose]);

  if (!member) return null;

  const longText = member.longDescription
    ? blocksToText(member.longDescription)
    : '';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: BACKDROP_DURATION, ease: EASE }}
      onClick={isExiting ? undefined : handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`About ${member.name}`}
    >
      <motion.div
        className="relative flex flex-col md:flex-row items-start gap-6 md:gap-8 w-full max-w-4xl max-h-[85vh] pointer-events-auto"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? 12 : 0,
          scale: isExiting ? 0.98 : 1,
        }}
        transition={{
          duration: CARD_DURATION,
          delay: isExiting ? 0 : CARD_DELAY,
          ease: EASE,
        }}
        onAnimationComplete={isExiting ? onExitComplete : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid: photo on the table */}
        <motion.div
          className="flex-shrink-0 w-[min(100%,260px)] mx-auto md:mx-0 md:w-[42%] md:max-w-[380px]"
          initial={{ opacity: 0, rotate: -4 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ duration: CARD_DURATION, delay: CARD_DELAY + 0.05, ease: EASE }}
        >
          <div
            className="relative bg-white p-4 pb-10 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] rounded-sm"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <div className="relative w-full aspect-[3/4] min-h-[240px] md:min-h-[280px] bg-gray-100 overflow-hidden">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 42vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-geologica text-sm">
                  No photo
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Paper card: credentials + bio */}
        <motion.div
          className="flex-1 min-w-0 flex flex-col rounded-sm overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)]"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: CARD_DURATION, delay: CARD_DELAY + 0.1, ease: EASE }}
          style={{
            background: 'linear-gradient(180deg, #FDF8F3 0%, #FAF4EE 100%)',
            border: '1px solid rgba(196, 164, 132, 0.25)',
          }}
        >
          <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-1 min-h-0">
            {member.role && (
              <p className="font-geologica text-primary text-xs tracking-[0.2em] uppercase mb-1">
                {member.role}
              </p>
            )}
            <h2 className="font-cormorant text-2xl sm:text-3xl text-secondary font-semibold mb-0.5">
              {member.name}
            </h2>
            {member.nickname && (
              <p className="font-geologica text-primary/90 text-sm mb-2">
                &ldquo;{member.nickname}&rdquo;
              </p>
            )}
            {(member.profession || member.experience) && (
              <p className="font-geologica text-secondary/80 text-sm mb-4">
                {[member.profession, member.experience].filter(Boolean).join(' · ')}
              </p>
            )}
            {longText ? (
              <div className="font-geologica text-secondary/90 text-sm sm:text-base leading-relaxed whitespace-pre-line overflow-y-auto flex-1 pr-1">
                {longText}
              </div>
            ) : (
              <p className="text-gray-400 font-geologica text-sm">
                No additional bio yet.
              </p>
            )}
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full text-secondary/80 hover:text-secondary bg-white/95 hover:bg-white border border-gray-200/80 shadow-md transition-colors disabled:pointer-events-none"
          aria-label="Close"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          disabled={isExiting}
        >
          <span className="text-xl leading-none">&times;</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
