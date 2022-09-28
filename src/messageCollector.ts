import { GenericMessageEvent } from "@slack/bolt";
import { logger } from "./logger";
import SlackActionWrapper from "./slackActionWrapper";
import botConfig from "./botConfig.json"
import { channel } from "diagnostics_channel";
import { getStrRemovedPeriod, sleep } from "./util";

export default
class MessageCollector{
    private collectedQueue: string[] = [];

    public constructor(
        private readonly slackAction: SlackActionWrapper,
    ){
        this.postCollectedMessageAsync();
    }

    /*
    ** メッセージ受信イベント
    */
    public onReceivedMessage(messageEvent: GenericMessageEvent){

        if (this.isValidMessage(messageEvent)===false) return;

        const messageUrl = this.getMessageUrl(messageEvent);

        this.collectedQueue.push(messageUrl);

        logger.info(messageEvent);
    }

    private isValidMessage(messageEvent: GenericMessageEvent){
        return messageEvent.bot_id===undefined && 
            messageEvent.channel!==botConfig.targetChannel &&
            messageEvent.subtype!=="message_changed" &&
            messageEvent.subtype!=="message_deleted";
    }

    private getMessageUrl(messageEvent: GenericMessageEvent){
        const url = `https://${botConfig.workspaceName}.slack.com/archives/${messageEvent.channel}/p${getStrRemovedPeriod(messageEvent.ts)}`;
        return url;
    }

    private async postCollectedMessageAsync(){
        const postDuration = 1000 * 5;

        while (true){
            await sleep(postDuration)

            if (this.collectedQueue.length===0) continue;

            const nextUrl = this.collectedQueue.shift() as string;

            this.slackAction.postMessage(nextUrl);
        }
    }
}

