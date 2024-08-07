import type { PartialRequestedTask, RequestedTask } from "./interfaces/models";
import { serialize, parse } from "tinyduration"

const PREFIX = "http://localhost:4200/api/"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deserialize_task = (data: any): RequestedTask => {
    return {
        ...data,
        requested_duration: parse(data.requested_duration)
    }
}

const get = (route: string) => {
    return fetch(PREFIX + route).then(res => res.json())
}

const fuckyou = (route: string) => {
    return fetch(PREFIX + route, {method: "DELETE"}).then(res => res.json());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = (route: string, data: any) => {
    return fetch(PREFIX + route, {
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export const API = {
    getRequestedTasks:  () => {
        return get("requested_task").then(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data: any[]) => {
                return data.map(raw_task => deserialize_task(raw_task));
            }
        );
    },

    requestTask: (task: PartialRequestedTask) => {
        return post("requested_task", {
            ...task,
            requested_duration: serialize(task.requested_duration)
        }).then(res => deserialize_task(res));
    },

    deleteTask: (task_id: number) => {
        return fuckyou(`requested_task/${task_id}`).then(res => deserialize_task(res));
    }
};
