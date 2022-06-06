const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const getUsersAPI = async (page: number) => {
  const response = await fetch(`${BASE_URL}/users?page=${page}&count=6`);

  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  return response.json();
};

export const getPosId = async () => {
  const response = await fetch(`${BASE_URL}/positions`);

  return response.json();
};

export const getToken = async () => {
  const response = await fetch(`${BASE_URL}/token`);

  return response.json();
};

export const addUser = async (
  data: FormData,
  token: string
): Promise<{ success: boolean; message: string }> => {
  const param = {
    method: "POST",
    body: data,
    headers: {
      Token: token,
    },
  };

  const result = await fetch(`${BASE_URL}/users`, param);

  return result.json();
};
