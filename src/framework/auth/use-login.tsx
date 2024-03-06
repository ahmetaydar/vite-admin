import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import http from '../utils/http';
import { API_ENDPOINTS } from '../utils/endpoints';
import { useAuth } from '../../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

export interface LoginInputType {
    email: string;
    password: string;
}

async function login(input: LoginInputType) {
    return http.post(API_ENDPOINTS.LOGIN, input);
}

export const useLoginMutation = () => {
    const navigate = useNavigate();
    const { setToken }: any = useAuth();
    return useMutation((input: LoginInputType) => login(input), {
        onSuccess: ({ data }) => {
            Cookies.set('auth_token', data.access_token);
            Cookies.set('refresh_token', data.refresh_token);
            setToken(Cookies.get('auth_token'));

            navigate('/');
        },
        onError: (data) => {
            console.log(data, 'login error response');
        },
    });
};
