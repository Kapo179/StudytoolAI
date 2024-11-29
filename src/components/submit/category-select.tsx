import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { value: 'study-tools', label: 'Study Tools' },
  { value: 'ai-tutors', label: 'AI Tutors' },
  { value: 'flashcards', label: 'Flashcards' },
  { value: 'note-taking', label: 'Note Taking' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'language-learning', label: 'Language Learning' },
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
];

interface CategorySelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function CategorySelect({ value = [], onChange }: CategorySelectProps) {
  const [open, setOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((v) => v !== category));
    } else if (value.length < 3) {
      onChange([...value, category]);
    }
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            Select categories
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {CATEGORIES.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={() => toggleCategory(category.label)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(category.label)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {value.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}