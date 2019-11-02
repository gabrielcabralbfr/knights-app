<template>
  <div class="home">
    <h1>Lista</h1>
    <KnightsList v-bind:knights="lista" msg="Welcome to Your List" />
  </div>
</template>

<script>


// @ is an alias to /src
import KnightsList from '@/components/KnightList.vue'

export default {
  name: 'knightlist',
  components: {
    KnightsList
  },
  data: function lista(){
      return {
          lista: [{id: 1, name: 'Gabriel'}, {id: 2, name: 'Gabriel 2'}]}
}}
// this. lista =  [{id: 1, name: 'Gabriel'}]
</script>
