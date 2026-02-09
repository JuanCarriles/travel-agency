// Location information for the module
export interface TravelLocation {
    name: string;
    type: 'city' | 'natural' | 'cultural';
    image: string;
}

// Attraction with visual assets
export interface Attraction {
    id: string;
    name?: string; // Optional: some attractions include name directly (though i18n is preferred)
    image: string;
    type: 'natural' | 'cultural' | 'adventure';
    description: string;
}

// Single day in the itinerary
export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
}

// Complete itinerary information
export interface Itinerary {
    pdfUrl: string;
    days: ItineraryDay[];
}

export interface WhatsIncludedItem {
    name: string;
    icon: string;
}

// Main Module structure
export interface Module {
    id: string;
    name: string;
    summary: string;
    coverImage: string;
    numberOfDays: number;
    numberOfPeople: number;
    locations: TravelLocation[];
    mainAttractions: Attraction[];
    itinerary?: Itinerary;
    whatsIncluded?: WhatsIncludedItem[];
}

// Module data structure loaded from JSON
export interface ModulesData {
    modules: Module[];
}
