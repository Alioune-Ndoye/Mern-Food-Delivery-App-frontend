import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Debug logging
console.log('API_BASE_URL:', API_BASE_URL);
console.log('All env vars:', import.meta.env);

export type User = {
    _id: string;
    email: string;
    name: string;
    addressline1: string;
    city: string;
    country: string;
};

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

type UpdateMyUserRequest = {
    name: string;
    addressline1: string;
    city: string;
    country: string;
};

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();


    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
    };

    const { mutateAsync: createUser, isPending, isError, isSuccess } = useMutation({
        mutationFn: createMyUserRequest,
    });

    return {
        createUser,
        isPending,
        isError,
        isSuccess,
    };
};

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get user');
        }
        return response.json();
    };

    const { data: currentUser, isLoading, error } = useQuery({
        queryKey: ['fetchCurrentUser'],
        queryFn: getMyUserRequest,
    });

    return {
        currentUser,
        isLoading,
        error,
    };
};

export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateMyUserRequest): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return response.json();
    };

    const { mutateAsync: updateUser, isPending, isError, isSuccess, error, reset } = useMutation({
        mutationFn: updateMyUserRequest,
    });

    return {
        updateUser,
        isLoading: isPending,
        isError,
        isSuccess,
        error,
        reset,
    };
};