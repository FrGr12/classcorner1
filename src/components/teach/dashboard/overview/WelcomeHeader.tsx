
import { FC } from "react";

interface WelcomeHeaderProps {
  fullName?: string;
}

const WelcomeHeader: FC<WelcomeHeaderProps> = ({ fullName }) => {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {greeting}{fullName ? `, ${fullName}` : ''}!
      </h1>
      <p className="text-muted-foreground mt-1">
        Here's an overview of your teaching activities
      </p>
    </div>
  );
};

export default WelcomeHeader;
