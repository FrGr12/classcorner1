
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  maxImages?: number;
}

const DropZone = ({ onDrop, maxImages }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: maxImages
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
        ${isDragActive ? "border-accent-purple bg-accent-purple/10" : "border-gray-200 hover:border-gray-300"}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive ? "Drop files here" : "Drag & drop files here, or click to select"}
        </p>
        <p className="text-xs text-muted-foreground">
          Supported formats: JPG, PNG, GIF, WEBP
        </p>
      </div>
    </div>
  );
};

export default DropZone;
