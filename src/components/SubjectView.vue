<template>
  <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title clearfix">
        <span class="float-start">{{ title }}</span>
        <span class="float-end">
          <select class=" dropdown-toggle">
            <option>Wszscy</option>
            <option>Osoba 1</option>
            <option>Osoba 2</option>
            <option>Osoba 3</option>
            <option>Osoba 4</option>
            <option>Osoba 5</option>
          </select>
        </span>
      </h5>

      <div class="accordion" id="versesAccordion">
        <VerseList :verses="subject.hd" sectionid="hd" open="show" title="Historyczne" />
        <VerseList :verses="subject.p" sectionid="p" title="Prorockie" />
        <VerseList :verses="subject.n" sectionid="n" title="Pozaewangeliczne" />
        <VerseList :verses="subject.e" sectionid="e" title="Ewangelie" />
      </div>
    </div>
  </div>
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
    title: String,
  },
};
</script>
<style scoped>
ul.verse-list {
  display: block;
}
</style>
