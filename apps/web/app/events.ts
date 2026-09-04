export type EventName = { language: string; text: string };

export type MahabharataEvent = {
  id: string;
  sequence: number;
  names: EventName[];
  description: string;
  character_ids: string[];
  source_refs: string[];
};
