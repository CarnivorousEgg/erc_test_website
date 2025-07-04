import React from 'react';
import DecryptedText from './DecryptedText';

export default function HomeTitle() {
  return (
    <h1 className="hero-title">
      <DecryptedText text="Electronics & Robotics Club" animateOn="view" revealDirection="center" />
    </h1>
  );
} 