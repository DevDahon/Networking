import {topic} from './createTopic.js';
export default topic({
  "id": "13-file-printer-sharing",
  "title": "Network File and Printer Sharing",
  "icon": "FolderOpen",
  "description": "Publish a modeled resource and see how share permissions and file-system permissions combine.",
  "objectives": [
    "Explain peer-hosted versus server-hosted shared resources.",
    "Predict read/write access from both permission sets.",
    "Share and verify a test folder safely on approved Windows computers."
  ],
  "concepts": [
    {
      "title": "A host provides a shared resource",
      "lead": "A shared folder or printer is available over a network from a device providing that service.",
      "paragraphs": [
        "In a small workgroup, any PC can act as a peer host sharing a folder or USB printer as long as it stays powered on, whereas a dedicated file server centralizes user accounts and stays available around the clock.",
        "Users connect across the LAN using a UNC path (such as \\\\HOST\\Share) or map a persistent network drive letter like Z:."
      ]
    },
    {
      "title": "Two permission gates for remote file access",
      "lead": "On Windows NTFS-hosted network shares, share permissions and file-system permissions both apply.",
      "items": [
        "Share permissions: The outer doorway over the network—controls whether a remote PC can even enter the shared folder (Read, Change, or Full Control).",
        "File-system permissions: Detailed NTFS Security rules saved on the actual disk folders. Whenever both apply remotely, the stricter rule always wins."
      ],
      "expectedCount": 2
    },
    {
      "title": "Share safely on trusted networks",
      "lead": "Use least privilege, authenticated accounts, and an approved private network profile.",
      "paragraphs": [
        "Enable Network Discovery only on trusted private networks and use Advanced Sharing to grant specific authenticated accounts only the access they need—never open Everyone to Full Control on sensitive folders.",
        "For shared printers, ensure the host stays reachable, installs compatible drivers for clients, and grants print permission to authorized users."
      ]
    }
  ],
  "demo": {
    "type": "sharing",
    "title": "Resource access and permissions",
    "lead": "Modeled permissions • select host and client, publish a folder, choose both permission levels, and attempt access."
  },
  "walkthrough": false,
  "installation": {
    "equipment": "Two Windows PCs, working LAN, authorized test accounts, non-sensitive test file.",
    "mistakes": "Changing share permissions while ignoring NTFS; testing with an unintended cached identity.",
    "safety": "Use test data. Keep firewalls enabled and never grant blanket access to sensitive folders."
  }
});
