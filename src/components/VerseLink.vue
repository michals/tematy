<template>
    <span>
      <a href="#"><i class="bi bi-x-circle"></i></a>
      <a href="#"><i class="bi bi-question-circle"></i></a>
      <a href="#"><i class="bi bi-check-circle"></i></a>
    </span>
    <span>&nbsp;&nbsp;</span>
    <a class="verse" :href="link()"> {{ verse }} </a>
</template>

<script>
export default {
  name: 'VerseLink',
  props: {
    verse: String,
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
      const match = this.verse.match(/(\w+) (\d+)(?:,(\d+))?/);
      return (match) ? {
        book: this.fixBook(match[1]),
        chapter: parseInt(match[2], 10),
        firstVerse: match[3] ? parseInt(match[3], 10) : 0,
      } : null;
    },
    link() {
      const baseUrl = 'https://www.biblia.pl/otworz.php?skrot=';
      const { book, chapter, firstVerse } = this.parseVerse(this.verse);
      const skrot = `${book} ${chapter}${(firstVerse !== 0) ? `,${firstVerse}` : ''}`;
      const encodedVerse = encodeURIComponent(skrot);
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
