<template>
  <table>
    <tr>
      <td><VerseList :verses="subject.hd"/></td>
      <td><VerseList :verses="subject.p"/></td>
      <td><VerseList :verses="subject.e"/></td>
      <td><VerseList :verses="subject.n"/></td>
    </tr>
  </table>
</template>

<script>
import VerseList from './VerseList.vue';

export default {
  name: 'SubjectView',
  components: {
    VerseList,
  },
  props: {
    subject: Object,
  },
};
</script>
<style scoped>
  ul.verse-list {
    display: block;
  }
</style>
