"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function DatePicker({ state, setState, ...props }: any) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"destructive"}
                    className={cn("w-[240px] justify-start text-left font-normal inputs", !state && "text-muted-foreground")}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {state ? format(state, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className=" w-auto p-0 bg-[#171717]">
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={state}
                    onSelect={setState}
                    fromYear={1900}
                    toYear={2030}
                />
            </PopoverContent>
        </Popover>
    )
}