<template>
      
    <!-- <div class="row1 panel panel-info margin"> -->
      <div class="row1 panel" :class="{margin: margin}">
      <div class="panel-heading">
          <h3>{{ title }}</h3>
        </div>
      <div class="panel-body">
          <p>{{ data }}</p>
      </div>
    </div>
</template>

<script>
export default {
  props: ["data", "title", "margin"]
};
</script>