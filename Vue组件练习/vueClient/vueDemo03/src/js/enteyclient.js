
import Vue from "vue";
import VueRouter  from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

// var vm = new Vue({
//     el: "#app",
//     data: {
//     },
//     methods: {

//     },
//     components: {
//         myhead : {
//             template : "#myhead"
//         },
//         myleft : {
//             template : "#myleft",
//             components : {
//                 template : {
//                     mylefttop :"#myleftTop",
//                     myleftbottom : "#myleftbottom"
//                 },
//             }
//         },
//         myright : {
//             template : "#myright"
//         }
//     }
// });

// var vm2=new Vue({
//     el : "#app2",
//     data : {
//         currentTab : "myindex"
//     },
//     methods:{
//         changeCom:function(e){
//             let cur = e.target.getAttribute("href").substring(1);
//             this.currentTab = cur;
//         }
//     },
//     components:{
//         myindex : {
//             template:"#myindex"
//         },
//         mylist : {
//             template : "#mylist"
//         },
//         myabout : {
//             template : "#myabout"
//         }
//     }
// });

const myindex = {template : "#myindex"};
const mylist = {
    template : "#mylist",
    data(){
        return {
            fid : 0,
            bookkindlist : []
        };
    },
    watch : {
        "$route.query.fid":function(){
            this.fid = this.$route.query.fid;
            console.log(this.fid);
            this.getBookKinds();
        }
    }, 
    methods : {
        getBookKinds:function(){
            axios.get("http://luoyi:8000/user/getbookkinds",{params : { fid : this.$route.query.fid }})
                .then( (response)=>{
                    this.bookkindlist=response.data;
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    },   
    created(){
        this.fid = this.$route.query.fid;
        this.getBookKinds();
        console.log(this.fid);
    }

};
const myabout = {
    template : "#myabout",
    // data(){
    //     return{
    //         aid:null
    //     };
    // },
    // watch:{
    //     "$route.params.aid":function(){
    //         this.aid = this.$route.params.aid;
    //         console.log(this.aid);
    //     }
    // }
};

const router = new VueRouter({
    routes : [
        {path : "/" , component : myindex},
        {path : "/list" , component : mylist},
        {path : "/about/:aid" , component : myabout}
    ]
});

// ---------------------
// const app3=new Vue({
//     router : router
// }).$mount("#app3");

var  vm3=new Vue({
    el : "#app3",
    data : {
        fid : null
    },
    methods : {

    },
    router : router
});
