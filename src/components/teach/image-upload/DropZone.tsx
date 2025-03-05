import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onDrop: (files: File[]) => void;
  className?: string;
}

const DropZone = ({ onDrop, className }: DropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
        isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary",
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        {isDragActive ? "Drop files here" : "Drag & drop files here, or click to select"}
      </p>
    </div>
  );
};

export default DropZone;