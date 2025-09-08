import { AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface SafetyAlertProps {
  message: string;
  onDismiss: () => void;
}

export const SafetyAlert = ({ message, onDismiss }: SafetyAlertProps) => {
  return (
    <Alert className="safety-warning mb-6 relative">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="pr-8">
        <strong>Safety Notice:</strong> {message}
      </AlertDescription>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 h-6 w-6 p-0"
        onClick={onDismiss}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};