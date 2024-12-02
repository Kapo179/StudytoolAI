import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { addSubmission } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface ProductPreviewProps {
  data: any;
  mode: 'desktop' | 'mobile';
}

export function ProductPreview({ data, mode }: ProductPreviewProps) {
  const { handleSubmit } = useFormContext();
  const { toast } = useToast();

  const onSubmit = async (formData: any) => {
    try {
      await addSubmission({
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });

      toast({
        title: 'Submission successful',
        description: 'Your study tool has been submitted for review. You will receive an email confirmation shortly.',
      });
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
      console.error('Submission failed:', error);
    }
  };

  return (
    <div
      className={cn(
        'mx-auto overflow-hidden rounded-lg border bg-card',
        mode === 'mobile' ? 'w-[375px]' : 'w-full max-w-4xl'
      )}
    >
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {data.logo && (
            <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center rounded-xl bg-[#1D2126]">
              <img
                src={URL.createObjectURL(data.logo)}
                alt={data.name}
                className="h-12 w-12 object-contain"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-cal text-xl truncate">
              {data.name || 'Product Name'}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.tagline || 'Your product tagline'}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="font-medium">About</h4>
          <p className="text-sm text-muted-foreground break-words">
            {data.description || 'Product description will appear here.'}
          </p>
        </div>

        {/* Screenshots */}
        {data.images?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Screenshots</h4>
            <div className="grid grid-cols-2 gap-2">
              {data.images.map((image: File, index: number) => (
                <div 
                  key={index} 
                  className="aspect-video rounded-lg border overflow-hidden bg-muted"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Screenshot ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}