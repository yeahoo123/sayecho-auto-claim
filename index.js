import fs from 'fs';
import axios from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDailyWavesData(token, proxy) {
  try {
    const agent = new HttpProxyAgent(proxy);

    const response = await axios.post('https://api.sayecho.xyz/daily-waves', null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      httpAgent: agent,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching data for token ${token.slice(0,5)}...${token.slice(-5)} with proxy ${proxy}:`, error.response? error.response.status: error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    return null;
  }
}

async function processMultipleTokens() {
  try {
    const tokenData = fs.readFileSync('token.txt', 'utf8');
    const tokens = tokenData.split('\n').filter(token => token.trim()!== '');

    const proxyData = fs.readFileSync('proxy.txt', 'utf8');
    const proxies = proxyData.split('\n').filter(proxy => proxy.trim()!== '');

    if (tokens.length!== proxies.length) {
      console.error("Number of tokens and proxies must match.");
      return; 
    }


    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      const proxy = proxies[i].trim();

      console.log(`Processing data for token: ${token.slice(0,5)}...${token.slice(-5)} with proxy: ${proxy}`);

      const data = await getDailyWavesData(token, proxy);

      if (data) {
        console.log('Data received:', data);
      } else {
        console.error(`Failed: ${token.slice(0,5)}...${token.slice(-5)} with proxy: ${proxy}`);
      }

      console.log('Waiting 5 seconds for another claim')
      await delay(5000)
    }
    console.log('Finished processing all tokens.');

  } catch (err) {
    console.error('Error reading token/proxy file or processing data:', err);
  }
}

processMultipleTokens();