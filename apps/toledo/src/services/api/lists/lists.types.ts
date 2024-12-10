import type { User } from '../users/users.types';

export interface List {
  id: string;
  name: string;
  icon: string;
  owner: User;
  usesCheckboxes: boolean;
  requiresDeleteConfirmation: boolean;
  usesQuantities: boolean;
  createdAt: Date;
  updatedAt: Date;
  guests?: User[];
  items?: ListItem[];
}

export interface NewList {
  name: string;
}

export interface UpdatedList {
  id: string;
  name?: string;
  icon?: string;
  usesCheckboxes?: boolean;
  requiresDeleteConfirmation?: boolean;
  usesQuantities?: boolean;
}

export interface NewListItem {
  text: string;
  quantity?: number;
  checked?: boolean;
}

export interface ListItem {
  id: string;
  listId: string;
  text: string;
  quantity: number;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListInviteLink {
  link: string;
  code: string;
}
