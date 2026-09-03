<template>
  <span>
    <multi-icon v-if="!noicon" :selected="0"
      :options="['bi-circle', 'bi-dash-circle-dotted', 'bi-check-circle-fill']" />
    <a class="verse" :href="link()" target="_blank"> {{ verse.replaceAll('.', '&thinsp;.') }} </a>
  </span>
</template>

<script>
import MultiIcon from './MultiIcon.vue';

export default {
  components: { MultiIcon },
  name: 'VerseLink',
  props: {
    verse: String,
    noicon: Boolean,
  },
  methods: {
    fixBook(verse) {
      // "1Kor xyz" -> "1 Kor xyz"
      if (/^\d/.test(verse)) {
        return `${verse[0]} ${verse.slice(1)}`;
      }
      return verse;
    },
    parseVerse() {
      // simple verse parse
      // console.log('parseVerse', this.verse);
      const match = this.verse.match(/([^ ]+) (\d+)(?:,(\d+))?/);
      return (match) ? {
        book: this.fixBook(match[1]),
        chapter: parseInt(match[2], 10),
        firstVerse: match[3] ? parseInt(match[3], 10) : 0,
      } : null;
    },
    link() {
      const baseUrl = 'https://biblia.deon.pl/otworz.php?skrot=';
      const { book, chapter, firstVerse } = this.parseVerse(this.verse);
      const skrot = `${book} ${chapter}${(firstVerse !== 0) ? `,${firstVerse}` : ''}`;
      // Legacy biblia.deon.pl PHP script expects ISO-8859-2 encoding:
      const encodedVerse = encodeURIComponent(skrot)
        .replace(/%C5%81/g, '%A3') /* in case of Łk */
        .replace(/%C5%82/g, '%B3'); /* in case of Kpł */
      return `${baseUrl}${encodedVerse}`;
    },
  },
};
</script>

<style scoped>
.verse {
  text-decoration: none;
}
</style>
