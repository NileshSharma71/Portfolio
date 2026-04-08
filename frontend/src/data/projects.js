// Projects data — update github links once repos are public

export const PROJECTS = [
  {
    id: 'honeypot',
    icon: '🍯',
    category: 'Cybersecurity',
    title: 'Custom Honeypot System',
    description:
      'A network honeypot that simulates vulnerable services to attract, detect, and log unauthorized intrusion attempts. Captures attacker behavior, IPs, and payloads — generating structured reports for security analysis.',
    highlight: 'Logged & analyzed 200+ simulated intrusion attempts',
    tech: ['Python', 'Socket Programming', 'Linux', 'Logging', 'Network Security'],
    github: 'https://github.com/NileshSharma71/cust-honey',
    live: null,
  },
  {
    id: 'server-monitor',
    icon: '🌐',
    category: 'Cloud & DevOps',
    title: 'Real-Time Global Server Monitor',
    description:
      'A Lambda-architecture pipeline for monitoring global server telemetry in real-time. Uses PySpark for historical batch processing and Spark Streaming for live ingestion — giving health visibility across distributed regions.',
    highlight: 'Processes live server telemetry with sub-second latency',
    tech: ['Python', 'PySpark', 'Spark Streaming', 'AWS', 'Lambda Architecture'],
    github: 'https://github.com/NileshSharma71/Real-time-Server-Network-Monitoring-System',
    live: null,
  },
  {
    id: 'ssh-setup',
    icon: '🔑',
    category: 'DevOps',
    title: 'Passwordless Root SSH Setup',
    description:
      'An automated Bash script that configures secure, passwordless root SSH access for AWS EC2 instances. Implements RSA key-based auth, disables password login, and enforces SSH hardening best practices in one run.',
    highlight: 'Reduces EC2 setup time from 15 min → 30 seconds',
    tech: ['Bash', 'AWS EC2', 'SSH', 'Linux Hardening', 'Automation'],
    github: 'https://github.com/NileshSharma71/passwordless-ssh-login-setup',
    live: null,
  },
];
