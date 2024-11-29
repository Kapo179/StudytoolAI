import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X, Loader2, Check } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { validateImageFile, compressImage } from '@/lib/media';
import { useToast } from '@/hooks/use-toast';

interface UploadingFile {
  file: File;
  progress: number;
}

export function ProductMedia() {
  const { control, setValue } = useFormContext();
  const { toast } = useToast();
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, UploadingFile>>({});

  const processFile = async (file: File) => {
    const id = file.name + Date.now();
    
    try {
      setUploadingFiles(prev => ({
        ...prev,
        [id]: { file, progress: 0 }
      }));

      // Simulate progress
      const interval = setInterval(() => {
        setUploadingFiles(prev => ({
          ...prev,
          [id]: { ...prev[id], progress: Math.min(prev[id].progress + 10, 90) }
        }));
      }, 100);

      if (!validateImageFile(file)) {
        throw new Error('Invalid file');
      }

      const compressedFile = await compressImage(file);
      
      // Complete progress
      clearInterval(interval);
      setUploadingFiles(prev => ({
        ...prev,
        [id]: { ...prev[id], progress: 100 }
      }));

      // Remove from uploading state after showing completion
      setTimeout(() => {
        setUploadingFiles(prev => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }, 1000);

      return compressedFile;
    } catch (error) {
      clearInterval(interval);
      setUploadingFiles(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      throw error;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[], type: 'logo' | 'images') => {
    try {
      if (type === 'logo') {
        const file = acceptedFiles[0];
        const processed = await processFile(file);
        setValue('logo', processed, { shouldValidate: true });
      } else {
        const processed = await Promise.all(acceptedFiles.map(processFile));
        setValue('images', processed, { shouldValidate: true });
      }
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  }, [setValue, toast]);

  const logoDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'logo'),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
  });

  const imagesDropzone = useDropzone({
    onDrop: (files) => onDrop(files, 'images'),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 8,
  });

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Logo</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                {field.value ? (
                  <div className="relative h-32 w-32">
                    <img
                      src={URL.createObjectURL(field.value)}
                      alt="Logo"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6"
                      onClick={() => field.onChange(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    {...logoDropzone.getRootProps()}
                    className={cn(
                      'flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                      logoDropzone.isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary'
                    )}
                  >
                    <input {...logoDropzone.getInputProps()} />
                    <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Upload Logo
                    </span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Minimum 640x640px PNG or JPG
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Screenshots</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {field.value?.map((image: File, index: number) => (
                  <div key={index} className="relative aspect-video">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Screenshot ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6"
                      onClick={() => {
                        const newImages = [...field.value];
                        newImages.splice(index, 1);
                        field.onChange(newImages);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Uploading Files */}
                {Object.entries(uploadingFiles).map(([id, { progress }]) => (
                  <div
                    key={id}
                    className="relative aspect-video rounded-lg border bg-muted"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {progress === 100 ? (
                        <Check className="h-8 w-8 text-mint animate-in zoom-in" />
                      ) : (
                        <>
                          <Loader2 className="h-8 w-8 animate-spin text-mint" />
                          <span className="absolute text-xs font-medium">
                            {progress}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {field.value?.length < 8 && (
                  <div
                    {...imagesDropzone.getRootProps()}
                    className={cn(
                      'flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors',
                      imagesDropzone.isDragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-muted-foreground/25 hover:border-primary'
                    )}
                  >
                    <input {...imagesDropzone.getInputProps()} />
                    <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                    <span className="text-center text-xs text-muted-foreground">
                      Drop screenshots here
                      <br />
                      or click to upload
                    </span>
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Upload 3-8 high-quality screenshots (16:9 recommended)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}