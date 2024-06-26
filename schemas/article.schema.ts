export const article = { //check 條件
  "$schema": "http://json-schema.org/draft-07/schema#",
  "id": "/article",
  "title": "Article",
  "description": "An article in the blog",
  "type": "object",
  "properties": {
    "title":{
      "description": "The title of the blog article",
      "type": "string"
    },
    "allText":{
      "description": "Body Text",
      "type": "string"
    },
    "summary":{
      "description": "Body Text",
      "type": "string"
    },
    "imageURL":{
      "description": "URL for main image to show in article",
      "type": "url"
    },
    "published":{
      "description": "Is the article published or not",
      "type": "boolean"
    },
    "authorID":{
      "description": "User ID of the article author",
      "type": "integer", "minimum": 0
    }
  },
  "required": ["title", "allText", "authorID"]//rules
}
//npm i jsonschema @types/jsonschema