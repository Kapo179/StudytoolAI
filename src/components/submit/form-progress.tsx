import { FormState } from 'react-hook-form';
import { Progress } from '@/components/ui/progress';
import { FORM_SECTIONS, SECTION_CONFIG, FormSection } from '@/lib/form-sections';
import { cn } from '@/lib/utils';

interface FormProgressProps {
  activeSection: FormSection;
  formState: FormState<any>;
}

export function FormProgress({ activeSection, formState }: FormProgressProps) {
  const calculateProgress = () => {
    const currentSectionIndex = FORM_SECTIONS.indexOf(activeSection);
    const sectionsToCheck = FORM_SECTIONS.slice(0, currentSectionIndex + 1);
    
    let completedSections = 0;
    
    sectionsToCheck.forEach((section) => {
      const config = SECTION_CONFIG[section];
      const isComplete = config.fields.every((field) => {
        const fieldPath = field.split('.');
        return fieldPath.reduce((obj, key) => obj?.[key], formState.dirtyFields);
      });
      
      if (isComplete) {
        completedSections++;
      }
    });

    return Math.round((completedSections / FORM_SECTIONS.length) * 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Step {FORM_SECTIONS.indexOf(activeSection) + 1} of {FORM_SECTIONS.length}
          </p>
          <h2 className="text-lg font-semibold">
            {SECTION_CONFIG[activeSection].title}
          </h2>
        </div>
        <div className="text-sm text-muted-foreground">
          {calculateProgress()}% complete
        </div>
      </div>

      <div className="relative">
        <Progress value={calculateProgress()} className="h-2" />
        <div className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between px-1">
          {FORM_SECTIONS.map((section, index) => {
            const isActive = section === activeSection;
            const isPast = FORM_SECTIONS.indexOf(section) < FORM_SECTIONS.indexOf(activeSection);
            const config = SECTION_CONFIG[section];
            const isComplete = config.fields.every((field) => {
              const fieldPath = field.split('.');
              return fieldPath.reduce((obj, key) => obj?.[key], formState.dirtyFields);
            });
            
            return (
              <div
                key={section}
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full transition-all",
                  isActive && "bg-mint ring-4 ring-mint/20",
                  isPast && isComplete && "bg-mint",
                  !isActive && !isPast && "bg-muted"
                )}
              >
                <span className="text-[10px] font-bold text-white">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}