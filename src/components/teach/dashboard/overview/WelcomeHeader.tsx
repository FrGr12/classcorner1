
import { FC } from "react";

interface WelcomeHeaderProps {
  fullName?: string;
}

const WelcomeHeader: FC<WelcomeHeaderProps> = ({ fullName }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Welcome back{fullName ? `, ${fullName}` : ''}!</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your teaching activities</p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
