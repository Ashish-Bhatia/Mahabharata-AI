# Canonical Domain Model

## Core Entities

### Character
- `id`: stable canonical identifier
- `names[]`: language-tagged name variants
- `description`: language-tagged summary
- `source_refs[]`: provenance references

### Relationship
- `id`: stable identifier
- `subject_id`: character ID
- `predicate`: controlled relationship type
- `object_id`: character ID
- `source_refs[]`: provenance references

### Event
- `id`: stable identifier
- `names[]`: language-tagged names
- `description`: language-tagged summary
- `sequence`: optional ordering value
- `participants[]`: character IDs
- `place_ids[]`: related place IDs
- `source_refs[]`: provenance references

### Source
- `id`: stable source identifier
- `title`: source title
- `edition`: edition or publication metadata
- `language`: ISO language code
- `authority`: provenance/authority classification
- `uri`: source locator when available

### Passage
- `id`: stable passage identifier
- `source_id`: source ID
- `locator`: section/chapter/verse locator
- `text`: source text
- `language`: ISO language code
- `transliteration`: optional transliterated text

### Place
- `id`: stable place identifier
- `names[]`: language-tagged name variants
- `description`: language-tagged summary
- `coordinates`: optional geographic representation
- `source_refs[]`: provenance references

## Multilingual Representation

All user-facing names and descriptions use an explicit language tag. Transliteration is stored separately from the original script. Initial supported language codes are `sa`, `hi`, and `en`.

## Provenance Rules

- Every canonical factual assertion must be traceable to one or more source references.
- Derived relationships retain the source references supporting the derivation.
- Imported content records its ingestion source and validation status.
- Source text is stored separately from generated summaries.

## Controlled Relationship Types

Initial examples include `parent_of`, `child_of`, `spouse_of`, `sibling_of`, `teacher_of`, `student_of`, `ally_of`, `enemy_of`, and `participant_in`.

The relationship vocabulary is extensible and versioned through schema changes.
