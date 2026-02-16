import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    key: 'testimonial1',
    author: 'author1',
  },
  {
    key: 'testimonial2',
    author: 'author2',
  },
  {
    key: 'testimonial3',
    author: 'author3',
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F3EE] via-white to-[#F5F3EE] opacity-50" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#9FBCD4]" />
            <span className="text-[#9FBCD4] text-sm font-semibold uppercase tracking-wider">
              Testimonios
            </span>
            <div className="w-12 h-[2px] bg-[#9FBCD4]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D]">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="w-16 h-16 bg-[#9FBCD4] rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Carousel Container */}
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 pt-16 relative overflow-hidden">
            {/* Slides */}
            <div className="relative h-[280px] sm:h-[220px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.key}
                  className={`absolute inset-0 transition-all duration-500 ${index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : index < currentIndex
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                    }`}
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#9FBCD4] text-[#9FBCD4]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xl sm:text-2xl text-[#2D2D2D] text-center leading-relaxed mb-8 italic">
                    "{t(`testimonials.${testimonial.key}`)}"
                  </p>

                  {/* Author */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-[#858585ea] rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {t(`testimonials.${testimonial.author}`).charAt(0)}
                      </span>
                    </div>
                    <p className="text-[#9FBCD4] font-semibold">
                      {t(`testimonials.${testimonial.author}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F3EE] hover:bg-[#9FBCD4] flex items-center justify-center transition-colors duration-300 group"
            >
              <ChevronLeft className="w-5 h-5 text-[#2D2D2D] group-hover:text-white" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5F3EE] hover:bg-[#9FBCD4] flex items-center justify-center transition-colors duration-300 group"
            >
              <ChevronRight className="w-5 h-5 text-[#2D2D2D] group-hover:text-white" />
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-[#9FBCD4] w-8'
                    : 'bg-[#2D2D2D]/20 hover:bg-[#2D2D2D]/40'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
