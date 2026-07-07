/**
 * Content type identifiers matching Sanity schema _type fields.
 * Used for routing, component selection, and Algolia index filtering.
 */

export const CONTENT_TYPES = /** @type {const} */ ({
  ARTICLE: 'article',
  BRIEF: 'brief',
  DATA_STORY: 'dataStory',
  PODCAST: 'podcast',
  NEWSLETTER: 'newsletter',
  RESEARCH: 'research',
  OPINION: 'opinion',
})

export const CONTENT_TYPE_LABELS = {
  [CONTENT_TYPES.ARTICLE]: 'Article',
  [CONTENT_TYPES.BRIEF]: 'Brief',
  [CONTENT_TYPES.DATA_STORY]: 'Data Story',
  [CONTENT_TYPES.PODCAST]: 'Podcast',
  [CONTENT_TYPES.NEWSLETTER]: 'Newsletter',
  [CONTENT_TYPES.RESEARCH]: 'Research',
  [CONTENT_TYPES.OPINION]: 'Opinion',
}

/** Content types shown on the public homepage feed */
export const FEED_CONTENT_TYPES = [
  CONTENT_TYPES.ARTICLE,
  CONTENT_TYPES.BRIEF,
  CONTENT_TYPES.DATA_STORY,
  CONTENT_TYPES.OPINION,
]
