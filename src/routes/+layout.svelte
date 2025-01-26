<script lang="ts">
  import '../app.pcss';
  import './styles.css';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="app">
  <main>
    {@render children?.()}
  </main>
</div>
