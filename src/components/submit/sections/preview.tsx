import { cn } from '@/lib/utils';

interface ProductPreviewProps {
  data: any;
  mode: 'desktop' | 'mobile';
}

export function ProductPreview({ data, mode }: ProductPreviewProps) {
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

        {/* Pricing */}
        <div className="space-y-2">
          <h4 className="font-medium">Pricing</h4>
          <div className="rounded-lg border p-3 space-y-3">
            <p className="text-sm capitalize font-medium">
              {data.pricing?.type || 'Free'}
            </p>
            {data.pricing?.plans?.map((plan: any, index: number) => (
              <div key={index} className="space-y-2 pt-2 first:pt-0">
                {index > 0 && <div className="border-t -mt-2" />}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{plan.name}</span>
                  <span className="text-sm font-medium">
                    ${plan.price}/mo
                  </span>
                </div>
                <ul className="space-y-1">
                  {plan.features.map((feature: string, fIndex: number) => (
                    <li 
                      key={fIndex} 
                      className="text-sm text-muted-foreground flex items-start"
                    >
                      <span className="mr-2">•</span>
                      <span className="break-words flex-1">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="font-medium">Contact</h4>
          <div className="rounded-lg border p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Website</span>
              <a 
                href={data.websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-mint hover:underline break-all"
              >
                {data.websiteUrl || 'Not provided'}
              </a>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contact</span>
              <span className="break-all">
                {data.contactEmail || 'Not provided'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}