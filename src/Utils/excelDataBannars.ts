import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { BannerItem } from "../Components/Bannars";





export const downloadBannerExcel = (bannerData:BannerItem[]) => {

  const excelData = bannerData?.map((banner) => ({
    "Title": banner.title,
    "Created At": banner.createdAt
      ? new Date(banner.createdAt).toLocaleString()
      : "N/A",
    "Link": banner.link || "N/A",
    "Clicks": banner.click,
    "Impressions": banner.impressions,
    "Image URL": banner.image || "N/A",
  }));

  console.log("Banner Excel Data:", excelData);

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Banner Analytics"
  );

  const excelFile = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelFile], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `banner-analytics-${Date.now()}.xlsx`);
};