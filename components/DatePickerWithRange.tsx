"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

export function DatePickerWithRange() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const ddate = d.getDate();
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(year, month, ddate),
        to: addDays(new Date(year, month, ddate), 5),
    });

    return (
        <Field className="">
            <FieldLabel htmlFor="date-picker-range">
                Tournament Date Range
            </FieldLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-picker-range"
                        className="justify-start px-2.5 font-normal">
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
            {date?.from && (
                <input
                    type="date"
                    name="startDate"
                    value={format(date.from, "yyy-MM-dd")}
                    className="hidden"
                    readOnly
                />
            )}
            {date?.to && (
                <input
                    type="date"
                    name="endDate"
                    value={format(date.to, "yyy-MM-dd")}
                    className="hidden"
                    readOnly
                />
            )}
        </Field>
    );
}
