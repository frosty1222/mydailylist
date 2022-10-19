<template>
  <div class="container">
     <div class="row">
       <div class="col text-center">
         <button type="button" class="btn btn-success"><a href="/todo">Create ToDo</a></button>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .btn-success{
   border:none;
   border-radius:5px;
   width:200px;
   color:#fff;
 }
 .btn-success:hover{
   background-color:aqua;
   color:#fff;
 }
 .btn-success a{
   text-decoration:none;
   color:#fff;
 }
</style>
