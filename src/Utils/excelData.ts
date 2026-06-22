import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export type TNews = {
    _id: string;
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;

    category: string[];
    categorySlugs: string[];

    author: {
        name: string;
        image: string;
    };

    clicks: number;
    impressions: number;
    ctr: number;

    isBreaking: boolean;

    createdAt: string;
    updatedAt: string;
};

export const downloadNewsExcel = (newsData: TNews[]) => {

    const excelData = newsData?.map((news) => ({
        "News_Title": news.title,
        "Author": news.author?.name || "N/A",
        "Image URL": news.image || "N/A",
        "Category": news.category?.join(", ") || "N/A",
        "Clicks": news.clicks,
        "Impressions": news.impressions,
    }));
    console.log("excel data", excelData)

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "News Report"
    );

    const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });

    const blob = new Blob([excelFile], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, `news-report-${Date.now()}.xlsx`);
};

export default downloadNewsExcel;