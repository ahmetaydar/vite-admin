import AuthProvider from './components/AuthProvider';
import Routes from './components/Routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
        </QueryClientProvider>
    );
}

export default App;
