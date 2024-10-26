<template>
    <div :class="{ 'dark-mode': isDarkMode }">
      <div class="controls">
        <label>Rozmiar czcionki:
          <input type="range" min="12" max="32" v-model="fontSize" />
        </label>
      </div>
      <div v-html="htmlContent" :style="{ fontSize: fontSize + 'px' }" class="markdown-content"></div>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default {
  name: 'MarkdownViewer',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const htmlContent = ref('');
    const fontSize = ref(16);

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
        const markdownText = await response.text();
        htmlContent.value = md.render(markdownText);
      } catch (error) {
        console.error('Error loading Markdown:', error);
      }
    };

    onMounted(loadMarkdown);

    return { htmlContent, fontSize };
  },
};
</script>

  <style scoped>
  .controls {
    margin-bottom: 16px;
  }

  .markdown-content {
    line-height: 1.6;
  }
  .markdown-content {
    text-align: justify;
  }
  </style>
