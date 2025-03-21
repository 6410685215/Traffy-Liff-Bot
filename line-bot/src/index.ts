import express,
{
    Application,
    Request,
    Response
} from 'express'
import
{
    ClientConfig,
    messagingApi,
    middleware,
    MiddlewareConfig,
    webhook,
    HTTPFetchError,
} from '@line/bot-sdk';
import
{
    getDestination,
    getEventType,
    getSeflMention,
    getEventRequest,
    getEventPostbackDataRequest,
    replyMessage,
    replyMessageUpdate,
    replyMessageVerify
} from './handler';
import dotenv from 'dotenv';
dotenv.config();

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
};
const middlewareConfig: MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET || '',
};
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Create a new LINE SDK client.
const client = new messagingApi.MessagingApiClient(clientConfig);
// Create a new Express application.
const app: Application = express();

/* <<<<< Route >>>>> */

// This route is used for checking the server status.
app.get('/bot/',
    async (req: Request, res: Response): Promise<void> => {
        console.log(req.body);
        res.status(200).json(
            {
                status: 'OK',
                message: 'Bot is running!',
            }
        );
});

// This route is used for the Webhook.
app.post('/bot/callback',
    middleware(middlewareConfig),
    async (req: Request, res: Response): Promise<void> => {
        const callbackRequest: webhook.CallbackRequest = req.body;
        const events: webhook.Event[] = callbackRequest.events!;
        const botUserID: string =  getDestination(callbackRequest);

        try {
            await Promise.all(
                events.map(
                    async (event: webhook.Event): Promise<void> => {
                    switch (getEventType(event)) {
                        case 'message': {
                            if (getSeflMention(event as webhook.MessageEvent)) {
                                await replyMessage(client, event as webhook.MessageEvent, botUserID);
                            }
                            if (getEventRequest(event as webhook.MessageEvent, '[updateStatus]')) {
                                await replyMessageUpdate(client, event as webhook.MessageEvent);
                            }
                            if (getEventRequest(event as webhook.MessageEvent, '[verifyInform]')) {
                                await replyMessageVerify(client, event as webhook.MessageEvent);
                            }
                            break;
                        }
                        case 'postback': {
                            if (getEventPostbackDataRequest(event as webhook.PostbackEvent, '[updateStatus]')) {
                                await replyMessageUpdate(client, event as webhook.PostbackEvent);
                            }
                            break;
                        }
                    }
                })
            );
            res.status(200).json({ status: 'OK' });
        } catch (err: any) {
            if (err instanceof HTTPFetchError) {
                console.error(err.status);
                console.error(err.headers.get('x-line-request-id'));
                console.error(err.body);
              } else if (err instanceof Error) {
                console.error(err);
              }
            res.status(500).json({ status: 'error' });
        }
});

// Create a server and listen to it.
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});