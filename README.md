# ArchiWiki - Confluence Archival & Wiki Markup Generator 🤔

ArchiWiki is an open-source Forge application designed to simplify documentation management for teams using Atlassian Confluence. This tool provides a JSON abstraction layer over the Confluence Wiki Format, making it easy to create and version control Confluence pages programmatically.

---

## ✨ Features

1. **📝 JSON-based API for Confluence Pages**  
   A straightforward REST API to create and update Confluence pages using JSON, abstracting the complexity of the Confluence Wiki Format.

2. **🔄 Automated Version Control**  
   ArchiWiki ensures that each unique page (identified by `SpaceId`, `ParentId`, and `Title`) is versioned:
    - ✍️ If the content changes, the current page is archived as a sub-page.
    - 🆕 The new content replaces the existing content seamlessly.

---

## 🤔 Why ArchiWiki?

This project was born out of common developer frustrations:
1. **😴 Developers are lazy**: Writing documentation is often an afterthought.
2. **💻 Developers prioritize coding over documentation**: Automating documentation allows developers to stay focused on development.
3. **⏳ Documentation staleness**: ArchiWiki ensures Confluence remains an up-to-date, centralized knowledge repository.

---

## 🚀 Motivation

Maintaining up-to-date documentation is essential, especially for:
- **⚡ Rapidly evolving systems**.
- **📊 Critical data structures** like MDM classes.

ArchiWiki lets developers focus on coding while automating documentation updates. By embedding comments and metadata in the code, ArchiWiki ensures that Confluence reflects the latest system state.


### What was my motivation 🤔?
Our Developers managing **Master Data Management (MDM)** systems often face evolving structures. ArchiWiki will ensure documentation stays synchronized with the latest class definitions and object metadata, eliminating manual effort.

Once the initial setup is complete, ArchiWiki will automatically update Confluence pages whenever the MDM class definitions are updated / created.


---

## 📚 Use Cases

1. **🛠️ Dynamic Documentation Updates**  
   For objects, structures, or processes with frequent changes, ArchiWiki programmatically detects changes and updates documentation accordingly.
    - ✅ No change detected? Ignore the update.
    - 🔄 New content? Archive the current version and update the page.

2. **📜 Versioned Documentation**  
   Each change creates a sub-page with the previous version, ensuring a clear history of updates.

---

## 🛠️ Getting Started

### 🧩 Deployment
ArchiWiki is a **Forge application** that can be deployed on your Atlassian Cloud environment.

## ⚙️ Setup & Installation

Follow these steps to set up ArchiWiki and integrate it with your Atlassian Cloud environment:

### 🛠️ Installation Process with Forge

1. **Install the Forge CLI**  

   If you haven’t already, install the Forge CLI on your machine:
   ```bash
   npm install -g @forge/cli
    ```
   For detailed instructions, refer to the Forge CLI documentation.


2. **Clone the Repository**

    Clone the ArchiWiki repository to your local machine:
    ```bash
    git clone git@github.com:raj-sampath/archi-wiki.git
    cd archi-wiki
   ```
   
3. **Deploy the Forge App**

   Deploy the Forge application to your Atlassian Cloud environment:
    
    ```bash
    npm install
    forge deploy
    ```

4. **Install the App in Confluence**

    Run the following command to install the app:

    ```bash
    forge install
    ```

   Select the Confluence environment where you want the app installed.


5. **Retrieve the API URLs**

   ArchiWiki uses Forge Web Triggers to expose API endpoints. After deploying the app, retrieve the Web Trigger URLs:

    ```bash
    forge webtrigger
    ```
   
6. **Event Trigger for Source Changes**

    To automate updates, set up an event trigger in your system to monitor changes in the source objects or documents:
    
    - **Configure Change Detection**: Add a webhook or event listener in your system to detect changes to the source content.
    
    - **Trigger the ArchiWiki API**: When a change is detected:
    
    - **Transform the source content to the ArchiWiki JSON format**: Make an API call to the ArchiWiki Web Trigger endpoint with the transformed JSON payload.


### 📦 API Example
Here’s a sample JSON payload to create a Confluence page:



```json
{
  "parentId": "111111",
  "spaceId": "222222",
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
      "h2": "Some More Features"
    },
    {
      "ol": [
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