;(function(){
    /*
     store.set('user', { name:'Marcus' });
     store.set("gg",12312);
     store.clearAll()*/

    /*var arr=[1,23,4,5];
     store.set("gg", arr);
     store.clearAll()*/

    var task_list=[];  //任务列表
    var $add_task=$(".add-task");  //提交
    init();  //初始化


    $add_task.on("submit",function(ev){
        ev.preventDefault(); //阻止默认事件
        //console.log(1)
        var obj={};
        obj.content=$add_task.find("input").eq(0).val();

        if (!obj.content) return;
        //console.log(obj)

        add_task(obj);
        createHtml(); //生成thml
        $add_task.find("input").eq(0).val(null);  //清空
    });

//
    function  init() {
        task_list=store.get("gg") || [];
        createHtml(); //生成thml
    }

//把对像push数组里面
    function add_task(obj) {
        task_list.push(obj);
        //console.log(task_list)
        //把数据存到浏览器
        store.set("gg",task_list);
    }


//1.创建一个对像  push数组里面
//2.把数据存到浏览器
//3.把数据取出来

//生成hmtl
    function createHtml() {
        var $task_list=$(".task-list");
        $task_list.html(null); //清空
        for(var i=0; i<task_list.length; i++){
            var $item=bindHtml(task_list[i],i);
            $task_list.append($item);
        }
        bindDelete();  //删除任务列表
        task_list_detail();  //详细
    }

//绑定html
    function bindHtml(data,index){
        var str='<li data-index="'+index+'">'+
            '<input type="checkbox" class="complate">'+
            '<p class="content">'+data.content+'</p>'+
            '<div class="right">'+
            '<span class="delete r-main">删除</span>'+
            '<span class="detail r-main">详细</span>'+
            '</div>'+
            '</li>';
        return str;
    }


    /*------------------------------删除-------------------------------------*/
//点击事件
    function bindDelete(){
        $(".delete.r-main").click(function(){
            //获取index
            var index = $(this).parent().parent().data("index");

            remove_task_list(index);
        });
    };
//删除功能
    function remove_task_list(index){
        var off = confirm("你确定要删除么");
        if(!off) return;
        task_list.splice(index,1);
        refresh_task_list(); //更新
    }
//更新 本地存储
    function refresh_task_list(){
        store.set("gg",task_list);
        createHtml(); //更新列表
    }
    /*------------------------------删除 end-------------------------------------*/


    /*------------------------------生成详细 start-------------------------------------*/
    //1.点击 后  获取 index
    function task_list_detail() {
        $(".detail.r-main").click(function () {
            var index = $(this).parent().parent().data("index");
            add_detail_html(task_list[index],index);
        });
    };
    //2.生成弹框
    function add_detail_html(data,index){
        var str='<div class="task-detail-mask"></div>'+
            '<div class="task-detail">'+
            '<form class="up-task">'+
            '<h2 class="content">'+(data.content || "")+'</h2>'+
            '<div class="input-item">'+
            '<input type="text" class="db-content">'+
            '</div>'+
            '<div class="input-item">'+
            '<textarea class="taile">'+(data.tatil || "")+'</textarea>'+
            '</div>'+
            '<div class="remind input-item">'+
            '<label for="b">提醒时间</label>'+
            '<input id="b" class="datetime" type="date" value="'+data.datetime+'">'+
            '</div>'+
            '<div class="input-item">'+
            '<button class="ut-data">更新</button>'+
            '</div>'+
            '<div class="colse">X</div>'+
            '</form>'+
            '</div>';

        $(".container").append(str);
        remove_detail(); //删除弹框

        up_task(index); //提交详细任务
        dbclick_detail(); //双击
    }
    //3.删除弹框  removechild()
    function remove_detail(){
        $(".task-detail-mask,.colse").click(function () {
            $(".task-detail-mask,.task-detail").remove();
        })
    }
    /*------------------------------详细 end-------------------------------------*/


    /*详细提交*/
    /*//1.task_list[
     {content:1,datail:"好好学习",time:"2017/08/09 11:23"},
     {content:1},
     {content:1}
     ]*/

    //1.点击更新  获取index
    //2.新建一个对像  newobj={};
    //newobj.content=标题
    //newobj.dateil=input.val();
    //newobj.time=input.val();

    //task_list[index] = newobj

    //不行
    //$.extend();

    function up_task(index){
        $(".up-task").on("submit",function (ev) {
            ev.preventDefault();
            // console.log(index)
            //新建一个对像  newobj={};
            var newobj={};
            newobj.content=$(this).find(".content").text();
            newobj.tatil=$(this).find(".taile").val();
            newobj.datetime=$(this).find(".datetime").val();

            //console.log(newobj)
            //task_list[index] = newobj
            //console.log(task_list);
            up_data(newobj,index);//更新详细数据
            $(".task-detail-mask,.task-detail").remove(); //删除详细框
            createHtml(); //更新html
        })
    }
    //双击事件
    function dbclick_detail(){
        $(".up-task .content").dblclick(function () {
            var $that=$(this); //文字
            var $inputVal=$(".container .up-task .db-content"); //输入框
            $that.hide();
            $inputVal.show();

            $inputVal.focus();
            $inputVal.on("blur",function(){
                $that.show();
                $inputVal.hide();
                if (!$inputVal.val()) return;
                $that.text($inputVal.val());

            })
       })
    }

    //更新详细数据
    function up_data(newobj,index){
       	task_list[index] = newobj;

        //task_list[index] = $.extend({},task_list[index],newobj);
        store.set("gg",task_list);
        add_detail_html(task_list[index],index);
    }
	
	
	
	function start(complated){
		if(task_list[index].complated){
			up_data({complated:true},index)
		}
		else{
			up_data({complated:false},index)
		}
	}
}());

