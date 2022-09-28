import { App, GenericMessageEvent } from "@slack/bolt";
import botConfig from "./botConfig.json";
import { logger } from "./logger";
import MessageCollector from "./messageCollector";
import SlackActionWrapper from "./slackActionWrapper";

export async function processBotRoutine(){
    const app: App = new App({
        token: botConfig.botToken,
        appToken: botConfig.appToken,
        
        socketMode: true
    });

    const slackAction = new SlackActionWrapper(app)
    await slackAction.postMessage("Initializing...")

    const messageCollector = new MessageCollector(slackAction);

    app.event("message", async ({event, say}) =>{
        const messageEvent: GenericMessageEvent = event as GenericMessageEvent
        messageCollector.onReceivedMessage(messageEvent)
    });

    await app.start();

    logger.log("Bolt app is running up.");

    await slackAction.postMessage("App is running up.");
}


