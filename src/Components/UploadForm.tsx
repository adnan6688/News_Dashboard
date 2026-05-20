import { useState } from "react";
import { uploadBannarapi } from "../api/newsapi";
import Toast from "../Toast/Toast";


type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch?: () => void | Promise<any>;
};


const UploadForm = ({ refetch }: Props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [load, setLoad] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoad(true)
    e.preventDefault();


    if (!file) {
      Toast({ type: 'error', message: 'File is required' })
      setLoad(false)
      return;
    }
    try {
      const formData = { title, link, file, };

      const res = await uploadBannarapi(formData);
      if (res?.success) {
        if (refetch) {
          refetch()
        }
        Toast({ type: 'success', message: res?.message })
        setTitle('')
        setLink('')
        setFile(null)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log("Upload Error:", err.message);
    } finally {
      setLoad(false)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* News Link */}
      <input
        type="text"
        placeholder="Enter news link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        className="w-full px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* File Input */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full px-4 py-3 bg-gray-50 rounded-xl cursor-pointer"
      />

      {/* Button */}
      <button
        type="submit"
        disabled={load}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl shadow-md transition"
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        {load ? "Uploading...." : "Upload"}
      </button>
    </form>
  );
};

export default UploadForm;