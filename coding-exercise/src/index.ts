import { suggestCodes } from "./coding-assistant";

const sampleNote = `
Patient is an established patient. 45-minute visit.
Psychiatrist reviewed medications, adjusted Lexapro dosage.
No therapy was performed. Case complexity: moderate.
`;

console.log("Clinical Coding Assistant\n");
console.log("Sample note:", sampleNote.trim());
console.log("Suggested codes:", suggestCodes(sampleNote));
