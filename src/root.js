// @flow
import React from 'react';
import { Routes, Route } from 'fusion-plugin-react-router';

import Home from './pages/home.js';
import PageNotFound from './pages/pageNotFound.js';

const Root = (
  <Routes>
    <Route caseSensitive={true} path="/" element={<Home />} />
    <Route element={<PageNotFound />} />
  </Routes>
);

export default Root;
