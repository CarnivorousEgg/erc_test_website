import React from 'react';
import { createRoot } from 'react-dom/client';
import HomeTitle from './HomeTitle';

const el = document.querySelector('.hero-title');
if (el) {
  // Remove the static text so React can mount
  el.textContent = '';
  createRoot(el).render(<HomeTitle />);
} 