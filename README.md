# Daily Waves Data Fetcher

This script fetches daily waves data from `api.sayecho.xyz` using multiple tokens and proxies. It reads tokens and proxies from separate files, maintaining a one-to-one mapping.  A delay is included between requests.

## Prerequisites

*   Node.js ([https://nodejs.org/](https://nodejs.org/))
*   npm or yarn

## Installation

1.  Clone/copy the code into `index.js`.
2.  Install dependencies: `npm install axios http-proxy-agent` or `yarn add axios http-proxy-agent`

## Configuration

1.  **`token.txt`:** Create this file. Each line contains one token.

    *   **How to get your token:** Open your browser's developer tools (usually by pressing F12). Go to the "Application". Under "Local Storage," find `https://www.sayecho.xyz`. Copy the value of the `session` or `token` key (the exact key name might vary).  This is your token.

    ```
    token1
    token2
    ...
    ```

2.  **`proxy.txt`:** Create this file. Each line contains one proxy (`http://<user>:<pass>@<host>:<port>` or `http://<host>:<port>`).  Tokens and proxies must correspond line-by-line.

    ```
    [http://user1:pass1@proxy1.example.com:8080](http://user1:pass1@proxy1.example.com:8080)
    [http://proxy2.example.com:80](http://proxy2.example.com:80)
    ...
    ```

    *   **Important:** The number of lines in `token.txt` and `proxy.txt` *must* match.

## Usage

`node index.js`

## Output

The script logs token (partially masked), proxy, API data (if successful), errors, and a "Waiting..." message.

## Error Handling

Handles file reading, API request, and token/proxy mismatch errors.  Includes API response data in error messages.

## Delay

A 5-second delay is implemented between requests.  Adjust `delay(5000)` as needed (milliseconds).

## Important

*   **Token Security:** Keep `token.txt` secure. Do not share it.
*   **Proxy Authentication:** Ensure correct proxy authentication.
*   **Rate Limiting:** Respect API rate limits. Adjust delay if needed.
*   **Troubleshooting:** Use error messages and response data for debugging.
