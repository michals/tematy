<template>
  <div>
    <TtsPlayer
      ref="ttsPlayerRef"
      :slug="slug"
      @update:isOpen="isTtsOpen = $event"
    />
    <div class="controls d-flex flex-wrap gap-3 align-items-center">
      <button
        type="button"
        class="btn btn-sm"
        :class="isTtsOpen ? 'btn-secondary' : 'btn-outline-secondary'"
        @click="toggleTts"
        title="Lektor TTS"
        aria-label="Lektor TTS"
      >
        ▶️
      </button>
      <div class="form-check form-switch">
        <input class="form-check-input"
        type="checkbox" v-model="hideRefs"
        id="mySwitch" name="darkmode">
        <label class="form-check-label" for="mySwitch">Ukryj wersety</label>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span>Czcionka:</span>
        <input type="range" min="12" max="32" v-model="fontSize" />
      </div>
      <div class="form-check form-switch">
        <input class="form-check-input"
        type="checkbox" v-model="useSerif"
        id="serifSwitch">
        <label class="form-check-label" for="serifSwitch">Szeryfowa</label>
      </div>
      <PodcastPlayer :slug="slug" />
    </div>
    <MarkdownComponent
      :md="markdownText"
      :fontSize="fontSize"
      :hideRefs="hideRefs"
      :useSerif="useSerif"
    />
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  watch,
  nextTick,
} from 'vue';
import MarkdownComponent from './MarkdownComponent.vue';
import PodcastPlayer from './PodcastPlayer.vue';
import TtsPlayer from './TtsPlayer.vue';

export default {
  name: 'MarkdownViewer',
  components: {
    MarkdownComponent,
    PodcastPlayer,
    TtsPlayer,
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
    const useSerif = ref(false);
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

    const ttsPlayerRef = ref(null);
    const isTtsOpen = ref(false);

    const toggleTts = () => {
      if (ttsPlayerRef.value) {
        ttsPlayerRef.value.togglePlayer();
        isTtsOpen.value = ttsPlayerRef.value.isOpen;
      }
    };

    const only = 'wylacznie do celow kultu religijnego';
    const loadMarkdown = async () => {
      try {
        const gunzip = new window.DecompressionStream('gzip');
        const gzResponse = await fetch(`x/${props.slug}.dat`);
        const blob = await gzResponse.blob();
        const decompressedStream = blob.stream().pipeThrough(xor(only)).pipeThrough(gunzip);
        const response = new window.Response(decompressedStream);
        markdownText.value = await response.text();
        nextTick(() => {
          if (ttsPlayerRef.value && ttsPlayerRef.value.isOpen) {
            ttsPlayerRef.value.refreshChunks();
          }
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading Markdown:', error);
      }
    };

    onMounted(loadMarkdown);
    watch(() => props.slug, loadMarkdown);

    return {
      fontSize,
      hideRefs,
      markdownText,
      useSerif,
      ttsPlayerRef,
      isTtsOpen,
      toggleTts,
    };
  },
};
</script>
  <style scoped>
  .controls {
    margin-bottom: 16px;
  }
  </style>
