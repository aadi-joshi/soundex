import { NFTStorage } from 'nft.storage';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA0MzE1NDY0NDI5MTEwMzIwMjg0OTBiNzY2ZmI0ZGE0YmZhYWY5NjRjYjQ0MjRiMDg3N2I4MmJmYjMzZDAzIiwiaXNzIjoibmZ0LXN0b3JhZ2UiLCJpYXQiOjE2OTA4MTI2ODg4MDUsIm5hbWUiOiJORlQgUG9ydGFsIn0.266fb4da4bfaaf964cb4424b0877b82bfb33d03';

const nftStorage = new NFTStorage({ 
    token: API_TOKEN,
    endpoint: new URL('https://api.nft.storage'),
    headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/car'
    }
});

export default nftStorage;
