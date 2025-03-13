import { webhook } from "@line/bot-sdk";

export const getEventType = (event: webhook.Event): string =>
{
    return event.type;
}

export const getEventSourceType = (event: webhook.Event): string =>
{
    if(event.source)
    {
        return event.source.type;
    }
    return 'none source';
}

export const getEventMessageType = (event: webhook.Event): string =>
{
    if('message' in event)
    {
        return event.message.type;
    }
    return 'none message';
}

export const getEventPostbackData = (event: webhook.Event): string =>
{
    if('postback' in event)
    {
        return event.postback.data;
    }
    return 'none postback';
}

export const getDestination = (callback: webhook.CallbackRequest): string =>
{
    return callback.destination;
}

export const getReplyToken = (event: webhook.MessageEvent | webhook.PostbackEvent): string =>
{
    if (event.replyToken)
    {
        return event.replyToken;
    }
    return 'none replyToken';
}

export const getEventMessageText = (event: webhook.MessageEvent): string =>
{
    if(event.message.type === 'text')
    {
        return event.message.text;
    }
    return 'none text';
}

export const getEventSourceUserID = (event: webhook.Event): string =>
{
    if(event.source && event.source.userId)
    {
        return event.source.userId
    }
    return 'none userId';
}

export const getEventSourceGroupID = (event: webhook.Event): string =>
{
    if(event.source && event.source.type === 'group' && event.source.groupId)
    {
        return event.source.groupId
    }
    return 'none groupId';
}

const isSeflMention = (mention: webhook.Mentionee): boolean =>
{
    return mention.type === 'user' && (mention.isSelf ?? false);
}

export const getSeflMention = (event: webhook.MessageEvent): boolean =>
{
    if(event.message.type === 'text')
    {
        return event.message.mention ?
        event.message.mention.mentionees.some(isSeflMention) : false;
    }
    return false;
}