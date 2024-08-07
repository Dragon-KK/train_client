<script lang="ts">
	import { Label, Input, Helper, type InputType } from "flowbite-svelte";
    export let placeholder = "";
    export let value = "";
    export let label = "";
    export let editable = true;
    export let divClass = "";
    export let input_type: InputType = "text";
    export let is_valid = true;
    $: is_valid = invalid_reason === "";
    export let invalidator: (arg0: string) => string = (value) => "";
    $: invalid_reason = invalidator(value);
</script>

<div class={"mb-6 " + divClass}>
    <Label class="block mb-2">{label}</Label>
    <Input name={label} step=1 type={input_type} placeholder={placeholder} bind:value={value} disabled={!editable}/>
    <Helper class="mt-2" color="red">{invalid_reason}</Helper>
</div>