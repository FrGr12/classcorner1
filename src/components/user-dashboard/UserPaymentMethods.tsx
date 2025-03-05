
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import PaymentMethodsManagement from "@/components/payment/PaymentMethodsManagement";

const UserPaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your saved payment methods</CardDescription>
          </div>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <PaymentMethodsManagement />
      </CardContent>
    </Card>
  );
};

export default UserPaymentMethods;
