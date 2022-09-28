import { App, Block, KnownBlock } from "@slack/bolt";
import botConfig from "./botConfig.json";

export default

class SlackActionWrapper{

    public constructor( 
        private readonly app: App
    )
    {}

    public async postMessage(text: string){
        const res = await this.app.client.chat.postMessage({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            text: text,
        })

        if (!res.ok) console.error(res)

        return res;
    }

    public async updateMessage(timeStamp: string, text: string){
        const result = await this.app.client.chat.update({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            ts: timeStamp,
            text: text,
        })

        if (!result.ok) console.error(result)

        return result;
    }

    public async updateBlockText(timeStamp: string, text: string, blocks: (KnownBlock | Block)[]){
        const result = await this.app.client.chat.update({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            ts: timeStamp,
            text: text,
            blocks: blocks,
        })

        if (!result.ok) console.error(result)

        return result;
    }

    public async postBlockText(text: string, blocks: (KnownBlock | Block)[]){
        const result = await this.app.client.chat.postMessage({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            text: text,
            blocks: blocks
        })

        if (!result.ok) console.error(result)

        return result
    }

    public async addPinsItem(timeStamp: string){
        const result = await this.app.client.pins.add({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            timestamp: timeStamp
        })

        if (!result.ok) console.error(result)

        return result
    }

    public async removePinsItem(timeStamp: string){
        const result = await this.app.client.pins.remove({
            token: botConfig.botToken,
            channel: botConfig.targetChannel,
            timestamp: timeStamp
        })

        if (!result.ok) console.error(result)

        return result
    }

    public async fetchEmojiList(): Promise<Array<string>>{
        let result: Array<string> = [];

        const fetchedList = await this.app.client.emoji.list({
            token: botConfig.botToken
        });

        if (fetchedList.emoji==null) return result;

        for (let emoji in fetchedList.emoji){
            result.push(emoji);
        }

        return result;
    }
}


