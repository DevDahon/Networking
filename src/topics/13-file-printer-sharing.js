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
      "items": [
        "Peer-to-peer sharing: Uses Workgroups and Hostnames; the sharing PC must stay turned on.",
        "Dedicated server: Centralizes shared files, user accounts, and 24/7 availability.",
        "UNC paths & mapped drives: Reach shares directly via \\\\HOST\\Share or map a drive letter like Z:."
      ]
    },
    {
      "title": "Two permission gates for remote file access",
      "lead": "On Windows NTFS-hosted network shares, share permissions and file-system permissions both apply.",
      "items": [
        "Share permissions: Controls who can enter the folder over the network.",
        "File-system permissions: NTFS rules that control local and remote file access."
      ],
      "expectedCount": 2,
      "footnote": "When Share and NTFS permissions differ, the most restrictive rule always wins."
    },
    {
      "title": "Share safely on trusted networks",
      "lead": "Use least privilege, authenticated accounts, and an approved private network profile.",
      "items": [
        "Advanced Sharing: Share only the needed folder with specific user accounts.",
        "Private Network Profile: Turn on Network Discovery only on trusted private networks.",
        "Shared printers: Require a reachable host, a matching printer driver, and print permission."
      ]
    }
  ],
  "demo": {
    "type": "sharing",
    "title": "Resource access and permissions",
    "lead": "Modeled permissions • select host and client, publish a folder, choose both permission levels, and attempt access."
  },
  "application": {
    "title": "Read-only reference files and controlled editing",
    "lead": "An organization distributes read-only reference files and grants editing only to named contributors.",
    "items": [
      "Avoid making one broad writable share for sensitive documents.",
      "Use named accounts and verify permissions from a remote client.",
      "A shared printer also needs a reachable host, driver, and permission to print."
    ]
  },
  "installation": {
    "equipment": "Two Windows PCs, working LAN, authorized test accounts, non-sensitive test file.",
    "mistakes": "Changing share permissions while ignoring NTFS; testing with an unintended cached identity.",
    "safety": "Use test data. Keep firewalls enabled and never grant blanket access to sensitive folders."
  }
});
