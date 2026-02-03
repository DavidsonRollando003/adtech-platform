'use client';

import { useEffect, useState } from 'react';
import { fetchCampaigns } from '@/lib/api';
import CampaignCard from '@/components/CampaignCard';
import { Loader2 } from 'lucide-react';

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            const data = await fetchCampaigns();
            setCampaigns(data);
        } catch (err) {
            setError('Impossible de charger les campagnes. Le backend est-il démarré ?');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-center">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Campagnes</h1>
                <p className="text-gray-500">Gérez et suivez vos campagnes publicitaires.</p>
            </div>

            {campaigns.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Aucune campagne trouvée. Créez votre première campagne !</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>
            )}
        </div>
    );
}
