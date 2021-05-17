<template>
  <div id="app">
    <div>
    <button @click.prevent="addItem">add item</button>
    </div>
    <div style="margin: 10px 0">
      <strong>Overlapping</strong>
      <label>
        <input v-model="allowOverlap" type="radio" :value="true">
        YES
      </label>
      <label>
        <input v-model="allowOverlap" type="radio" :value="false">
        NO
      </label>
    </div>
    <GridStack ref="grid" :options="{allowOverlap: allowOverlap, float: true}">
      <GridStackItem v-for="item in items" :key="item.id" :x.sync="item.x" :y.sync="item.y" :width.sync="item.width" :height.sync="item.height">
        <template slot-scope="{remove}">
          {{item.name}}
          <div>
            <a @click.prevent="remove(() => removeItem(item))" href="#">remove</a>
          </div>
        </template>
      </GridStackItem>
    </GridStack>
    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>X</th>
        <th>Y</th>
        <th>Width</th>
        <th>Height</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.x}}</td>
        <td>{{item.y}}</td>
        <td>{{item.width}}</td>
        <td>{{item.height}}</td>
      </tr>
    </table>
  </div>
</template>
<style>
  table {
    border-collapse: collapse;
  }
  table th,td {
    border: 1px solid #333;
    padding: 4px 8px;
  }
</style>

<script>
import GridStack from './components/GridStack/GridStack.vue'
import GridStackItem from './components/GridStack/GridStackItem.vue'

export default {
  name: 'App',
  components: {
    GridStack,
    GridStackItem
  },
  data () {
    return {
      items: [],
      count: 1,
      allowOverlap: true
    }
  },
  mounted () {
    this.items = 
    [
      {id: 1, name:	'Item 1', x: 0, y: 0, width: 3, height:	2},
      {id: 2, name:	'Item 2', x: 2, y: 0, width: 2, height:	1},
      {id: 3, name:	'Item 3', x: 4, y: 0, width: 2, height:	1},
      {id: 4, name:	'Item 4', x: 6, y: 0, width: 2, height:	1},
      {id: 5, name:	'Item 5', x: 8, y: 0, width: 2, height:	1},
      {id: 6, name:	'Item 6', x: 10, y: 0, width: 2, height:	1}
    ]
    this.count = 7
    // for (let i = 1; i <= 5; i++) this.addItem()
  },
  methods: {
    addItem () {
      this.items.push({ id: this.count, name: `Item ${this.count}`, x: 0, y: 0, width: 2, height: 1 })
      this.count += 1
    },
    removeItem (item) {
      this.items = this.items.filter(i => i !== item)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
