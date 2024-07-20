import { generateVAPIDKeys } from "web-push";

const keys = generateVAPIDKeys();
console.log(`VAPID_PRVIVATE_KEY=${keys.privateKey}`);
console.log(`VAPID_PUBLIC_KEY=${keys.publicKey}`);
