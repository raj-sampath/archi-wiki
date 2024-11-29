### Dev API Paths

API Path

```http request
https://56ddadc5-7fec-4f1d-9dc7-09d52f142022.hello.atlassian-dev.net/x1/1hCiGTdUaVq8jroBlsVpK444cs8
```

## Dummy API Request
```json

 {
  "parentId": "65946",
  "spaceId": "163842",
  "title": "This is a sample Page",
  "page": [
  {
    "h1": "JSON To Confluence Wiki Markup"
  },
  {
    "p": "This is a paragraph explaining the conversion process."
  },
  {
    "h2": "Features"
  },
  {
    "ul": [
      "Convert headings",
      "Convert paragraphs",
      "Convert lists",
      "Convert tables",
      "Convert code blocks"
    ]
  },
  {
    "h2": "Example Table"
  },
  {
    "table": {
      "headers": [
        "Feature",
        "Description"
      ],
      "rows": [
        [
          "Headings",
          "Converts h1 to h6 tags into Confluence headings."
        ],
        [
          "Paragraphs",
          "Converts p tags into Confluence paragraphs."
        ],
        [
          "Lists",
          "Converts ul and ol tags into Confluence bullet and numbered lists."
        ],
        [
          "Tables",
          "Converts table structures into Confluence tables."
        ],
        [
          "Code Blocks",
          "Converts code blocks into Confluence code macros."
        ]
      ]
    }
  },
  {
    "h2": "Code Block Example"
  },
  {
    "code": {
      "language": "javascript",
      "code": "console.log('Hello, Confluence!');"
    }
  }
]
}

```