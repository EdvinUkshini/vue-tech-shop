<template>
<nav>
<div id="logo">TechShop</div>
<ul>
<div class="table">
  <li><router-link to="/">Home</router-link></li>
  <li><router-link to="/Computers">Computers</router-link></li>
  <li><router-link to="/Laptops">Laptops</router-link></li>
  <li class="dropdown">
    <label for="toggle-dropdown" class="submenu">Parts +</label>
	<input type="checkbox" id="toggle-dropdown" />
    <div class="dropdown-content">
      <router-link to="/Cpu">CPU</router-link>
      <router-link to="/Ram">RAM</router-link>
      <router-link to="/Gpu">Graphic Card</router-link>
	  <router-link to="/Storage">Storage Device</router-link>
    </div>
  </li>
  <li><router-link to="/Peripherals">Peripherals</router-link></li>
  </div>
</ul>
</nav>
</template>
<script>
export default {
  name: 'Navbar',
  components: {
  }
}
</script>
<style scoped>
.v-application a {
color:#fff;
}
</style>