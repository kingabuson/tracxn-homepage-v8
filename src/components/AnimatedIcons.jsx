import React from 'react';
import { motion } from 'framer-motion';

// Rocket Animation
export const RocketIcon = ({ size = 60, color = '#ea4335' }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        whileHover={{ scale: 1.1 }}
    >
        <motion.path
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.48-.56.93-1.23 1.35-2h.15c2.6 0 5-2.4 5-5 0-2.6-2.4-5-5-5-2.6 0-5 2.4-5 5 0 2.6 2.4 5 5 5h.15c-.77.42-1.44.87-2 1.35z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
            d="M12 15l-3-3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
    </motion.svg>
);

// Chart Animation
export const ChartIcon = ({ size = 60, color = '#34a853' }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <motion.path
            d="M18 20V10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "circOut" }}
            style={{ originY: 1 }}
        />
        <motion.path
            d="M12 20V4"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatType: "reverse", ease: "circOut" }}
            style={{ originY: 1 }}
        />
        <motion.path
            d="M6 20v-6"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, repeatType: "reverse", ease: "circOut" }}
            style={{ originY: 1 }}
        />
    </motion.svg>
);

// Search Animation
export const SearchIcon = ({ size = 60, color = '#1a73e8' }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <motion.circle
            cx="11"
            cy="11"
            r="8"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1, rotate: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
        />
        <motion.path
            d="M21 21l-4.35-4.35"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 2 }}
        />
    </motion.svg>
);

// Bulb Animation
export const BulbIcon = ({ size = 60, color = '#fbbc04' }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <motion.path
            d="M9 18h6"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
            d="M10 22h4"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
        />
        <motion.path
            d="M12 2v1"
            initial={{ y: -2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
            d="M12 7a5 5 0 1 0-4 4.5 5 5 0 0 0 8 0A5 5 0 1 0 12 7z"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
    </motion.svg>
);

// Shield Animation (regulatory / compliance)
export const ShieldIcon = ({ size = 60, color = '#0b3d91' }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        whileHover={{ scale: 1.1 }}
    >
        <motion.path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
            d="M9 12l2 2 4-4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
        />
    </motion.svg>
);
