import { GenericMessageEvent } from "@slack/bolt";
import { logger } from "./logger";
import SlackActionWrapper from "./slackActionWrapper";

export default
class MessageCollector{
    public constructor(
        private readonly slackAction: SlackActionWrapper,
    ){}

    public onReceivedMessage(event: GenericMessageEvent){
        const messageEvent: GenericMessageEvent = event as GenericMessageEvent

        logger.info(messageEvent);
    }
}

