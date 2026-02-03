'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCampaignById, fetchCampaignStats, updateCampaignStatus } from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';
import {
    ArrowLeft,
    Calendar,
    DollarSign,
    BarChart2,
    MousePointer,
    Activity,
    Play,
    Pause,
    Loader2
} from 'lucide-react';

export default function CampaignDetailPage({ params }) {
    const router = useRouter();
    const { id } = use(params);

    const [campaign, setCampaign] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [campaignData, statsData] = await Promise.all([
                fetchCampaignById(id),
                fetchCampaignStats(id)
            ]);
            setCampaign(campaignData);
            setStats(statsData);
        } catch (err) {
            setError('Failed to load campaign data');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async () => {
        if (!campaign) return;
        setUpdating(true);
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';

        try {
            const updatedCampaign = await updateCampaignStatus(id, newStatus);
            setCampaign(updatedCampaign);
        } catch (err) {
            alert('Impossible de mettre à jour le statut');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
    );

    if (error || !campaign) return (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-center">
            {error || 'Campagne introuvable'}
            <button onClick={() => router.back()} className="ml-4 underline">Retour</button>
        </div>
    );

    return (
        <div>
            <div className="mb-6 flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
                    <p className="text-gray-500 text-sm">ID: {campaign._id}</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <StatusBadge status={campaign.status} />
                    {campaign.status !== 'finished' && (
                        <button
                            onClick={handleStatusToggle}
                            disabled={updating}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${campaign.status === 'active'
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                }`}
                        >
                            {updating ? <Loader2 className="animate-spin" size={16} /> : (
                                campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />
                            )}
                            {campaign.status === 'active' ? 'Mettre en Pause' : 'Activer la Campagne'}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                        <DollarSign size={20} />
                        <span className="font-medium">Budget</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(campaign.budget)}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                        <Calendar size={20} />
                        <span className="font-medium">Calendrier</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                        {new Date(campaign.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">au</p>
                    <p className="text-sm font-semibold text-gray-900">
                        {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-2">
                        <Activity size={20} />
                        <span className="font-medium">Annonceur</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{campaign.advertiser}</p>
                </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4">Statistiques de Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Impressions"
                    value={stats?.impressions.toLocaleString() || '0'}
                    icon={<BarChart2 className="text-blue-500" />}
                />
                <StatCard
                    label="Clics"
                    value={stats?.clicks.toLocaleString() || '0'}
                    icon={<MousePointer className="text-purple-500" />}
                />
                <StatCard
                    label="CTR"
                    value={stats?.ctr + '%'}
                    icon={<Activity className="text-emerald-500" />}
                />
                <StatCard
                    label="CPC"
                    value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats?.cpc || 0)}
                    icon={<DollarSign className="text-amber-500" />}
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
        </div>
    );
}
