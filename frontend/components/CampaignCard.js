import Link from 'next/link';
import { Calendar, DollarSign, BarChart2, MousePointer } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function CampaignCard({ campaign }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : '0.00';

    return (
        <Link
            href={`/campaigns/${campaign._id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 transition-all duration-300 animate-slide-up group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {campaign.name}
                    </h3>
                    <p className="text-sm text-gray-500">{campaign.advertiser}</p>
                </div>
                <StatusBadge status={campaign.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>{formatCurrency(campaign.budget)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
                </div>
            </div>

            <div className="border-t border-gray-50 pt-4 flex justify-between text-sm">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Impressions</span>
                    <div className="flex items-center gap-1 font-medium text-gray-700">
                        <BarChart2 size={14} />
                        {campaign.impressions.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400 uppercase font-semibold">CTR</span>
                    <div className="flex items-center gap-1 font-medium text-gray-700">
                        <MousePointer size={14} />
                        {ctr}%
                    </div>
                </div>
            </div>
        </Link >
    );
}
