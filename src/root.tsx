import {Routes, Route} from 'fusion-plugin-react-router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Home from './pages/home';
import PageNotFound from './pages/pageNotFound';

const queryClient = new QueryClient();

const Root = (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route caseSensitive={true} path="/" element={<Home />} />
      <Route element={<PageNotFound />} />
    </Routes>
  </QueryClientProvider>
);

export default Root;
