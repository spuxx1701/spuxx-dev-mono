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
}

export interface NewList {
  name: string;
}
