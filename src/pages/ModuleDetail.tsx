import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Download, MessageCircle, Mail, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useModulesData } from '@/hooks/useModulesData';
import * as LucideIcons from 'lucide-react';

// Icon mapping for dynamic icon loading
const iconMap: Record<string, any> = {
    Car: LucideIcons.Car,
    Hotel: LucideIcons.Hotel,
    User: LucideIcons.User,
    UtensilsCrossed: LucideIcons.UtensilsCrossed,
    Phone: LucideIcons.Phone,
    Shield: LucideIcons.Shield,
    Camera: LucideIcons.Camera,
    Mountain: LucideIcons.Mountain,
    Ticket: LucideIcons.Ticket,
};

export default function ModuleDetail() {
    const { moduleId } = useParams<{ moduleId: string }>();
    const { t, i18n } = useTranslation();
    const { modules, loading, error } = useModulesData();

    // Get current language with proper fallback
    const validLanguages = ['es', 'en', 'he'] as const;
    const detectedLang = i18n.language?.split('-')[0]; // Handle 'en-US' -> 'en'
    const currentLang = (validLanguages.includes(detectedLang as any) ? detectedLang : 'en') as 'es' | 'en' | 'he';
    const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation<HTMLDivElement>({ startVisible: true });
    const { ref: attractionsRef, isVisible: attractionsVisible } = useScrollAnimation<HTMLDivElement>({ startVisible: true });
    const { ref: itineraryRef, isVisible: itineraryVisible } = useScrollAnimation<HTMLDivElement>({ startVisible: true });

    // Scroll to top when entering the module detail page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [moduleId]);

    // Handle loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 text-[#9FBCD4] animate-spin mx-auto mb-4" />
                    <p className="text-lg text-[#2D2D2D]">{t('modules.loading') || 'Loading...'}</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <p className="text-lg text-red-600 mb-4">
                        {t('modules.errorLoading') || 'Error loading module data.'}
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-[#9FBCD4] hover:text-[#2D2D2D] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('modules.backToHome') || 'Back to Home'}
                    </Link>
                </div>
            </div>
        );
    }

    const module = modules.find((m) => m.id === moduleId);

    if (!module) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* Hero Section with Background Image */}
            <div
                className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center pt-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.5)), url(${module.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={`absolute top-24 z-10 ${t('nav.home') === 'בית' ? 'right-4 sm:right-6' : 'left-4 sm:left-6'}`}>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-white hover:text-[#9FBCD4] transition-colors duration-300 px-2 py-1"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{t('modules.backToHome') || 'Home'}</span>
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
                        {module.name[currentLang]}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                        {module.summary[currentLang]}
                    </p>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap px-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="text-sm sm:text-base md:text-lg line-clamp-1">
                                {module.locations.map((loc) => loc.name[currentLang]).join(', ')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trip Overview Section */}
            <div
                ref={overviewRef}
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 transition-all duration-700 ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4 sm:mb-6 md:mb-8">
                    {t('modules.tripOverview') || 'Trip Overview'}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-[#2D2D2D]/80 leading-relaxed">
                    {module.description[currentLang]}
                </p>
            </div>

            {/* Main Attractions Section */}
            <div ref={attractionsRef} className="bg-white py-12 sm:py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-8 sm:mb-10 md:mb-12 text-center">
                        {t('modules.mainAttractions')}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {module.mainAttractions.map((attraction, index) => (
                            <div
                                key={index}
                                className={`relative rounded-2xl overflow-hidden group transition-all duration-500 ${attractionsVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="relative h-56 sm:h-64">
                                    <img
                                        src={attraction.image}
                                        alt={attraction.name[currentLang]}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                                        <div className="inline-block bg-[#9FBCD4]/90 text-xs font-semibold px-2 py-1 rounded mb-2 uppercase text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                                            {t(`attractionTypes.${attraction.type}`)}
                                        </div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                                            {attraction.name[currentLang]}
                                        </h3>
                                        <p className="text-sm sm:text-base text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                                            {attraction.description[currentLang]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Itinerary Section */}
            <div ref={itineraryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
                <div className="mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D]">
                        {t('modules.dailyItinerary')}
                    </h2>
                </div>

                {module.itinerary ? (
                    <>
                        <div className="space-y-4 sm:space-y-6">
                            {module.itinerary.days.map((day, index) => (
                                <div
                                    key={day.day}
                                    className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-500 ${itineraryVisible
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-10'
                                        }`}
                                    style={{
                                        transitionDelay: `${index * 80}ms`,
                                    }}
                                >
                                    <div className="flex gap-3 sm:gap-4 md:gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#9FBCD4] flex items-center justify-center">
                                                <span className="text-white font-bold text-sm sm:text-base md:text-lg">D{day.day}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#2D2D2D] mb-1 sm:mb-2">
                                                {day.title[currentLang]}
                                            </h3>
                                            <p className="text-sm sm:text-base text-[#2D2D2D]/70 leading-relaxed">
                                                {day.description[currentLang]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {module.itinerary.pdfUrl && (
                            <div className="mt-6 sm:mt-8">
                                <a
                                    href={module.itinerary.pdfUrl}
                                    download
                                    className="flex items-center justify-center gap-2 w-full bg-[#9FBCD4] hover:bg-[#7cb2dd] text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#9FBCD4]/30 min-h-[44px]"
                                >
                                    <Download className="w-5 h-5" />
                                    {t('modules.downloadItinerary')}
                                </a>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-sm transition-all duration-700 ${itineraryVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                        }`}>
                        <div className="flex flex-col items-center gap-4">
                            <MessageCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#9FBCD4]" />
                            <p className="text-base sm:text-lg md:text-xl text-[#2D2D2D] max-w-2xl">
                                {t('modules.noItineraryMessage')}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* What's Included Section */}
            <section className="py-20 md:py-32 bg-[#232121fa] relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                            <span className="text-[#9FBCD4] text-sm font-semibold uppercase tracking-wider services-text-shadow">
                                {t('modules.whatsIncluded') || "What's Included"}
                            </span>
                            <div className="w-12 h-[2px] bg-[#9FBCD4]" />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {module.whatsIncluded?.map((item, index) => {
                            const Icon = iconMap[item.icon];
                            return (
                                <div
                                    key={item.name[currentLang]}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#9FBCD4]/50 transition-all duration-500"
                                    style={{
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Icon */}
                                    <div className="relative mb-4">
                                        <div className="w-14 h-14 rounded-full bg-[#9FBCD4]/20 flex items-center justify-center group-hover:bg-[#9FBCD4]/30 transition-colors duration-300">
                                            <Icon className="w-7 h-7 text-[#9FBCD4]" />
                                        </div>
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 w-14 h-14 rounded-full bg-[#9FBCD4]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#9FBCD4] transition-colors duration-300 services-text-shadow">
                                        {item.name[currentLang]}
                                    </h3>

                                    {/* Decorative Corner */}
                                    <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute top-4 right-4 w-8 h-[2px] bg-[#9FBCD4]" />
                                        <div className="absolute top-4 right-4 w-[2px] h-8 bg-[#9FBCD4]" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Customization Notice */}
            <div className="bg-gradient-to-r from-[#9FBCD4]/10 to-[#9FBCD4]/5 py-12 md:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border-l-4 border-[#9FBCD4]">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-[#9FBCD4] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] mb-3">
                                    {t('modules.customizableTitle')}
                                </h3>
                                <p className="text-base sm:text-lg text-[#2D2D2D]/80 leading-relaxed">
                                    {t('modules.customizableMessage')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-3 sm:mb-4">
                    {t('modules.readyToExperience') || 'Ready to experience this?'}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-[#2D2D2D]/70 mb-8 sm:mb-10 px-2">
                    {t('modules.customizeTrip') || 'Contact us and we\'ll customize your group trip'}
                </p>

                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-3xl mx-auto">
                    {/* Email Button */}
                    <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@gatesto.com&su=${encodeURIComponent(module.name[currentLang])}&body=${encodeURIComponent(module.inquiryText[currentLang])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 bg-[#EA4335] hover:bg-[#D33426] text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#EA4335]/40 hover:scale-105 flex-1"
                    >
                        <Mail className="w-6 h-6" />
                        <span>{t('modules.contactViaGmail')}</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                        href={`https://wa.me/543813598639?text=${encodeURIComponent(module.inquiryText[currentLang])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE57] text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-105 flex-1"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span>{t('modules.contactViaWhatsApp')}</span>
                    </a>

                    {/* GroupMe Button  
                    <a
                        href={`https://groupme.com/contact/101879750/UfDn3LFL`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 bg-[#00AFF0] hover:bg-[#009DD9] text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#00AFF0]/40 hover:scale-105 flex-1"
                    >
                        <img src="/images/groupme-icon.png" alt="GroupMe" className="w-6 h-6" />
                        <span>{t('modules.contactViaGroupMe')}</span>
                    </a>*/}
                </div>
            </div>
        </div>
    );
}
