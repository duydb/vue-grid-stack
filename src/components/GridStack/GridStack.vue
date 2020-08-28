<template>
  <div class="grid-stack-container">
    <div ref="temps" class="grid-stack-temps">
      <slot></slot>
    </div>
    <div ref="gs" class="grid-stack"></div>
  </div>
</template>
<script src="./GridStack.ctrl.js"></script>
<style type="text/css">
.grid-stack {
  background: #fafad2;
  min-height: 400px;
}
.grid-stack-item-content {
  background-color: #18bc9c;
  text-align: center;
  padding-top: 2px;
}
.grid-stack-temps {
  display: none;
}
</style>
