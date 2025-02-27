
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const DropZone = ({ onDrop }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-accent-purple/60 bg-accent-purple/5" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-gray-500 mb-2" />
        <p className="text-sm sm:text-base font-medium">Drag & drop images here, or click to select</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          JPG, PNG or GIF (max 5MB)
        </p>
      </div>
    </div>
  );
};

export default DropZone;
