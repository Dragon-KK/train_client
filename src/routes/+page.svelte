<script>
	import { Button, ButtonGroup } from "flowbite-svelte";
    import Navbar from "./Navbar.svelte";
    import RequestedTaskContainer from "./RequestedTaskContainer.svelte";
	import RequestedTaskCreatorModal from "./RequestedTaskCreatorModal.svelte";

    let request_task = false;
</script>

<RequestedTaskCreatorModal bind:create={request_task}/>

<div class="app">
    <div style="height: 15vh; margin: 0; place-items: center" class="grid">
        <ButtonGroup>
            <Button class="flex-1" color="alternative" on:click={() => {
                request_task = true;
            }}>Create Task!</Button>
            <Button color="primary" on:click={() => {
                // TODO Schedule
            }}>Schedule</Button>
        </ButtonGroup>
    </div>
    <div style="margin: 0 2.5rem; overflow: scroll; overflow-x: hidden; height: 75vh">
        <RequestedTaskContainer />
    </div>
</div>