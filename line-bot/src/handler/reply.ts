import
{
    getSeflMention,
    getEventSourceGroupID,
    getEventSourceUserID,
    getEventMessageText,
    getReplyToken,
    getDestination,
    getEventPostbackData,
} from './check-event';

import
{
    defaultMessage,
} from './default-message';

import
{
    webhook,
    TextMessage,
    messagingApi,
} from '@line/bot-sdk';


export const replyMessage =
async (
    client: messagingApi.MessagingApiClient,
    event: webhook.MessageEvent,
    botUserID: string,
    message?: TextMessage
): Promise<void> =>
{
    const groupId: string = getEventSourceGroupID(event);
    const replyToken: string = getReplyToken(event);

    if (message === undefined) {
        message = defaultMessage(event, botUserID, groupId);
    } else {
        message = message;
    }

    client.replyMessage(
        {
            replyToken: replyToken,
            messages: [message],
        }
    )
}