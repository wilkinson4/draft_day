<script>
  import { signOut } from '@auth/sveltekit/client';
  import { Button } from '$lib/components/ui/button';
</script>

<section>
  <h1>Welcome to Draft Day</h1>
  <Button on:click={() => signOut()}>Sign Out</Button>
</section>

<style>
</style>
