<template>
  <div v-if="isOpen" class="tts-sticky-bar mb-3 p-2 border rounded shadow-sm">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
      <!-- 4 Playback controls -->
      <div class="d-flex align-items-center gap-1">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="prev"
          :disabled="chunks.length === 0 || currentIndex <= 0"
          title="Poprzedni fragment"
          aria-label="Poprzedni fragment"
        >
          <i class="bi bi-skip-backward-fill"></i>
        </button>

        <button
          type="button"
          class="btn btn-sm"
          :class="isPlaying && !isPaused ? 'btn-primary' : 'btn-outline-primary'"
          @click="playPause"
          :disabled="chunks.length === 0"
          :title="isPlaying && !isPaused ? 'Wstrzymaj' : 'Odtwarzaj'"
          :aria-label="isPlaying && !isPaused ? 'Wstrzymaj' : 'Odtwarzaj'"
        >
          <i :class="isPlaying && !isPaused ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
        </button>

        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="next"
          :disabled="chunks.length === 0 || (currentIndex >= chunks.length - 1 && currentIndex >= 0)"
          title="Następny fragment"
          aria-label="Następny fragment"
        >
          <i class="bi bi-skip-forward-fill"></i>
        </button>

        <button
          type="button"
          class="btn btn-sm btn-outline-danger"
          @click="stop"
          :disabled="!isPlaying && currentIndex < 0"
          title="Zatrzymaj"
          aria-label="Zatrzymaj"
        >
          <i class="bi bi-stop-fill"></i>
        </button>
      </div>

      <!-- Chunk progress indicator -->
      <div class="text-muted small">
        <span v-if="currentIndex >= 0 && chunks.length > 0">
          Fragment {{ currentIndex + 1 }} z {{ chunks.length }}
        </span>
        <span v-else-if="chunks.length > 0">
          Lektor TTS ({{ chunks.length }} fragmentów)
        </span>
        <span v-else>
          Brak tekstu do odczytania
        </span>
      </div>

      <!-- Close player button -->
      <button
        type="button"
        class="btn-close ms-auto"
        aria-label="Zamknij lektora"
        @click="closePlayer"
      ></button>
    </div>
  </div>
</template>

