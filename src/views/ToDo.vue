<template>
<div class="todo">
    <div class="app-container">
        <h1>Vue Todo List</h1>
            <div class="add-task">
                <div class="add-task2">
                <input type="text" placeholder="add new task..." class="task-input task-role" v-model="newtask.name" @keyup.enter="getPost">
                <input type="text" placeholder="add new time..." class="task-input time" v-model="newtask.time" @keyup.enter="getPost">
                </div>
                <input type="submit" class="submit-task" title="Add Task" value="" @click="getPost">
            </div>
            <ul class="task-list">
                <li class="task-list-item" v-for="task in tasks" :key="task.index">
                    <label class="task-list-item-label">
                        <input type="checkbox">
                        <span>{{task.name}}-at-{{task.time}}</span>
                        <span class="delete-btn" title="Delete Task" @click="delItem(task.id)">{{task.del}}</span>
                        <span class="edit-btn" title="Edit Task" @click="getId(task.id)">{{task.del}}</span>
                    </label>
               </li>
               <form action="#"  v-for="i in idTask" :key="i.index">
                    <legend>Edit Task</legend>
                    <input type="text" name="name" v-model="i.name">
                    <input type="text" name="time" v-model="i.time">
                    <button id="button-edit" @click="editTask(i.id,i.name,i.time)">Save</button>
               </form>
        </ul>
    </div>
</div>
    
</template>
<script>
import jQuery from "jquery";
import axios from "axios";
const $ = jQuery;
window.$ = $;
export default {
    data:function(){
        return{
            title:'to do list',
            tasks:[],
            newtask:{name:'',time:''},
            idTask:[],
        }
    },
    methods:{
         getItem(){
             axios.get('http://localhost:3000/tasks')
             .then(response => (this.tasks = response.data));
            //  console.log(this.tasks);
         },
         getPost(){
            if(this.newtask.name =="" | this.newtask.time == "" ){
                alert('please write a task name and time can not be null');
            }else{
               axios.post('http://localhost:3000/tasks',this.newtask)
             .then(
                response =>{
                    if(response.data == null){
                        alert("No data");
                    }else{
                       (this.tasks = response.data)
                    }
                    this.getItem();
                } 
             ); 
            }
         },
         getId(id){
               axios.get('http://localhost:3000/tasks?id='+id).then(response=>{
                  this.idTask = response.data
                  console.log(this.idTask);
               }).catch(err=>{
                console.log(err)
               });
         },
         editTask(id,name,time){
                  axios.put('http://localhost:3000/tasks/'+id,{
                       name:name,
                       time:time
                  }).then(response=>{
                    console.log(response)
                  }).catch(err=>{
                console.log(err)})
         },
        delItem:function(id) {
         axios.delete('http://localhost:3000/tasks/'+id)
        .then(response => {
         this.tasks.splice(id, 1);
         this.tasks= response.data;
         this.getItem();
        });
        }
    },
    created(){
    this.getItem();
    }
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap");
*{
    box-sizing:border-box;
}
:root{
    --checkbox-color:rgb(202,60,60);
    --checkbox-shadow:rgba(238,156,167,0.2);
    --add-button:rgba(255,255,255,0.7);
    --add-button-shadow:rgba(238,156,167,0.4);
}
.todo{
       width:100%;
       height:100vh;
       margin:0;
       padding:15px;
       display:flex;
       justify-content: center;
       align-items:center;
       background-image:
       linear-gradient(62deg,rgba(7,86,160,0.973),rgba(255,122,151,0.5)4%),
       linear-gradient(44deg,rgba(0,43,99,0.079),rgba(242,140,143,0.5)18%),
       linear-gradient(118deg,rgba(84,202,242,0.031),rgba(247,155,187,0.5)54%),
       linear-gradient(58deg,rgba(7,86,160,0.161),rgba(249,156,142,0.5)23%);
       background-blend-mode:normal,lighten,multiply,hard-light;
       font-family: "DM Sans",sans-serif;
}
input{
    outline:none;
}
ul{
    list-style:none;
    padding:0;
}
#button-edit{
    background-color:greenyellow;
    width:50px;
    height: 30px;
    border-radius:10px;
}
.todo .app-container{
    max-width: 480px;
    width:100%;
    max-height:100%;
    background-color:rgba(255,255,255,0.3);
    padding:25px;
    border-radius: 25px;
    overflow:auto;
    color:#222;
}
.submit-task{
    width:32px;
    height:32px;
    flex-shrink:0;
    background:var(--add-button);
    color:#272727;
    background-image:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMKiFt0PZuefweM3W216eLw8MnRIZf-wzdg&usqp=CAU');
    background-size:38px;
    background-position:center;
    background-repeat: no-repeat;
    border-radius:50%;
    cursor:pointer;
    box-shadow: 0 0 12px 0 var(--add-button-shadow);
}
.todo .container .row .add-task{
    height:40px;
    font-size: 14px;
    display:flex;
}
.add-task .task-input{
    width:40%;
    padding:0 5px;
    outline:none;
    border:none;
    border-bottom:1px solid #272727;
    background-color:transparent;
    margin-right:0px;
    color:#272727;
    box-shadow:none;
    border-radius:0;
}
.task-input.time{
    width:40%;
    padding:0 5px;
    outline:none;
    border:none;
    border-bottom:1px solid #272727;
    background-color:transparent;
    margin-left:80px;
    color:#272727;
    box-shadow:none;
    border-radius:0;
}
.add-task2{
    display: flex;
    width:100%;
}
.task-input::placeholder{
    color:#272727;
}
.task-list .task-list-item{
    background-color:rgba(255,255,255,0.7);
    display:flex;
    align-items:center;
    padding:8px;
    border-radius:35px;
    margin-bottom:12px;
}
.task-list-item input{
    width:16px;
    height:16px;
    border:1px solid #272727;
    border-radius:50%;
    background-image: url('https://media.istockphoto.com/vectors/checkmark-icon-check-mark-vector-isolated-illustration-vector-id1205148147?k=20&m=1205148147&s=612x612&w=0&h=6WoITHTxFwIBVnfODxsh7wAzU3-AZFkg0YZ5U_8COqw=');
    background-repeat: no-repeat;
    background-position:center;
    background-size:0;
    transition:0.2s;
    margin-right:8px;
    flex-shrink:0;
    margin-top:4px;
    appearance:none;
}
.task-list-item input:hover{
    border-color:var(--checkbox-color);
    border:1px solid var(--checkbox-color);
    background-color: var(--checkbox-color);
    appearance:push-button;
}
.task-list-item input:checked + span{
    color:#272727;
    text-decoration: line-through #272727;
}
.task-list-item-label{
    display:flex;
    align-items:flex-start;
    color:#272727;
    margin-right:8px;
    font-size: 14px;
    line-height:24px;
    position:relative;
    transition:0.2s;
    cursor:pointer;
}
.delete-btn{
    margin-left: auto;
    margin-right: 5px;
    display:block;
    margin-top:5px;
    width:16px;
    height:16px;
    background-image:url('https://w1.pngwing.com/pngs/431/160/png-transparent-icon-design-trash-red-line-area-material-rectangle-thumbnail.png');
    background-repeat:no-repeat;
    background-size:16px;
    background-position:center;
    cursor:pointer;
}
.edit-btn{
    margin-left: auto;
    margin-right: 5px;
    display:block;
    margin-top:5px;
    width:16px;
    height:16px;
    background-image:url("../../public/images/edit.png");
    background-repeat:no-repeat;
    background-size:16px;
    background-position:center;
    cursor:pointer;
}
</style>