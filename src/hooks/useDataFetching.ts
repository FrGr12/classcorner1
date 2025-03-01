
import { useState, useCallback } from "react";
import { toast } from "sonner";

export type FetchStatus = "idle" | "loading" | "success" | "error";

interface UseDataFetchingProps<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useDataFetching<T>({
  initialData,
  onSuccess,
  onError,
}: UseDataFetchingProps<T> = {}) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (
      fetchFunction: () => Promise<T>,
      options?: {
        showSuccessToast?: boolean;
        successMessage?: string;
        showErrorToast?: boolean;
        errorPrefix?: string;
      }
    ) => {
      const {
        showSuccessToast = false,
        successMessage = "Successfully loaded data",
        showErrorToast = true,
        errorPrefix = "Failed to load data",
      } = options || {};

      try {
        setStatus("loading");
        setError(null);

        const result = await fetchFunction();
        
        setData(result);
        setStatus("success");
        
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        
        onSuccess?.(result);
        return result;
      } catch (err) {
        const errorObject = err instanceof Error ? err : new Error(String(err));
        setError(errorObject);
        setStatus("error");
        
        if (showErrorToast) {
          toast.error(`${errorPrefix}: ${errorObject.message}`);
        }
        
        onError?.(errorObject);
        throw errorObject;
      }
    },
    [onSuccess, onError]
  );

  return {
    data,
    setData,
    status,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    error,
    fetchData,
  };
}
