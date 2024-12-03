import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { productSchema } from '@/lib/validations/product';
import { Form } from '@/components/ui/form';
import { ProductBasicInfo } from './sections/basic-info';
import { ProductMedia } from './sections/media';
import { ProductDetails } from './sections/details';
import { ProductPreview } from './sections/preview';
import { FormNav } from './form-nav';
import { useAutoSave } from '@/hooks/use-autosave';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { addSubmission, uploadFile } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { FormSection } from '@/lib/form-sections';
import { sendEmail } from '@/lib/sendEmail';

export function ProductForm() {
  const [activeSection, setActiveSection] = useState<FormSection>('basics');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); //

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

      // Upload logo file to Firebase Storage and get the download URL
      if (data.logo instanceof File) {
        data.logo = await uploadFile(data.logo);
      }

      // Upload image files to Firebase Storage and get the download URLs
      if (Array.isArray(data.images)) {
        data.images = await Promise.all(data.images.map(async (file: File) => {
          if (file instanceof File) {
            return await uploadFile(file);
          }
          return file;
        }));
      }

      await addSubmission({
        ...data,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });
      
      await sendEmail(
        data.contactEmail,
        'Submission Confirmation',
        'Your study tool has been submitted for review. You will receive an email confirmation shortly.'
      );

      toast({
        title: 'Submission successful',
        description: 'Your study tool has been submitted for review. You will receive an email confirmation shortly.',
      });
      navigate('/SubmissionLandingPage');
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: (error as Error).message,
        variant: 'destructive',
      });
      console.error('Submission failed:', error);
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
          <form className="mt-8 space-y-8" onSubmit={methods.handleSubmit(handleSubmit)}>
            <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as FormSection)}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="basics">Basic Info</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
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
                  <ProductPreview data={methods.getValues()} mode="desktop" />
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