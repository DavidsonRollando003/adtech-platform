'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '@/lib/api';
import { Loader2, Save } from 'lucide-react';

export default function NewCampaignPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        advertiser: '',
        budget: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            await createCampaign({
                ...formData,
                budget: Number(formData.budget),
            });
            router.push('/campaigns');
        } catch (err) {
            setError(err.message || 'Une erreur est survenue');
            setSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Nouvelle Campagne</h1>
                <p className="text-gray-500">Configurez votre nouvelle campagne publicitaire.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Campagne</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="ex. Soldes d'Été 2024"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Annonceur</label>
                            <input
                                required
                                type="text"
                                name="advertiser"
                                value={formData.advertiser}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="ex. Acme Corp"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de Début</label>
                            <input
                                required
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de Fin</label>
                            <input
                                required
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2" size={16} />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <Save className="-ml-1 mr-2" size={16} />
                                    Créer la Campagne
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
