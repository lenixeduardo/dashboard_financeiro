import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  { id: 1, name: 'Candice Schiner', company: 'Dell', role: 'Frontend Developer', verified: false, status: 'Active' },
  { id: 2, name: 'John Doe', company: 'TechCorp', role: 'Backend Developer', verified: true, status: 'Active' },
  { id: 3, name: 'Alice Johnson', company: 'WebTech', role: 'UI Designer', verified: true, status: 'Active' }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number;
  latitude?: number;
  job: string;
  profile_picture?: string | null;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'dashboard'
  }
];
