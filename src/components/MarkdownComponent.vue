<template>
  <div>
    <div v-html="htmlContent"
    :style="{ fontSize: fontSize + 'px' }"
    :class="{ hideRefs: hideRefs}"
    class="markdown-content"
    ></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

const renderer = new MarkdownIt();

export default {
  name: 'MarkdownComponent',
  props: {
    md: {
      type: String,
      required: true,
    },
    fontSize: {
      type: Number,
      required: true,
    },
    hideRefs: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    htmlContent() {
      const mdText = this.md;
      let html = renderer.render(mdText);
      html = html.replace(/\(([^()]+)\)/g, '<i class="ref">($1)</i><i class="ph"></i>');
      html = html.replace(/href="([^":/]+)\.md"/g, 'href="#/tekst/$1"');
      return html;
    },
  },
};
</script>
<style scoped>
.controls {
  margin-bottom: 16px;
}

.markdown-content {
  line-height: 1.4;
  font-family: serif;
  text-align: justify;
}
</style>

<style>
.markdown-content i.ref {
  opacity: 0.7;
  color: darkgreen;
  font-style: unset;
}
.markdown-content.hideRefs i.ref {
  display: none;
}
.markdown-content i.ph::after {
  color: darkgreen;
  font-style: normal;
  display: inline-block;
  content: '';
}
.markdown-content.hideRefs i.ph::after {
  opacity: 0.5;
  content: '(...)';
}
.markdown-content h1 {
  font-size: 1.8em;
}
.markdown-content h2 {
  font-size: 1.5em;
}
.markdown-content h3 {
  font-size: 1.25em;
}
.markdown-content h4 {
  font-size: 1.1em;
}
.markdown-content h5 {
  font-size: 1em;
}
.markdown-content h6 {
  font-size: 0.9em;
}
</style>
