<script lang="ts">
  import { signOut } from '@auth/sveltekit/client';
  import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { formSchema, type FormSchema } from './schema';
  import {
    Label,
    Field,
    Control,
    ElementField,
    Fieldset,
    FieldErrors,
    Button
  } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import {
    Root as SelectRoot,
    Trigger as SelectTrigger,
    Value as SelectValue,
    Content as SelectContent,
    Item as SelectItem
  } from '$lib/components/ui/select';

  interface Props {
    data: SuperValidated<Infer<FormSchema>>;
  }

  let { data }: Props = $props();

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
    dataType: 'json'
  });

  const { form: formData, enhance } = form;

  let selectedNumTeams = $derived($formData.numberOfTeams
    ? { value: $formData.numberOfTeams, label: $formData.numberOfTeams }
    : { value: 12, label: 12 });

  const handleNumTeamsChange = (value: number) => {
    if ($formData.teams.length > value) {
      $formData.teams = $formData.teams.slice(0, value);
    } else if ($formData.teams.length < value) {
      const numEmpty = value - $formData.teams.length;
      const emptyTeamsArr = Array(numEmpty).join('.').split('.');

      $formData.teams = $formData.teams.concat(emptyTeamsArr);
    }
  };
</script>

<section class="container flex h-screen columns-1 items-center">
  <div>
    <h1>Create A League</h1>
  </div>
  <form method="POST" use:enhance>
    <Field {form} name="name">
      <Control >
        {#snippet children({ attrs })}
                <Label>Name</Label>
          <Input {...attrs} bind:value={$formData.name} />
                      {/snippet}
            </Control>
      <FieldErrors />
    </Field>
    <Field {form} name="numberOfTeams">
      <Control >
        {#snippet children({ attrs })}
                <SelectRoot
            selected={selectedNumTeams}
            onSelectedChange={(v) => {
              v && ($formData.numberOfTeams = v.value);

              v && handleNumTeamsChange(v.value);
            }}
          >
            <SelectTrigger {...attrs} class="w-[180px]">
              <SelectValue placeholder="Number Of Teams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={8} label="8" />
              <SelectItem value={10} label="10" />
              <SelectItem value={12} label="12" />
            </SelectContent>
          </SelectRoot>
          <input hidden bind:value={$formData.numberOfTeams} name={attrs.name} />
                      {/snippet}
            </Control>
      <FieldErrors />
    </Field>
    <Fieldset {form} name="teams">
      {#each $formData.teams as _, i}
        <ElementField {form} name="teams[{i}]">
          <Control >
            {#snippet children({ attrs })}
                        <Label>Enter Team {i + 1} Name</Label>
              <Input {...attrs} bind:value={$formData.teams[i]} />
                                  {/snippet}
                    </Control>
        </ElementField>
      {/each}
      <FieldErrors />
    </Fieldset>
    <Button>Submit</Button>
  </form>
  <Button on:click={() => signOut()}>Sign Out</Button>
</section>
