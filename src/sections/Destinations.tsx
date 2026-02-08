import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const destinations = [
  {
    key: 'noa',
    image: '/images/destino-noa.jpg',
  },
  {
    key: 'buenosaires',
    image: '/images/destino-buenosaires.jpg',
  },
  {
    key: 'patagonia',
    image: '/images/destino-patagonia.jpg',
  },
];

export default function Destinations() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="destinations"
      ref={ref}
      className="py-20 md:py-32 bg-[#F5F3EE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#EFB4A7]" />
            <span className="text-[#EFB4A7] text-sm font-semibold uppercase tracking-wider">
              Destinos
            </span>
            <div className="w-12 h-[2px] bg-[#EFB4A7]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <div
              key={dest.key}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={dest.image}
                  alt={t(`destinations.${dest.key}.title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-[#EFB4A7] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {dest.key === 'noa' && 'NOA'}
                  {dest.key === 'buenosaires' && 'CABA'}
                  {dest.key === 'patagonia' && 'Patagonia'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 group-hover:text-[#EFB4A7] transition-colors duration-300">
                  {t(`destinations.${dest.key}.title`)}
                </h3>
                <p className="text-[#2D2D2D]/70 mb-4 line-clamp-2">
                  {t(`destinations.${dest.key}.description`)}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[#EFB4A7] font-semibold hover:gap-3 transition-all duration-300"
                >
                  {t('destinations.cta')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[#EFB4A7] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
