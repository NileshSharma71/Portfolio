// Timeline data — ordered from most recent to oldest
// type: 'experience' | 'education' | 'certification'

export const TIMELINE = [
  {
    id: 'corextech',
    type: 'experience',
    icon: '💼',
    title: 'Cloud Engineer Intern',
    organization: 'CoreXtech IT Services',
    period: '2024 — Present',
    current: true,
    description:
      'Architected AWS infrastructure from scratch, implemented least-privilege IAM policies, and hardened Bastion hosts for secure remote access. Set up automated monitoring pipelines for production workloads.',
    tags: ['AWS', 'IAM', 'EC2', 'Bastion Host', 'Security'],
  },
  {
    id: 'redhat',
    type: 'certification',
    icon: '🏅',
    title: 'Red Hat System Administration I',
    organization: 'Red Hat  ·  RH124',
    period: '2024',
    current: false,
    description:
      'Foundational Linux system administration — managing users, file systems, processes, SELinux, and network services on RHEL.',
    tags: ['Linux', 'RHEL', 'System Admin', 'SELinux'],
  },
  {
    id: 'devops-aws',
    type: 'certification',
    icon: '🏅',
    title: 'DevOps on AWS',
    organization: 'Amazon Web Services',
    period: '2024',
    current: false,
    description:
      'CI/CD pipelines, infrastructure as code with CloudFormation/Terraform, and automated deployment workflows on the AWS platform.',
    tags: ['AWS', 'CI/CD', 'CloudFormation', 'DevOps'],
  },
  {
    id: 'jklu',
    type: 'education',
    icon: '🎓',
    title: 'B.Tech — Computer Science',
    organization: 'JK Lakshmipat University',
    period: '2023 — Present',
    current: true,
    description:
      'Bachelor of Technology with a focus on cybersecurity, cloud computing, and distributed systems. Active in the campus security and tech communities.',
    tags: ['Cybersecurity', 'Cloud Computing', 'Distributed Systems'],
  },
  {
    id: 'oci',
    type: 'certification',
    icon: '🏅',
    title: 'OCI Foundations Associate',
    organization: 'Oracle Cloud',
    period: '2023',
    current: false,
    description:
      'Core concepts of Oracle Cloud Infrastructure — compute, storage, network security, and IAM fundamentals.',
    tags: ['Oracle Cloud', 'OCI', 'Cloud Foundations'],
  },
  {
    id: 'cisco',
    type: 'certification',
    icon: '🏅',
    title: 'Cisco Networking Basics',
    organization: 'Cisco',
    period: '2023',
    current: false,
    description:
      'Networking fundamentals — OSI/TCP-IP model, subnetting, routing protocols, and basic network device configuration.',
    tags: ['Networking', 'TCP/IP', 'Subnetting', 'Routing'],
  },
];

// Color per type — drives the dot and badge color
export const TYPE_COLORS = {
  experience:    { bg: '#0891B2', label: 'Experience'    },
  education:     { bg: '#8B5CF6', label: 'Education'     },
  certification: { bg: '#059669', label: 'Certification' },
};
