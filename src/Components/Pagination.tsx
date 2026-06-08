

// Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {


    return (
        <div className="flex justify-end items-center mt-4 gap-3">
            {/* Current Page Info */}
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400 mr-1">
                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </span>

            {/* Previous Button */}
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="flex cursor-pointer items-center justify-center w-10 h-10 bg-linear-to-br from-red-500 to-red-700 text-white rounded-full shadow-md hover:scale-105 hover:shadow-red-200 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Next Button */}
            <button
                onClick={onNext}
                disabled={totalPages === 0 || currentPage === totalPages}
                className="flex cursor-pointer items-center justify-center w-10 h-10 bg-linear-to-br from-red-500 to-red-700 text-white rounded-full shadow-md hover:scale-105 hover:shadow-red-200 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;