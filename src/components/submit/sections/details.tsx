import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ProductDetailsProps {
  control: Control<any>;
}

export function ProductDetails({ control }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="websiteUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://your-product.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="pricing.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pricing Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="freemium">Freemium</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="pricing.plans"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pricing Plans</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {field.value?.map((plan: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Plan {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const newPlans = [...field.value];
                            newPlans.splice(index, 1);
                            field.onChange(newPlans);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          placeholder="Plan name"
                          value={plan.name}
                          onChange={(e) => {
                            const newPlans = [...field.value];
                            newPlans[index].name = e.target.value;
                            field.onChange(newPlans);
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Price per month"
                          value={plan.price}
                          onChange={(e) => {
                            const newPlans = [...field.value];
                            newPlans[index].price = parseFloat(e.target.value);
                            field.onChange(newPlans);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        {plan.features?.map((feature: string, fIndex: number) => (
                          <div key={fIndex} className="flex items-center gap-2">
                            <Input
                              placeholder="Feature description"
                              value={feature}
                              onChange={(e) => {
                                const newPlans = [...field.value];
                                newPlans[index].features[fIndex] = e.target.value;
                                field.onChange(newPlans);
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 flex-shrink-0"
                              onClick={() => {
                                const newPlans = [...field.value];
                                newPlans[index].features.splice(fIndex, 1);
                                field.onChange(newPlans);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const newPlans = [...field.value];
                            newPlans[index].features.push('');
                            field.onChange(newPlans);
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Feature
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newPlans = [
                      ...(field.value || []),
                      {
                        name: '',
                        price: 0,
                        features: [''],
                      },
                    ];
                    field.onChange(newPlans);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Pricing Plan
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              Add pricing plans if your product is freemium or paid
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}