import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validations/product';
import { Form } from '@/components/ui/form';
import { ProductBasicInfo } from './sections/basic-info';
import { ProductMedia } from './sections/media';
import { ProductDetails } from './sections/details';
import { ProductPreview } from './sections/preview';
import { FormNav } from './form-nav';
import { useAutoSave } from '@/hooks/use-autosave';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone } from 'lucide-react';
import { addSubmission } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
// Remove unused import
// import { FORM_SECTIONS, FormSection } from '@/lib/form-sections';
import { FormSection } from '@/lib/form-sections';

export function ProductForm() {
  const [activeSection, setActiveSection] = useState<FormSection>('basics');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      tagline: '',
      description: '',
      contactName: '',
      contactEmail: '',
      logo: null,
      images: [],
      websiteUrl: '',
      pricing: {
        type: 'free',
        plans: [],
      },
    },
  });

  useAutoSave(methods);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await addSubmission({
        ...data,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });

      toast({
        title: 'Submission successful',
        description: 'Your study tool has been submitted for review.',
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Submission failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-2">
        <h1 className="font-cal text-3xl">Submit Your Study Tool</h1>
        <p className="text-muted-foreground">
          Share your educational tool with our community of learners
        </p>
      </div>

      <FormProvider {...methods}>
        <Form {...methods}>
          <form className="mt-8 space-y-8">
            <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as FormSection)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="basics">Basic Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                {activeSection === 'preview' && (
                  <div className="flex items-center gap-2 rounded-lg border p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                      className={previewMode === 'desktop' ? 'bg-muted' : ''}
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                      className={previewMode === 'mobile' ? 'bg-muted' : ''}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Mobile
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <TabsContent value="basics" className="space-y-6">
                  <ProductBasicInfo control={methods.control} />
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                  <ProductMedia />
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <ProductDetails control={methods.control} />
                </TabsContent>

                <TabsContent value="preview" className="space-y-6">
                  <ProductPreview data={methods.getValues()} mode={previewMode} />
                </TabsContent>
              </div>
            </Tabs>

            <FormNav
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              isSubmitting={isSubmitting}
              onSubmit={methods.handleSubmit(handleSubmit)}
            />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}