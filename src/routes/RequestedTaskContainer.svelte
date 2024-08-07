<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Button,
		ButtonGroup,
		Helper,
		Input,
		Label,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { EditOutline, TrashBinOutline, InfoCircleOutline } from 'flowbite-svelte-icons'
	
	import type { RequestedTask } from '$lib/interfaces/models';
	import { API } from '$lib/api';
	import RequestedTaskInfoModal from './RequestedTaskInfoModal.svelte';

	let requested_tasks: RequestedTask[] = [];
	onMount(async () => {
		requested_tasks = await API.getRequestedTasks();
	});

	let more_info_task: RequestedTask | null = null;
	
	API.requestTask(
		{
			block: "B",
			den: "D",
			department: "department",
			location: "location",
			nature_of_work: "nature_of_work",
			preferred_ends_at: "00:08:20",
			preferred_starts_at: "00:08:00",
			priority: 1,
			requested_date: "2024-09-15",
			requested_duration: {minutes: 10},
			section_id: 6
		}
	)
</script>

<RequestedTaskInfoModal requested_task={more_info_task} />
<Table hoverable={true} striped={true} divClass="" shadow={true} style="height: 100%; overflow-y: scroll;">
	<TableHead>
		<TableHeadCell>Date</TableHeadCell>
		<TableHeadCell>Department</TableHeadCell>
		<TableHeadCell>User</TableHeadCell>
		<TableHeadCell>Priority</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>

	<TableBody tableBodyClass="divide-y">
		{#each requested_tasks as requested_task}
			<TableBodyRow>
				<TableBodyCell>{requested_task.requested_date}</TableBodyCell>
				<TableBodyCell>{requested_task.department}</TableBodyCell>
				<TableBodyCell>USER!</TableBodyCell>
				<TableBodyCell>{requested_task.priority}</TableBodyCell>
				<TableBodyCell>STAT</TableBodyCell>
				<TableBodyCell>
					<ButtonGroup class="*:!ring-primary-700 space-x-px">
					<Button color="alternative" on:click={() => {
						more_info_task=requested_task;
					}}>
						<InfoCircleOutline class="w-4 h-4 me-2" />
						Info
					</Button>
					<Button color="red" on:click={() => {
						requested_tasks = requested_tasks.filter(
							(task) => {
								return task.id !== requested_task.id;
							}
						);
						API.deleteTask(requested_task.id);
					}}>
						<TrashBinOutline class="w-4 h-4 me-2" />
						Delete
					</Button>
					</ButtonGroup>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
