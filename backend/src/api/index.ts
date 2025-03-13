import axios from 'axios';

export async function getOrg(uuid_qr: string) {
    const response = await axios.get<{ message: { name: string, group_id: string } }>(`https://kong.traffy.in.th/core-dashboard-api/uuid-check?uuid=${uuid_qr}`);
    return [response.data.message.name, response.data.message.group_id];
}

export async function getUser(accessToken: string) {
    const response = await axios.get<{ userId: string, displayName: string }>('https://api.line.me/v2/profile', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
}