<script>
import {
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';

export default {
  name: 'TtsPlayer',
  props: {
    slug: {
      type: String,
      required: true,
    },
    targetSelector: {
      type: String,
      default: '.markdown-content',
    },
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const isPlaying = ref(false);
    const isPaused = ref(false);
    const currentIndex = ref(-1);
    const chunks = ref([]);
    const polishVoice = ref(null);
    const activeUtterance = ref(null);

    const findPolishVoice = () => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return null;
      const voices = window.speechSynthesis.getVoices();
      const directMatch = voices.find(
        (v) => v.lang === 'pl-PL' || v.lang === 'pl_PL',
      );
      if (directMatch) return directMatch;
      const prefixMatch = voices.find(
        (v) => v.lang.toLowerCase().startsWith('pl'),
      );
      return prefixMatch || null;
    };

    const loadVoices = () => {
      polishVoice.value = findPolishVoice();
    };

    const extractCleanText = (element) => {
      if (!element) return '';
      const clone = element.cloneNode(true);
      clone.querySelectorAll('.ref, .ph').forEach((el) => el.remove());
      const rawText = clone.textContent || '';
      return rawText
        .replace(/\s+([,.;:!?])/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const clearHighlight = () => {
      const highlighted = document.querySelectorAll('.tts-active-chunk');
      highlighted.forEach((el) => {
        el.classList.remove('tts-active-chunk');
      });
    };

    const highlightChunk = (index) => {
      clearHighlight();
      if (index >= 0 && index < chunks.value.length) {
        const el = chunks.value[index];
        el.classList.add('tts-active-chunk');
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    const refreshChunks = () => {
      if (typeof document === 'undefined') return;
      const container = document.querySelector(props.targetSelector);
      if (!container) {
        chunks.value = [];
        return;
      }
      const candidates = Array.from(
        container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, blockquote'),
      );
      // Keep only leaf block elements so text inside nested elements is not read twice
      const leafElements = candidates.filter(
        (el) => !candidates.some((other) => other !== el && el.contains(other)),
      );
      // Retain elements having speakable text after removing biblical references
      chunks.value = leafElements.filter((el) => extractCleanText(el).length > 0);
    };

    const stop = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (activeUtterance.value) {
        activeUtterance.value = null;
      }
      isPlaying.value = false;
      isPaused.value = false;
      currentIndex.value = -1;
      clearHighlight();
    };

    const speakChunk = (index) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      if (index < 0 || index >= chunks.value.length) {
        stop();
        return;
      }

      window.speechSynthesis.cancel();
      currentIndex.value = index;
      highlightChunk(index);

      const text = extractCleanText(chunks.value[index]);
      if (!text) {
        const nextIndex = index + 1;
        if (nextIndex < chunks.value.length) {
          speakChunk(nextIndex);
        } else {
          stop();
        }
        return;
      }

      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      if (polishVoice.value) {
        utterance.voice = polishVoice.value;
      }

      utterance.onend = () => {
        if (isPlaying.value && !isPaused.value) {
          const nextIndex = currentIndex.value + 1;
          if (nextIndex < chunks.value.length) {
            speakChunk(nextIndex);
          } else {
            stop();
          }
        }
      };

      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          return;
        }
        stop();
      };

      activeUtterance.value = utterance;
      isPlaying.value = true;
      isPaused.value = false;
      window.speechSynthesis.speak(utterance);
    };

    const playPause = () => {
      if (chunks.value.length === 0) {
        refreshChunks();
      }
      if (chunks.value.length === 0) return;

      if (isPlaying.value && !isPaused.value) {
        // Pause active speech
        if (window.speechSynthesis) {
          window.speechSynthesis.pause();
        }
        isPaused.value = true;
      } else if (isPlaying.value && isPaused.value) {
        // Resume paused speech
        isPaused.value = false;
        if (window.speechSynthesis) {
          window.speechSynthesis.resume();
        }
        // Chromium resume watchdog in case speech synthesis was frozen
        setTimeout(() => {
          if (
            isPlaying.value &&
            !isPaused.value &&
            window.speechSynthesis &&
            !window.speechSynthesis.speaking
          ) {
            speakChunk(currentIndex.value);
          }
        }, 150);
      } else {
        // Start from current or beginning
        const targetIndex = currentIndex.value >= 0 ? currentIndex.value : 0;
        speakChunk(targetIndex);
      }
    };

    const prev = () => {
      if (chunks.value.length === 0) return;
      const targetIndex = Math.max(0, (currentIndex.value >= 0 ? currentIndex.value : 0) - 1);
      if (isPlaying.value && !isPaused.value) {
        speakChunk(targetIndex);
      } else {
        currentIndex.value = targetIndex;
        highlightChunk(targetIndex);
      }
    };

    const next = () => {
      if (chunks.value.length === 0) return;
      const targetIndex = (currentIndex.value >= 0 ? currentIndex.value : -1) + 1;
      if (targetIndex >= chunks.value.length) {
        stop();
        return;
      }
      if (isPlaying.value && !isPaused.value) {
        speakChunk(targetIndex);
      } else {
        currentIndex.value = targetIndex;
        highlightChunk(targetIndex);
      }
    };

    const openPlayer = () => {
      isOpen.value = true;
      emit('update:isOpen', true);
      nextTick(() => {
        refreshChunks();
      });
    };

    const closePlayer = () => {
      stop();
      isOpen.value = false;
      emit('update:isOpen', false);
    };

    const togglePlayer = () => {
      if (isOpen.value) {
        closePlayer();
      } else {
        openPlayer();
      }
    };

    onMounted(() => {
      loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    });

    onBeforeUnmount(() => {
      stop();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    });

    watch(
      () => props.slug,
      () => {
        stop();
        nextTick(() => {
          refreshChunks();
        });
      },
    );

    return {
      isOpen,
      isPlaying,
      isPaused,
      currentIndex,
      chunks,
      playPause,
      prev,
      next,
      stop,
      openPlayer,
      closePlayer,
      togglePlayer,
      refreshChunks,
    };
  },
};
</script>

<style scoped>
.tts-sticky-bar {
  position: sticky;
  top: 0;
  z-index: 1020;
  background-color: var(--bs-body-bg, #ffffff);
  backdrop-filter: blur(8px);
}
</style>
