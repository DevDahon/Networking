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
        "In peer-to-peer sharing, devices use Workgroup names and Computer Hostnames to identify peers; the host must stay powered on and reachable.",
        "A dedicated file/print server centralizes resource management, access credentials, and continuous availability.",
        "Universal Naming Convention (UNC) paths (e.g. \\\\HOST\\Share) directly locate shared resources; Windows Network Discovery helps browse hosts on private network profiles, and Map Network Drive assigns a persistent drive letter (such as Z:)."
      ]
    },
    {
      "title": "Two permission gates for remote file access",
      "lead": "On Windows NTFS-hosted network shares, share permissions and file-system permissions both apply.",
      "items": [
        "Share permissions: control the access allowed through the published network share.",
        "File-system permissions: NTFS permissions control access to the underlying files and folders."
      ],
      "expectedCount": 2,
      "footnote": "Remote access is limited by both sets. Read/viewer permits reading; change/editor permits modification only when NTFS also allows it. Actual ACLs also include groups, inheritance, and explicit denies."
    },
    {
      "title": "Share safely on trusted networks",
      "lead": "Use least privilege, authenticated accounts, and an approved private network profile.",
      "items": [
        "Create a test folder → Properties → Sharing → Advanced Sharing; share only the intended folder with named authorized users.",
        "Check Security permissions separately. Enable discovery/file sharing only for the approved profile and retain appropriate firewall rules.",
        "Install a supported printer driver and authorize the printer share. A reachable PC does not guarantee spooler, driver, or permission success."
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
