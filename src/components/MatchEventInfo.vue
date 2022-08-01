<template>
  <div class="match-event-preview">
    <MatchEventLogo :event-type="event.type"></MatchEventLogo>
    <p>
    {{ event.description }}
    </p>
    <p>
    ({{ event.minute }})
    </p>
  </div>
</template>

<script>
import MatchEventLogo from "./MatchEventLogo";

export default {
  components: {
    MatchEventLogo,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.match-event-preview{
  display: flex;
  justify-content: space-between;
  list-style-type: none; 

}
</style>