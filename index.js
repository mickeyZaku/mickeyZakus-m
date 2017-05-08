/**
 * Created by 40681 on 2017/5/5.
 */
//轮播图组件
let slider = {
    template: '#slider',
    props: {
        datas: {type: Array, required: true},
        delay: {type: Number}
    },
    data(){
        return {index: 0, timer: null, show: true}
    },
    computed: {
        prev(){
            if (this.index === 0) {
                return this.datas.length - 1;
            } else {
                return this.index - 1;
            }
        },
        next(){
            if (this.index === this.datas.length - 1) {
                return 0;
            } else {
                return this.index + 1;
            }
        }
    },
    mounted(){
        this.autoplay();
    },
    methods: {
        go(index){
            this.show = true;
            setTimeout(() => {
                this.index = index;
                this.show = false;
            }, 100);
            // this.index = index;
        },
        clear(){
            clearInterval(this.timer);
        },
        autoplay(){
            this.timer = setInterval(() => {
                this.go(this.next);
            }, this.delay);
        }
    }
};
//首页
let home = {
    template: '#home',
    components: {
        slider
    },
    data(){
        return {
            images: [{path: 'img/1.jpg', title: '1.jpg'}, {path: 'img/2.jpg', title: '2.jpg'}, {
                path: 'img/3.jpg',
                title: '3.jpg'
            }]
        }
    },
};
//个人信息
let profile = {
    template: '#profile',
};
let info = {
    template: '<div>o(=•ェ•=)m</div>'
};
let about = {
    template: '<div>喵~~</div>'
};
//登录
let login = {
    template: '#login',
    data(){
        return {username:'',pwd:''};
    },
    methods:{
      login(){
            localStorage.setItem('login','true');
            this.$emit('check');
            this.$router.push('/home');
      }
    },
    computed:{
        userinfo(){
            return this.username.length>3&&this.username.length<6;
        }
    }
};
//todoList
let toDoList = {
    template: '#toDoList',
    computed: {
        count(){
            return this.todos.filter((item) => !item.isChecked).length;
        }
    },
    methods: {
        addTodo(){
            this.todos.push({title: this.temTodo, isChecked: false});
            this.temTodo = '';
        },
    },
    data(){
        return {
            todos: [
                {
                    title: '喂o(=•ェ•=)m',
                    isChecked: true
                },
                {
                    title: '浇花',
                    isChecked: false
                }
            ],
            temTodo: '',
        }
    },
    mounted(){
        this.todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    }
};
let all = {
        template: '#all',
        props: {
            todos: {required: true}
        },
        data(){
            return {
                curTodo: '',
                origin: ''
            }
        },
        directives: {
            autoFocus(ele, bindings){
                if (bindings.value) {
                    ele.focus();
                }
            }
        },
        methods: {
            removeTodo(index){
                this.todos.splice(index, 1);
            },
            updateTitle(item){
                this.curTodo = item;
            },
            reset(){
                this.curTodo = '';
            },
            originDate(item){
                this.origin = item.title;
            },
            toOrigin(item){
                item.title = this.origin;
            }
        },
        watch: {
            todos: {
                handler(){
                    window.localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
    };
let unfinished = {
    template: '#unfinished',
    props: {
        todos: {required: true}
    },
    computed:{
        unTodos(){
            return this.todos.filter((item)=>!item.isChecked);
        }
    },
    data(){
        return {
            curTodo: '',
            origin: ''
        }
    },
    directives: {
        autoFocus(ele, bindings){
            if (bindings.value) {
                ele.focus();
            }
        }
    },
    methods: {
        removeTodo(index){
            this.todos.splice(index, 1);
        },
        updateTitle(item){
            this.curTodo = item;
        },
        reset(){
            this.curTodo = '';
        },
        originDate(item){
            this.origin = item.title;
        },
        toOrigin(item){
            item.title = this.origin;
        }
    },
    watch: {
        todos: {
            handler(){
                window.localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            deep: true
        }
    },
};
let finished = {
    template: '#unfinished',
    props: {
        todos: {required: true}
    },
    computed:{
        unTodos(){
            return this.todos.filter((item)=>item.isChecked);
        }
    },
    data(){
        return {
            curTodo: '',
            origin: ''
        }
    },
    directives: {
        autoFocus(ele, bindings){
            if (bindings.value) {
                ele.focus();
            }
        }
    },
    methods: {
        removeTodo(index){
            this.todos.splice(index, 1);
        },
        updateTitle(item){
            this.curTodo = item;
        },
        reset(){
            this.curTodo = '';
        },
        originDate(item){
            this.origin = item.title;
        },
        toOrigin(item){
            item.title = this.origin;
        }
    },
    watch: {
        todos: {
            handler(){
                window.localStorage.setItem('todos', JSON.stringify(this.todos));
            },
            deep: true
        }
    },
};
/**
 *
 *路由列表
 */
let routes = [
    {path: '/home', component: home},
    {path: '/', component: home},
    {
        path: '/profile',
        component: profile,
        children: [
            {path: '/', component: info},
            {path: 'info', component: info},
            {path: 'about', component: about}
        ],
        meta:{needLogin:true}//需要登录才能查看
    },
    {path: '/login', component: login},
    {path: '/todoList', component: toDoList, children: [{path: 'all', component: all}, {path: 'unfinished', component: unfinished}, {path: 'finished', component: finished}, {path: '/', component: all}]},
    {path: '/*', component: home},
];
/**
 * 路由
 * @type {VueRouter}
 */
let router = new VueRouter({
    routes
});
router.beforeEach((to,from ,next)=>{
    //路由上有一个属性，此属性叫matched 默认时数组类型
//        to.matched有一个叫meta.needLogin说明需要验证
    let flag = to.matched.some(item=>item.meta.needLogin);
    if (flag) {
        if (Boolean(localStorage.getItem('login'))) {
            next();
        }else{
            next({path:'/login'});
        }
    }else{
        next();
    }
});
/**
 * 根组件
 */
let vue = new Vue({
    el: '#app',
    router,
    data:{login:false},
    methods:{
        checkLogin(){
            this.login = localStorage.getItem('login')||false;
        },
        logout(){
            this.login = false;
            this.$router.push('/home');
            localStorage.removeItem('login');
        }
    }
});