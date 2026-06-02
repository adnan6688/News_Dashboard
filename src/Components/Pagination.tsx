

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
        <div className="flex justify-end mt-4 gap-2">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-slate-700 to-slate-900 text-white rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={onNext}
                disabled={totalPages==0 ||currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-slate-700 to-slate-900 text-white rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;