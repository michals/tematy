<template>
  <div class="ms-auto">
    <button
      type="button"
      class="btn btn-sm"
      :class="isOpen ? 'btn-secondary' : 'btn-outline-secondary'"
      @click="togglePlayer"
      title="Podcast"
      aria-label="Podcast"
    >
      🎙️
    </button>
  </div>
  <div v-if="isOpen" class="podcast-container w-100 mt-2">
    <template v-if="!hasError">
      <div class="podcast-disclaimer text-danger text-center mt-1">
        <small>
          <strong>Uwaga:</strong> Nagranie wygenerowane przez AI na podstawie poniższego tekstu.
          Ma charakter wyłącznie pomocniczy – nadrzędnym i wiarygodnym źródłem pozostaje tekst.
        </small>
      </div>
      <audio
        ref="audioRef"
        controls
        preload="metadata"
        class="w-100"
        :src="audioUrl"
        @error="onAudioError"
      >
        Twoja przeglądarka nie obsługuje elementu audio.
      </audio>
    </template>
    <div
      v-else
      class="alert alert-warning alert-dismissible fade show d-flex align-items-center justify-content-between mb-0"
      role="alert"
    >
      <span>Brak nagrania dla tego hasła.</span>
      <button
        type="button"
        class="btn-close"
        aria-label="Zamknij"
        @click="closePlayer"
      ></button>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  onBeforeUnmount,
} from 'vue';

export default {
  name: 'PodcastPlayer',
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const isOpen = ref(false);
    const hasError = ref(false);
    const audioRef = ref(null);
    let dismissTimer = null;

    const audioUrl = computed(() => `https://cdn.trpaslik.pl/tematy/${props.slug}.m4a`);

    const clearTimer = () => {
      if (dismissTimer) {
        clearTimeout(dismissTimer);
        dismissTimer = null;
      }
    };

    const stopAudio = () => {
      if (audioRef.value) {
        audioRef.value.pause();
        audioRef.value.removeAttribute('src');
        audioRef.value.load();
      }
    };

    const closePlayer = () => {
      clearTimer();
      stopAudio();
      hasError.value = false;
      isOpen.value = false;
    };

    const togglePlayer = () => {
      if (isOpen.value) {
        closePlayer();
      } else {
        clearTimer();
        hasError.value = false;
        isOpen.value = true;
      }
    };

    const onAudioError = () => {
      hasError.value = true;
      clearTimer();
      dismissTimer = setTimeout(() => {
        closePlayer();
      }, 5000);
    };

    watch(
      () => props.slug,
      () => {
        closePlayer();
      },
    );

    onBeforeUnmount(() => {
      closePlayer();
    });

    return {
      isOpen,
      hasError,
      audioRef,
      audioUrl,
      togglePlayer,
      closePlayer,
      onAudioError,
    };
  },
};
</script>

<style scoped>
.podcast-container {
  min-height: 48px;
}
audio {
  display: block;
}
.podcast-disclaimer {
  font-size: 0.8rem;
  line-height: 1.25;
}
</style>
