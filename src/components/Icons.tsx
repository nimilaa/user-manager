import React from "react";

interface IconProps {
    className?: string
}
export const EditIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-5 h-5 ${className}`}
    >
        <path d="M16.862 2.487a2.5 2.5 0 0 1 3.535 3.535l-1.08 1.08-3.535-3.535 1.08-1.08zM14.437 4.91l3.535 3.535-9.9 9.9a2 2 0 0 1-1.06.55l-3.54.71a1 1 0 0 1-1.18-1.18l.71-3.54a2 2 0 0 1 .55-1.06l9.9-9.9z" />
    </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-5 h-5 ${className}`}
    >
        <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6H4a1 1 0 1 1 0-2h4V3zM7 6v14h10V6H7zm3 3a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V9zm4 0a1 1 0 0 1 2 0v8a1 1 0 1 1-2 0V9z" />
    </svg>
);

export const BarChartIcon: React.FC<IconProps> = ({className}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 ${className}`}
    >
        <line x1="3" y1="21" x2="3" y2="12" />
        <line x1="9" y1="21" x2="9" y2="8" />
        <line x1="15" y1="21" x2="15" y2="4" />
        <line x1="1" y1="21" x2="21" y2="21" />
    </svg>
)

export const PieChartIcon: React.FC<IconProps> = ({className}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className={`w-5 h-5 ${className}`}
    >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" />
        <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="white" stroke="currentColor" />
        <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="white" stroke="currentColor" />
        <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="white" stroke="currentColor" />
    </svg>
)

export const AddUserIcon: React.FC<IconProps> = ({className}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 ${className}`}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
)