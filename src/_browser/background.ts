import { clear } from '@/Helpers/localStorage';

// Cleanup storage on startup

clear();

// Setup resolve tab message handler

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.command === 'resolve-current-tab') {
        sendResponse(sender);
    }
});
