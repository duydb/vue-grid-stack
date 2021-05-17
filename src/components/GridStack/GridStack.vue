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
.grid-stack-item {
  padding: 0;
}
.grid-stack-item-content {
  border: 1px solid #18bc9c;
  background-color: rgba(24, 188, 156, .5);
  text-align: center;
  padding-top: 2px;
}
.grid-stack-temps {
  display: none;
}
</style>
