# Example

```bash
pnpm i canvas-effect
```

```vue
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { particleLine } from 'canvas-effect';


  onMounted(() => {
    particleLine({
      id: 'canvas',
      count: 200
    })
  });
</script>
```


