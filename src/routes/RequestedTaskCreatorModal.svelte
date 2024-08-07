<script lang="ts">
	import { Button, ButtonGroup, Modal } from "flowbite-svelte";
    import InputComponent from "./InputComponent.svelte";
	import { FloppyDiskAltOutline, CloseOutline } from "flowbite-svelte-icons";
	
    export let create = false;
    
    const wholeNumberInvalidator = (val: string) => {
        const error_msg = "Expected whole number";
        if (isNaN(Number(val)) || Number(val) < 0){
            return error_msg;
        }
        return "";
    };

    const timeInvalidator = (val: string) => {
        const error_msg1 = "Expected format `HH:MM:SS`!";
        const error_msg2 = "Invalid time!";
        if (val.length != 8) return error_msg1;
        if (val[2] != ":" || val[5] != ":"){
            return error_msg1;
        }
        const h = Number(val.substring(0, 2));
        const m = Number(val.substring(3, 5));
        const s = Number(val.substring(6));
        
        if (isNaN(h) || isNaN(m) || isNaN(s)) return error_msg1;
        if (h < 0 || h > 23 || m < 0 || m > 59 || s < 0 || s > 59) return error_msg2;

        return "";
    };

    const durationInvalidator = (val: string) => {
        try {
            JSON.parse(val);
            // Make a better validator bro
        } catch (error) {
            return "Please provide a valid object";
        }
        return "";
    }

    const validity: Array<boolean> = new Array(11).fill(true);
</script>

<Modal title={`Task Creation Form`} dismissable={false} open={create} size=lg on:close={() => {
    create = false;
}}>
    <div class="input-container">
        <form id="task_data" class="inline-flex flex-wrap gap-x-16">
            <InputComponent editable={create} bind:is_valid={validity[0]} label="Department" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[1]} label="DEN" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[2]} label="Nature Of Work" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[3]} label="Block" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[4]} label="Location" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[5]} invalidator={timeInvalidator} label="Preferred Start Time" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[6]} invalidator={timeInvalidator} label="Preferred End Time" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[7]} invalidator={durationInvalidator} label="Requested Duration" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[8]} input_type="date" label="Requested Date"  divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[9]} input_type="number" invalidator={wholeNumberInvalidator} label="Priority" divClass="flex-grow"/>
            <InputComponent editable={create} bind:is_valid={validity[10]} input_type="number" invalidator={wholeNumberInvalidator} label="Section ID" divClass="flex-grow"/>
        </form>
    </div>

    <svelte:fragment slot="footer">
        <ButtonGroup class="*:!ring-primary-700 space-x-px">
            <Button color="green" on:click={() => {
                for (var idx in validity){
                    if (!validity[idx]){
                        alert("Please provide valid data before trying to save!")
                        return;
                    }
                }
                const form = document.getElementById("task_data");
                //@ts-ignore
                const data = new FormData(form);
                
                // TODO: Request the task!
                console.log(...data);               
                create = false
            }}>
                <FloppyDiskAltOutline class="w-4 h-4 me-2" />
                Save
            </Button>
            <Button color="red" on:click={() => {
                create=false
            }}>
                <CloseOutline class="w-4 h-4 me-2" />
                Cancel
            </Button>
        </ButtonGroup>
    </svelte:fragment>
</Modal>
