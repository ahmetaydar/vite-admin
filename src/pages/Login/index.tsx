import { useForm } from 'react-hook-form';
import {
    LoginInputType,
    useLoginMutation,
} from '../../framework/auth/use-login';

const Login = () => {
    const { mutate: login } = useLoginMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isValid },
    } = useForm<LoginInputType>();

    function onSubmit({ email, password }: LoginInputType) {
        login({
            email,
            password,
        });
        reset();
    }

    return (
        <main className='flex justify-between items-center h-screen'>
            <div className='h-full w-full'>
                <div className='h-full bg-blue-400 flex justify-center items-center'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('email')}
                            type='text'
                            placeholder='Username'
                            className='border rounded px-2 py-1 w-full mb-2'
                        />
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='Password'
                            className='border rounded px-2 py-1 w-full mb-2'
                        />
                        <button
                            type='submit'
                            className='bg-green-500 text-white px-4 py-2 rounded w-full'
                            disabled={!isDirty || !isValid}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className='h-full w-full '>
                {/* Second Section */}
                <div className='h-full bg-green-400'>
                    {/* Your Content */}
                    <h1>GCODE</h1>
                </div>
            </div>
        </main>
    );
};

export default Login;
