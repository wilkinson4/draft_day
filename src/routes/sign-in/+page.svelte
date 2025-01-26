<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
</script>

<section class="container flex h-screen flex-col items-center justify-center">
  <div class="container flex h-full flex-col items-center justify-center space-y-4">
    <h1>Draft Day</h1>
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <img src={$page.data.session.user.image} class="avatar" alt="User Avatar" />
      {/if}
      <span class="signedInText">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.name ?? 'User'}</strong>
      </span>
      <Button on:click={() => signOut()}>Sign Out</Button>
    {:else}
      <span class="notSignedInText">You are not signed in</span>
      <Button on:click={() => signIn('google', { callbackUrl: $page.data.loginRedirectUrl })}>
        Sign In
      </Button>
    {/if}
  </div>
</section>
