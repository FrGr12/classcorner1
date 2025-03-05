
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TestAccount } from "@/hooks/useTestAccounts";

interface AccountItemProps {
  account: TestAccount;
  onTestLogin: (email: string, password: string) => Promise<void>;
  onCopy: (text: string) => void;
  processingTestLogin: boolean;
}

const AccountItem = ({ account, onTestLogin, onCopy, processingTestLogin }: AccountItemProps) => {
  return (
    <div className={`p-4 border rounded-md ${account.status === 'error' ? 'bg-red-50 border-red-100' : 'bg-slate-50'}`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
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
          
          <p className="flex items-center gap-1">
            <strong>Status:</strong> 
            <span className={account.status === 'error' ? 'text-red-600' : 
                            account.status === 'warning' ? 'text-amber-600' : 
                            'text-green-600'}>
              {account.status}
            </span>
          </p>
          {account.userId && <p><strong>User ID:</strong> {account.userId}</p>}
          {account.message && <p className="text-red-600"><strong>Message:</strong> {account.message}</p>}
        </div>
        <Button 
          variant="outline" 
          onClick={() => onTestLogin(account.email, account.password)}
          className="shrink-0"
          disabled={processingTestLogin}
        >
          {processingTestLogin ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : "Test Login"}
        </Button>
      </div>
    </div>
  );
};

export default AccountItem;
