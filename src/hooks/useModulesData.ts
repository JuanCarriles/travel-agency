import { useState, useEffect } from 'react';
import type { Module, ModulesData } from '@/types/modules';

interface UseModulesDataReturn {
    modules: Module[];
    loading: boolean;
    error: Error | null;
}

/**
 * Custom hook to fetch modules data from public/data/modules.json
 * Handles loading states and errors
 * @returns {UseModulesDataReturn} Object containing modules array, loading state, and error state
 */
export function useModulesData(): UseModulesDataReturn {
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/modules.json');

                if (!response.ok) {
                    throw new Error(`Failed to fetch modules: ${response.status} ${response.statusText}`);
                }

                const data: ModulesData = await response.json();

                // Validate that the data has the expected structure
                if (!data.modules || !Array.isArray(data.modules)) {
                    throw new Error('Invalid modules data structure');
                }


                setModules(data.modules);
                setError(null);
            } catch (err) {
                console.error('Error loading modules data:', err);
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
                setModules([]);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, []);

    return { modules, loading, error };
}
