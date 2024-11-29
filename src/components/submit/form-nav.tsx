import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FORM_SECTIONS, SECTION_CONFIG, FormSection } from '@/lib/form-sections';

interface FormNavProps {
  activeSection: FormSection;
  setActiveSection: (section: FormSection) => void;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

export function FormNav({
  activeSection,
  setActiveSection,
  isSubmitting = false,
  onSubmit,
}: FormNavProps) {
  const { formState, trigger, getValues } = useFormContext();
  const currentIndex = FORM_SECTIONS.indexOf(activeSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === FORM_SECTIONS.length - 1;

  const getMissingFields = () => {
    const values = getValues();
    const missing: string[] = [];

    FORM_SECTIONS.forEach((section) => {
      const config = SECTION_CONFIG[section];
      config.fields.forEach((field) => {
        const value = field.split('.').reduce((obj, key) => obj?.[key], values);
        if (!value) {
          missing.push(config.fieldLabels[field]);
        }
      });
    });

    return missing;
  };

  const validateCurrentSection = async () => {
    const config = SECTION_CONFIG[activeSection];
    const isValid = await trigger(config.fields);
    
    if (isValid && config.validate) {
      const values = getValues();
      if (!config.validate(values)) {
        return;
      }
    }

    if (isValid) {
      setActiveSection(FORM_SECTIONS[currentIndex + 1]);
    }
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setActiveSection(FORM_SECTIONS[currentIndex - 1])}
        disabled={isFirst || isSubmitting}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      {isLast ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className="bg-mint text-white hover:bg-mint/90"
              disabled={isSubmitting}
            >
              Submit Product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {formState.isValid ? (
                  'Ready to submit?'
                ) : (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Missing Required Fields
                  </div>
                )}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {formState.isValid ? (
                  'Your product will be reviewed by our team before being listed.'
                ) : (
                  <div className="space-y-2">
                    <p>The following fields are required:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {getMissingFields().map((field) => (
                        <li key={field}>{field}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onSubmit}
                className="bg-mint text-white hover:bg-mint/90"
              >
                {formState.isValid ? 'Submit' : 'Submit Anyway'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          type="button"
          onClick={validateCurrentSection}
          disabled={isSubmitting}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}