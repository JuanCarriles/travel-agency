import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useModulesData } from '@/hooks/useModulesData';

export default function Modules() {
    const { t, i18n } = useTranslation();
    const { ref, isVisible } = useScrollAnimation<HTMLElement>();
    const { modules, loading, error } = useModulesData();

    // Get current language with proper fallback
    const validLanguages = ['es', 'en', 'he'] as const;
    const detectedLang = i18n.language?.split('-')[0]; // Handle 'en-US' -> 'en'
    const currentLang = (validLanguages.includes(detectedLang as any) ? detectedLang : 'en') as 'es' | 'en' | 'he';

    return (
        <section
            id="modules"
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
                        <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                        <span className="text-[#9FBCD4] text-sm font-semibold uppercase tracking-wider">
                            {t('nav.destinations')}
                        </span>
                        <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
                        "{t('modules.title')}"
                    </h2>
                    <p className="text-lg text-[#2D2D2D]/70 max-w-2xl mx-auto">
                        {t('modules.subtitle')}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-[#9FBCD4] animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-lg text-red-600">
                            {t('modules.errorLoading') || 'Error loading modules. Please try again later.'}
                        </p>
                    </div>
                )}

                {/* Modules Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map((module, index) => (
                            <Link
                                key={module.id}
                                to={`/modules/${module.id}`}
                                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                                    } block`}
                                style={{
                                    transitionDelay: `${index * 150}ms`,
                                }}
                            >
                                {/* Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={module.coverImage}
                                        alt={module.name[currentLang]}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Tag Badge - Dynamic */}
                                    {module.tag && (
                                        <div className="absolute top-4 left-4 bg-[#9FBCD4] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                            {module.tag[currentLang]}
                                        </div>
                                    )}

                                    {/* Module Details Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 text-white">

                                        <div className="flex items-center gap-1 text-sm opacity-90">
                                            <MapPin className="w-4 h-4" />
                                            <span>{module.locations.length} {t('modules.travelLocations')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 group-hover:text-[#9FBCD4] transition-colors duration-300">
                                        {module.name[currentLang]}
                                    </h3>
                                    <p className="text-[#2D2D2D]/70 mb-4 line-clamp-2">
                                        {module.summary[currentLang]}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-[#9FBCD4] font-semibold group-hover:gap-3 transition-all duration-300">
                                        {t('modules.cta')}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-[#9FBCD4] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
