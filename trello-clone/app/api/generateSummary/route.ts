import { NextResponse } from "next/server";
import openai from "openai";

export async function POST(requests: Request) {
    const {todos} = await requests.json();
    console.log(todos);

    //communicate with openAi GPT
    // const response = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     temperature: 0.8,
    //     n:1,
    //     stream: false
    //     messages:[]

    // })
}