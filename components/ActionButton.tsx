import { MouseEvent } from "react";

interface ActionButtonProps {
  children: React.ReactChild;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
export const ActionButton = ({ children, onClick }: ActionButtonProps) => (
  <button
    type="button"
    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    onClick={onClick}
  >
    {children}
  </button>
);
