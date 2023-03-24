import "@logseq/libs";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";
import { Configuration, OpenAIApi } from "openai";
import { PRESET } from "./preset";

const setting: SettingSchemaDesc[] = [
  {
    "key": "apiKey",
    "title": "Openai API Key",
    "type": "string",
    "default": "",
    "description": "",
  }, {
    "key": "model",
    "title": "Chat completion model",
    "type": "string",
    "default": "gpt-3.5-turbo",
    "description": "",
  },
];

function main() {
  logseq.Editor.registerSlashCommand(
    'gpt-query',
    async () => {
      const { content, uuid } = (await logseq.Editor.getCurrentBlock())!;

      const openai = new OpenAIApi(
        new Configuration({ apiKey: logseq.settings!["apiKey"] })
      );

      const resp = await openai.createChatCompletion({
        model: logseq.settings!["model"],
        messages: [...PRESET, { role: "user", content: content }],
      });

      resp.data.choices.forEach((choice) => {
        logseq.Editor.insertBlock(uuid, choice.message!.content)
      })
    },
  )
}

// bootstrap
logseq
  .useSettingsSchema(setting)
  .ready(main)
  .catch(console.error);
