import {Routes, Route} from 'fusion-plugin-react-router';

import Home from './pages/home';
import PageNotFound from './pages/pageNotFound';

const Root = (
  <Routes>
    <Route caseSensitive={true} path="/" element={<Home />} />
    <Route element={<PageNotFound />} />
  </Routes>
);

export default Root;
