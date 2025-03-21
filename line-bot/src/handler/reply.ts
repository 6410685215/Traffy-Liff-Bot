import
{
    getEventSourceGroupID,
    getReplyToken,
    getEventRequestUpdateId,
    getEventPostbackDataUpdateId,
} from './check-event';
import axios from "axios";

import
{
    defaultMessage,
} from './default-message';

import
{
    defaultBubble,
    generateId
} from '../utils';

import
{
    webhook,
    Message,
    messagingApi,
} from '@line/bot-sdk';
import dotenv from 'dotenv';
import { FlexContainer } from '@line/bot-sdk/dist/messaging-api/api';
dotenv.config();

const BaseUrl = process.env.BASE_URL || '';

export const replyMessage =
async (
    client: messagingApi.MessagingApiClient,
    event: webhook.MessageEvent,
    botUserID?: string,
    message?: Message
): Promise<void> =>
{
    const groupId: string = getEventSourceGroupID(event);
    const replyToken: string = getReplyToken(event);

    if (message === undefined) {
        if (botUserID === undefined) {
            throw new Error('botUserID is undefined');
        }
        const message = defaultMessage(event, botUserID, groupId);
        client.replyMessage(
            {
                replyToken: replyToken,
                messages: [message]
            }
        )
    }
}

export const replyMessageUpdate =
async (
    client: messagingApi.MessagingApiClient,
    event: webhook.MessageEvent | webhook.PostbackEvent
): Promise<void> =>
{
    const informId = event.type === 'message' ? getEventRequestUpdateId(event) : getEventPostbackDataUpdateId(event);
    const response = await axios.get(`${BaseUrl}/backend/get/inform/${informId}`);
    const inform = response.data.inform;

    if (!process.env.LIFF_ID) {
        throw new Error('LIFF_ID is not defined in environment variables');
    }

    const idEncrypt = generateId(inform.timeStamp, inform.id);
    const orgName = inform.org_name;
    const timeStamp = inform.timeStamp;
    const type = inform.type;
    const message = defaultBubble("อัปเดตเรื่องแจ้ง", idEncrypt, informId, inform.status, type, orgName, timeStamp, "https://cdn-icons-png.flaticon.com/512/9833/9833330.png");

    const replyToken: string = getReplyToken(event);
    client.replyMessage(
        {
            replyToken: replyToken,
            messages: [{
                type: 'flex',
                altText: 'This is a Flex Message',
                contents: message as FlexContainer
            }]
        }
    )
}

export const replyMessageVerify =
async (
    client: messagingApi.MessagingApiClient,
    event: webhook.MessageEvent
): Promise<void> =>
{
    const informId = getEventRequestUpdateId(event);
    const response = await axios.get(`${BaseUrl}/backend/get/inform/${informId}`);
    const inform = response.data.inform;

    if (!process.env.LIFF_ID) {
        throw new Error('LIFF_ID is not defined in environment variables');
    }

    const idEncrypt = generateId(inform.timeStamp, inform.id);
    const orgName = inform.org_name;
    const timeStamp = inform.timeStamp;
    const type = inform.type;
    const message = defaultBubble("ยืนยันการแจ้งเรื่อง", idEncrypt, informId, inform.status, type, orgName, timeStamp);

    const replyToken: string = getReplyToken(event);
    client.replyMessage(
        {
            replyToken: replyToken,
            messages: [{
                type: 'flex',
                altText: 'This is a Flex Message',
                contents: message as FlexContainer
            }]
        }
    )
}