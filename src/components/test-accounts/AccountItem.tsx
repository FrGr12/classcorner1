
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Check } from "lucide-react";
import { TestAccount } from "@/hooks/useTestAccounts";

interface AccountItemProps {
  account: TestAccount;
  onTestLogin: (email: string, password: string) => Promise<void>;
  onCopy: (text: string) => void;
  processingTestLogin: boolean;
}

const AccountItem = ({ account, onTestLogin, onCopy, processingTestLogin }: AccountItemProps) => {
  const isError = account.status === 'error';
  const isWarning = account.status === 'warning';
  const isSuccess = account.status === 'created';
  
  const getStatusBadge = () => {
    if (isError) return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Error</span>;
    if (isWarning) return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Warning</span>;
    if (isSuccess) return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Created</span>;
    return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">{account.status}</span>;
  };
  
  return (
    <div className={`p-4 border rounded-md ${
      isError ? 'bg-red-50 border-red-100' : 
      isWarning ? 'bg-yellow-50 border-yellow-100' : 
      isSuccess ? 'bg-green-50 border-green-100' : 
      'bg-slate-50'
    }`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p><strong>Email:</strong> {account.email}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onCopy(account.email)}
              className="h-6 px-2"
            >
              Copy
            </Button>
          </div>
          
          {account.password && (
            <div className="flex items-center gap-2 mb-1">
              <p><strong>Password:</strong> {account.password}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onCopy(account.password)}
                className="h-6 px-2"
              >
                Copy
              </Button>
            </div>
          )}
          
          <p className="flex items-center gap-1 mb-1">
            <strong>Status:</strong> 
            {getStatusBadge()}
          </p>
          
          {account.userId && <p className="text-sm text-gray-600"><strong>User ID:</strong> {account.userId}</p>}
          
          {account.message && (
            <div className="mt-2 text-sm flex items-start gap-1">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Message:</strong> {account.message}
              </div>
            </div>
          )}
        </div>
        <Button 
          variant={isSuccess ? "default" : "outline"}
          onClick={() => onTestLogin(account.email, account.password)}
          className={`shrink-0 ${isSuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
          disabled={processingTestLogin || (!account.password)}
        >
          {processingTestLogin ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Test Login
            </>
          ) : "Test Login"}
        </Button>
      </div>
    </div>
  );
};

export default AccountItem;
