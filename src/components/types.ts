export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
};

export type Position = {
  id: number;
  name: string;
};

export type AllUsers = {
  total_users: number;
};
