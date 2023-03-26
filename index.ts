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
  },
  {
    "key": "model",
    "title": "Chat completion model",
    "type": "string",
    "default": "gpt-3.5-turbo",
    "description": "",
  },
  {
    "key": "maxAnswer",
    "title": "Max Number of Answer",
    "type": "number",
    "default": "3",
    "description": "",
  },
];

function main() {
  logseq.Editor.registerSlashCommand(
    'query?',
    async () => {
      const { content, uuid } = (await logseq.Editor.getCurrentBlock())!;

      const openai = new OpenAIApi(
        new Configuration({ apiKey: logseq.settings!["apiKey"] })
      );

      const resp = await openai.createChatCompletion({
        model: logseq.settings!["model"],
        messages: [...PRESET, { role: "user", content: content }],
      });

      resp.data.choices
        .map(choice => choice.message!.content)
        .filter((value, index, array) => array.indexOf(value) == index)
        .filter((_, index) => index < logseq.settings!["maxAnswer"])
        .forEach(msg => logseq.Editor.insertBlock(uuid, msg));
    },
  );
}

// bootstrap
logseq
  .useSettingsSchema(setting)
  .ready(main)
  .catch(console.error);
