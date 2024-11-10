<template>
    <div>
      <div class="controls">
        <div class="form-check form-switch">
          <input class="form-check-input"
          type="checkbox" v-model="hideRefs"
          id="mySwitch" name="darkmode">
          <label class="form-check-label" for="mySwitch">Ukryj wersety</label>
        </div>
        <label>Czcionka:
          <input type="range" min="12" max="32" v-model="fontSize" />
        </label>
      </div>
      <MarkdownComponent :md="markdownText" :fontSize="fontSize" :hideRefs="hideRefs"/>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue';
import MarkdownComponent from './MarkdownComponent.vue';

export default {
  name: 'MarkdownViewer',
  components: {
    MarkdownComponent,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const fontSize = ref(18);
    const hideRefs = ref(true);
    const markdownText = ref('');

    function xor(key) {
      const keyBytes = new TextEncoder().encode(key);
      let keyIndex = 0;
      return new window.TransformStream({
        transform(chunk, controller) {
          const output = new Uint8Array(chunk.length);
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < chunk.length; i++) {
            // eslint-disable-next-line no-bitwise
            output[i] = chunk[i] ^ keyBytes[keyIndex];
            keyIndex = (keyIndex + 1) % keyBytes.length;
          }
          controller.enqueue(output);
        },
      });
    }

    const only = 'wylacznie do celow kultu religijnego';
    const loadMarkdown = async () => {
      try {
        const gunzip = new window.DecompressionStream('gzip');
        const gzResponse = await fetch(`x/${props.slug}.dat`);
        const blob = await gzResponse.blob();
        const decompressedStream = blob.stream().pipeThrough(xor(only)).pipeThrough(gunzip);
        const response = new window.Response(decompressedStream);
        markdownText.value = await response.text();
      } catch (error) {
        console.error('Error loading Markdown:', error);
      }
    };

    onMounted(loadMarkdown);

    return {
      fontSize, hideRefs, markdownText,
    };
  },
};
</script>
  <style scoped>
  .controls {
    margin-bottom: 16px;
  }
  </style>
