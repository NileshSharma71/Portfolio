// Skills data — organized by category
// Update items array to add or remove skills

export const SKILLS = [
  {
    id: 'cybersecurity',
    icon: '🔐',
    category: 'Cybersecurity',
    description: 'Offensive & defensive security tools',
    accentColor: '#EF4444',
    items: [
      'Wireshark', 'Nmap', 'Metasploit', 'Burp Suite',
      'OWASP Top 10', 'Honeypot Design', 'Intrusion Detection',
    ],
  },
  {
    id: 'cloud',
    icon: '☁️',
    category: 'Cloud & DevOps',
    description: 'Cloud infrastructure & CI/CD pipelines',
    accentColor: '#0891B2',
    items: [
      'AWS EC2', 'AWS IAM', 'AWS S3', 'AWS Lambda',
      'Oracle Cloud', 'Docker', 'Jenkins', 'Terraform',
    ],
  },
  {
    id: 'linux',
    icon: '🐧',
    category: 'Linux & Networking',
    description: 'System hardening & network security',
    accentColor: '#8B5CF6',
    items: [
      'System Administration', 'OS Hardening', 'Log Analysis',
      'TCP/IP', 'Firewalls', 'VPNs', 'Bastion Host Security',
    ],
  },
  {
    id: 'programming',
    icon: '💻',
    category: 'Programming',
    description: 'Scripting, automation & data processing',
    accentColor: '#059669',
    items: [
      'Python', 'C', 'Bash Scripting', 'PySpark', 'Spark Streaming', 'Terraform HCL',
    ],
  },
];
