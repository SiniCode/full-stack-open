# Adding a new note: sequence diagram

```mermaid
sequenceDiagram
    participant browser
    participant server
  
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: The input data is sent to the server as the body of the POST request.
    Note right of server: The server creates a new note object,<br> and adds it to an array called notes.
    server-->>browser: redirect to /exampleapp/notes
    deactivate server
  
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
  
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"hola!","date":"2023-04-08T07:33:59.941Z"}, ...]
    deactivate server
```
