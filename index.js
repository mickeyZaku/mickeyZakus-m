/**
 * Created by 40681 on 2017/4/27.
 */
var vm = new Vue({
    el:'#app',
    data:{
        todos:[{title:'喂o(=•ェ•=)m',isChecked:true},{title:'浇花',isChecked:false},{title:'学习',isChecked:false}],
        temDo:'',
        curTodo:'',
        state:''
    },
    methods:{
        remove(index){
            this.todos.splice(index,1);
        },
        addToDo(){
            this.todos.push({title:this.temDo,isChecked:false});
            this.temDo = '';
        },
        changeTitle(todo){
          this.curTodo = todo;
        },
        reset(){
            this.curTodo = '';
        }
    },
    watch:{
      todos:{
          handler(){
              console.log(this.todos);
              localStorage.setItem('todos',JSON.stringify(this.todos))
          },
          deep:true
      }
    },
    directives:{
      autoFocus(ele,bindings){
          if (bindings.value) {
              ele.focus();
          }
      }
    },
    computed:{
        cloneTodo(){
            if (this.state === 'all') {
                return this.todos;
            }
            if (this.state === 'finished') {
                return this.todos.filter(function (item) {
                    return item.isChecked;
                })
            }
            return this.todos.filter(function (item) {
                    return !item.isChecked;
            })
        },
        count:{
           get(){
                return this.todos.filter(function (item) {
                    return !item.isChecked;
                }).length;
            }
        }
    },
    mounted(){
        this.todos = JSON.parse(localStorage.getItem('todos'))|| [];
    }
});
var listener = function () {
    vm.state = window.location.hash.slice(1) || 'all';
};
listener();
window.addEventListener('hashchange',listener,false);