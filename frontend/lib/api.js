const API_URL = 'http://localhost:5000/campaigns';

export const fetchCampaigns = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch campaigns');
    return res.json();
};

export const fetchCampaignById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Failed to fetch campaign');
    return res.json();
};

export const createCampaign = async (data) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create campaign');
    return res.json();
};

export const updateCampaignStatus = async (id, status) => {
    const res = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
};

export const fetchCampaignStats = async (id) => {
    const res = await fetch(`${API_URL}/${id}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
};
