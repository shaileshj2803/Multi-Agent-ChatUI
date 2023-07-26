import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain";
import { ILLMModel } from "../type";

export interface IOpenAIModel extends ILLMModel
{
    maxTokens: number;
    temperature: number;
    topP: number;
    presencePenalty: number;
    frequencyPenalty: number;
    stop: string[];
    apiKey?: string;
    model: string;
}

export interface ITextDavinci003 extends IOpenAIModel{
    type: "openai.text-davinci-003";
    model: "text-davinci-003";
    isStreaming: true;
    isChatModel: false;
}

export interface IGPT35Turbo extends IOpenAIModel{
    type: "openai.gpt-35-turbo";
    model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0613";
    isStreaming: true;
    isChatModel: true;
}

export class TextDavinci003 extends OpenAI{
    type: string;
    constructor(fields: ITextDavinci003){
        super({
            temperature: fields.temperature ?? 0.7,
            topP: fields.topP ?? 1,
            presencePenalty: fields.presencePenalty ?? 0,
            frequencyPenalty: fields.frequencyPenalty ?? 0,
            stop: fields.stop,
            streaming: fields.isStreaming ?? false,
            openAIApiKey: fields.apiKey,
            modelName: fields.model,
        })

        this.type = fields.type ?? "openai.text-davinci-003";
    }

    _llmType(): string {
        return this.type;
    }
}

export class GPT_35_TURBO extends ChatOpenAI{
    type: string;
    constructor(fields: IGPT35Turbo){
        super({
            temperature: fields.temperature ?? 0.7,
            topP: fields.topP ?? 1,
            presencePenalty: fields.presencePenalty ?? 0,
            frequencyPenalty: fields.frequencyPenalty ?? 0,
            stop: fields.stop ?? undefined,
            streaming: fields.isStreaming ?? false,
            openAIApiKey: fields.apiKey,
            modelName: fields.model,
        })

        this.type = fields.type ?? "openai.gpt-35-turbo";
    }

    _llmType(): string {
        return this.type;
    }
}