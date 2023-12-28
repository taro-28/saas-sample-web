"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  onCreate: (value: string) => void;
};

export function Combobox({ name, options, value, onChange, onCreate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [searchWord, setSearchWord] = React.useState("");

  return (
    <>
      <input
        value={value}
        hidden
        name={name}
        // warningがでるためonChangeを設定しておく
        onChange={() => null}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? options.find((o) => o.value === value)?.label
              : `Select ${name} ...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${name} ...`}
              value={searchWord}
              onValueChange={setSearchWord}
            />
            <CommandEmpty>
              <Button variant="outline" onClick={() => onCreate(searchWord)}>
                <Plus className="mr-1 h-4 w-4" />
                Create
                <span className="font-bold ml-1">{searchWord}</span>
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === o.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
