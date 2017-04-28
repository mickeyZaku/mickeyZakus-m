var vm = new Vue({
    el: '#app',
    data: {
        todos: [{title: '喂o(=•ェ•=)m', isChecked: true}, {title: '浇花', isChecked: false}, {
            title: '学习',
            isChecked: false
        }],
        temTodo: '',
        state: '',
        curTodo:'',
        saveDate:''
    },
    methods: {
        remove(index){
            this.todos.splice(index, 1);
        },
        addTodo(){
            this.todos.push({title: this.temTodo, isChecked: false});
            this.temTodo = '';
        },
        changTitle(item){
            this.curTodo = item;
        },
        reset(){
            this.curTodo='';
        },
        originData(item){
            this.saveDate = item.title;
        },
        toOrigin(item){
            item.title = this.saveDate;
        }
    },
    directives:{
      autoFocus(ele,bindings){
          if (bindings.value) {
              ele.focus();
          }
      }
    },
    computed: {
        count(){
            return this.todos.filter(function (item) {
                return !item.isChecked;
            }).length;
        },
        cloneTodos(){
            if (this.state === 'all') {
                return this.todos;
            }
            if (this.state === 'finished') {
                return this.todos.filter(function (item) {
                    return item.isChecked;
                });
            }
            if(this.state==='unfinished'){
                return this.todos.filter(function (item) {
                    return !item.isChecked;
                });
            }
        }
    },
    watch: {
        todos: {
            handler(){
                window.localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            deep: true
        },

    },
    mounted(){
        this.todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    }
});
let listener = function () {
    vm.state = location.hash.slice(1) || 'all';
    console.log(vm.state);
};
listener();
window.addEventListener('hashchange', listener);