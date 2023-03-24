import { ChatCompletionRequestMessage } from "openai";

const PRESET: ChatCompletionRequestMessage[] = [
  { role: "user", content: `Logseq uses Datalog as the query engine. Learn Datalog from https://www.learndatalogtoday.org/. Output query code only.` },

  // https://docs.logseq.com/#/page/queries
  { role: "user", content: "Find the blocks containing page \"tag1\"" },
  { role: "assistant", content: "{{query [[tag1]]}}" },
  { role: "user", content: "Find the blocks containing both tag1 and tag2" },
  { role: "assistant", content: "{{query (and [[tag1]] [[tag2]])}}" },
  { role: "user", content: "Find the blocks containing either tag1 or tag2" },
  { role: "assistant", content: "{{query (or [[tag1]] [[tag2]])}}" },
  { role: "user", content: "Find the blocks containing tag2 but not tag1" },
  { role: "assistant", content: "{{query (and [[tag2]] (not [[tag1]]))}}" },
  { role: "user", content: "Find journal blocks created between [[Dec 5th, 2020]] to [[Dec 7th, 2020]]" },
  { role: "assistant", content: "{{query (between [[Dec 5th, 2020]] [[Dec 7th, 2020]])}}" },
];

export { PRESET };