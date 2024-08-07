import type { Duration } from "tinyduration"

export interface PartialRequestedTask{
    department: string,
    den: string,
    nature_of_work: string,
    block: string,
    location: string,

    preferred_starts_at: string,
    preferred_ends_at: string,

    requested_date: string,
    requested_duration: Duration,

    priority: number,
    section_id: number
};

export interface RequestedTask extends PartialRequestedTask{
    id: number
};
