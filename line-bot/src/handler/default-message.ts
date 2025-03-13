import
{
    webhook,
    TextMessage,
} from '@line/bot-sdk';
import { get } from 'http';
import { console } from 'inspector';

export const defaultMessage = (event: webhook.Event, botUserID: string, groupId: string): TextMessage =>
{
    interface VariablesEnv
    {
        PUBLIC_URL: string;
        LIFF_URL: string;
    }
    const { PUBLIC_URL, LIFF_URL} = process.env as unknown as VariablesEnv;
    // const PUBLIC_URL = process.env.PUBLIC_URL;
    // const LIFF_URL = process.env.LIFF_URL;
    const message: TextMessage =
    {
        type: 'text',
        text: "สวัสดีจ้า! 🙏✨ Traffy Fondue พร้อมช่วยแล้ว 🚀 บอกมาเลยว่าอยากให้ช่วยอะไร เดี๋ยวจัดการให้!",
        quickReply: {
            items: [
                {
                    type: 'action',
                    imageUrl: `${PUBLIC_URL}/quickreply-icons/megaphone.png`,
                    action: {
                        type: 'uri',
                        label: 'แจ้งเรื่อง',
                        uri: `${LIFF_URL}/inform?groupId=${groupId}&botUserId=${botUserID}`
                    }
                },
                {
                    type: 'action',
                    imageUrl: `${PUBLIC_URL}/quickreply-icons/foldercheck.png`,
                    action: {
                        type: 'uri',
                        label: 'ตรวจสอบสถานะ',
                        uri: `${LIFF_URL}/status?groupId=${groupId}`
                    }
                }
            ]
        }
    };

    return message;
}