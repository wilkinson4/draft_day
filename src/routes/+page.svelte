<script>
  import { signOut } from '@auth/sveltekit/client';
  import { Button } from '$lib/components/ui/button';
</script>

<section>
  <Button on:click={() => signOut()}>Sign Out</Button>
</section>

<style>
</style>
