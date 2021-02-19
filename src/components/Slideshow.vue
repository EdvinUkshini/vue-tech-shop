<template>
      <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="240"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Desktops"
            
            :img-src="require(`../assets/images/1.jpg`)"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Ryzen"
            
            :img-src="require(`../assets/images/2.png`)"
      ></b-carousel-slide>

      <b-carousel-slide
        caption="Intel technologies"
            
            :img-src="require(`../assets/images/3.jpg`)"
      ></b-carousel-slide>
    </b-carousel>

  </div>
</template>
<style>
.carousel-inner > .item > img {
  height:360px !important;
 }
 .img-fluid {
    height:360px !important;
}
</style>
<script>
export default {
  data() {
      return {
        slide: 0,
      }
    },
}
</script>