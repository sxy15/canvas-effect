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
      color: '255, 255, 255',
      count: 200
    })
  });
</script>
```


