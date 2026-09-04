export type ChronologyEvent = {
  id: string;
  sequence: number;
  names: { language: string; text: string }[];
  description: string;
  character_ids: string[];
  source_refs: string[];
};
