'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TeamMember from '../TeamMember';
import PlannerModal from '../PlannerModal';
import type { PlannerMember } from '../PlannerModal';
import 'swiper/css';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

type StrapiTeamMember = {
  documentId?: string;
  id?: number;
  Name?: string;
  name?: string;
  role?: string;
  Profession?: string;
  profession?: string;
  experience?: string;
  short_description?: string;
  description?: string;
  long_description?: unknown;
  nickname?: string;
  order?: number;
  Image?: { url?: string } | string | null;
  image?: { url?: string } | string | null;
  [key: string]: unknown;
};

function mapStrapiMember(entry: StrapiTeamMember): PlannerMember | null {
  const id = entry.documentId ?? String(entry.id ?? '');
  const name = (entry.Name ?? entry.name ?? '').trim();
  if (!name && !id) return null;
  const img = entry.Image ?? entry.image;
  const urlOnly = typeof img === 'string' ? img : img?.url ?? '';
  const imageUrl = urlOnly
    ? (urlOnly.startsWith('http') ? urlOnly : `${STRAPI_URL}${urlOnly}`)
    : '';
  return {
    id,
    name,
    role: entry.role ?? undefined,
    profession: (entry.Profession ?? entry.profession) ?? undefined,
    experience: entry.experience ?? undefined,
    description: (entry.short_description ?? entry.description) ?? undefined,
    longDescription: entry.long_description,
    nickname: entry.nickname ?? undefined,
    image: imageUrl,
    order: entry.order ?? 0,
  };
}

export default function Team() {
  const [members, setMembers] = useState<PlannerMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<PlannerMember | null>(null);

  useEffect(() => {
    fetch('/api/team-members')
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = data.detail || data.error || `Failed to load team (${res.status})`;
          throw new Error(msg);
        }
        return data;
      })
      .then((data) => {
        const raw = data.data ?? data;
        const list = Array.isArray(raw) ? raw : [];
        const mapped = list.map(mapStrapiMember).filter((m): m is PlannerMember => m != null && m.name.length > 0);
        const sorted = [...mapped].sort((a, b) => a.order - b.order);
        setMembers(sorted);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white team-section w-full max-w-[100vw] overflow-x-hidden">
      <div className="w-full min-w-0 container mx-auto px-4 sm:px-6 pt-4 pb-20 sm:pb-32">
        <div className="mb-8 sm:mb-12">
          <h2
            className="font-romans leading-[1.05] text-secondary"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}
          >
            MEET <span style={{ opacity: 0.5 }}>THE TEAM</span>
          </h2>
        </div>

        {loading && (
          <div className="py-16 text-center font-geologica text-gray-500">Loading team…</div>
        )}
        {error && (
          <div className="py-16 text-center font-geologica text-red-600 max-w-xl mx-auto">
            <p className="font-semibold">Could not load team.</p>
            <p className="mt-2 text-sm opacity-90">{error}</p>
          </div>
        )}
        {!loading && !error && members.length === 0 && (
          <div className="py-16 text-center font-geologica text-gray-500">
            No team members yet.
          </div>
        )}
        {!loading && !error && members.length > 0 && (
          <div className="team-slider-wrapper pb-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={members.length >= 4}
              speed={2500}
              grabCursor={true}
              autoplay={{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                reverseDirection: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="!overflow-visible"
            >
              {members.map((member) => (
                <SwiperSlide key={member.id} className="swiper-slide-team">
                  <TeamMember
                    {...member}
                    onMeetClick={() => setSelectedMember(member)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <PlannerModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      </div>
    </section>
  );
} 