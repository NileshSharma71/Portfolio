// Timeline data — updated from resume
// For each entry, fill in the `link` field with the verification/profile URL.
// The organization name becomes a clickable link in the UI when `link` is set.

export const TIMELINE = [

  // ── Professional Experience ─────────────────────────────────────────────
  {
    id: 'corextech',
    type: 'experience',
    icon: '💼',
    title: 'Cloud Engineer Intern',
    organization: 'CoreXtech IT Services Pvt. Ltd',
    period: 'May 2025 — Jul 2025',
    current: false,
    // TODO: Replace with your LinkedIn experience link or CoreXtech company page
    link: 'https://corextech.in/',
    bullets: [
      'Architected and deployed core AWS infrastructure (IAM roles, EC2 instances, S3 buckets)',
      'Implemented least-privilege security by authoring and applying custom IAM policies',
      'Configured a hardened Bastion Host SSH architecture to lock down EC2 access',
      'Automated environment provisioning and deployment workflows using Git and Bash scripts',
      'Performed security validation tests to verify direct SSH access was blocked after hardening',
    ],
    tags: ['AWS', 'IAM', 'EC2', 'S3', 'Bastion Host', 'Bash'],
  },

  // ── Education ───────────────────────────────────────────────────────────
  {
    id: 'jklu',
    type: 'education',
    icon: '🎓',
    title: 'B.Tech — Computer Science',
    organization: 'JK Lakshmipat University, Jaipur',
    period: '2023 — Present',
    current: true,
    // TODO: Replace with your JKLU student profile or university link
    link: 'https://jklu.edu.in',
    bullets: [],
    description: 'Bachelor of Technology with a focus on cybersecurity, cloud computing, and distributed systems. Active in the campus security and tech communities.',
    tags: ['Cybersecurity', 'Cloud Computing', 'Distributed Systems'],
  },

  // ── Certifications (ordered by date — newest first) ─────────────────────
  {
    id: 'oci',
    type: 'certification',
    icon: '🏅',
    title: 'Oracle Cloud Infrastructure Foundations Associate',
    organization: 'Oracle',
    period: 'October 2025',
    current: false,
    // TODO: Add your Credly / Oracle certification verify link here
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=57654FC5587360C6F5EDF51FE7E89A4AB616A6ADE1ADD1D6E917E524E13AA025',
    bullets: [],
    description: 'Core concepts of Oracle Cloud Infrastructure — compute, storage, network security, and IAM fundamentals.',
    tags: ['Oracle Cloud', 'OCI', 'Cloud Foundations'],
  },
  {
    id: 'redhat',
    type: 'certification',
    icon: '🏅',
    title: 'Red Hat System Administration I (RH124)',
    organization: 'Red Hat',
    period: 'March 2025',
    current: false,
    // TODO: Add Red Hat certification verify link here
    link: 'https://rha.ole.redhat.com/rha/api/certificates/attendance/uuid/8876aa45-c45c-4158-ac94-ce7b32665c4b',
    bullets: [],
    description: 'Foundational Linux system administration — managing users, file systems, processes, SELinux, and network services on RHEL.',
    tags: ['Linux', 'RHEL', 'System Admin', 'SELinux'],
  },
  {
    id: 'intro-cyber',
    type: 'certification',
    icon: '🏅',
    title: 'Introduction to Cybersecurity',
    organization: 'Cisco',
    period: 'January 2025',
    current: false,
    // TODO: Add Cisco NetAcad verify link here
    link: 'https://www.credly.com/badges/44245cac-3182-4f31-988a-f5bc55ccf1d5/public_url',
    bullets: [],
    description: 'Key cybersecurity concepts — threat landscapes, attack vectors, attack types, and basic security defense strategies.',
    tags: ['Cybersecurity', 'Cisco', 'Threat Analysis'],
  },
  {
    id: 'networking',
    type: 'certification',
    icon: '🏅',
    title: 'Networking Basics',
    organization: 'Cisco',
    period: 'December 2024',
    current: false,
    // TODO: Add Cisco NetAcad verify link here
    link: 'https://www.credly.com/badges/70451196-b292-4b68-9952-3cd33105e103/public_url',
    bullets: [],
    description: 'Networking fundamentals — OSI/TCP-IP model, subnetting, routing protocols, and basic network device configuration.',
    tags: ['Networking', 'TCP/IP', 'Subnetting', 'Routing'],
  },
  {
    id: 'devops-aws',
    type: 'certification',
    icon: '🏅',
    title: 'DevOps on AWS Specialization',
    organization: 'Amazon Web Services',
    period: 'July 2024',
    current: false,
    // TODO: Add AWS / Coursera cert verify link here
    link: 'https://www.coursera.org/account/accomplishments/specialization/2BJMJ84WN5H2',
    bullets: [],
    description: 'CI/CD pipelines, infrastructure as code, and automated deployment workflows on the AWS platform.',
    tags: ['AWS', 'CI/CD', 'CloudFormation', 'DevOps'],
  },
  {
    id: 'aws-migrate',
    type: 'certification',
    icon: '🏅',
    title: 'Migrating to the AWS Cloud',
    organization: 'Amazon Web Services',
    period: 'June 2024',
    current: false,
    // TODO: Add AWS / Coursera cert verify link here
    link: 'https://www.coursera.org/account/accomplishments/verify/UT2QNX7FZEMH',
    bullets: [],
    description: 'AWS cloud migration strategies, the AWS Migration Hub, and best practices for migrating workloads to the cloud.',
    tags: ['AWS', 'Cloud Migration', 'Architecture'],
  },
  {
    id: 'kali',
    type: 'certification',
    icon: '🏅',
    title: 'Kali Linux',
    organization: 'Kali OS',
    period: 'May 2024',
    current: false,
    // TODO: Add Kali / OffSec cert verify link here
    link: 'https://www.coursera.org/account/accomplishments/verify/NR6F4ADNLLF7',
    bullets: [],
    description: 'Kali Linux setup, built-in penetration testing tools, and ethical hacking workflow using the Kali ecosystem.',
    tags: ['Kali Linux', 'Pen Testing', 'Ethical Hacking'],
  },
];

// Color scheme per type
export const TYPE_COLORS = {
  experience: { bg: '#0891B2', label: 'Experience' },
  education: { bg: '#8B5CF6', label: 'Education' },
  certification: { bg: '#059669', label: 'Certification' },
};
