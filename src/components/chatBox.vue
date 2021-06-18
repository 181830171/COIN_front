<template>
    <div class="chat-wrapper">
        <div id="btn_open" class="chat-support-btn" draggable="true"><!-- 聊天窗口缩小后的头像图标 -->
            <img src='../assets/server2.png'>
        </div>
        <div class="chat-main" draggable="true">
            <div class="chat-header">
                <div class="chat-service-info">
<!--                    <a class="chat-service-img"></a>-->
                    <img class='chat-service-img' src="../assets/server.png">
                    <div class="chat-service-title">
                        <p class="chat-service-name">图谱小助手</p>
                        <p class="chat-service-detail">欢迎向我提问</p>
                    </div>
                </div>
                <i id="btn_close" class="chat-close">×</i>
            </div>
            <div id="chat_contain" class="chat-contain">
            </div>
            <div class="chat-submit">
                <p id='chatHint' class="chat-hint"><span class="chat-hint-icon">!</span><span class="chat-hint-text">发送内容不能为空</span></p>
                <textarea id="chat_input" @keydown="isEnter(chatInput,chatHintNull,'you',$event)" @keyup="handleEmptyEnter($event)" class="chat-input-text" autofocus placeholder="请输入您想对我说的话，按Enter键发送（shift+Enter换行）。"></textarea>
                <div class="chat-input-tools">
                    <button class="chat-input-button buttons" @click="handleInputButtomClick">发送</button>
                    <button class="chat-close-button buttons">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapActions,mapGetters} from "vuex"
    export default {
        name: "chatBox",
        data(){
            return {
                d:{},
                serviceData:{
                    'robot':{
                        'chat': ['Google一下吗？www.google.com','这个网站您看一下www.baidu.com', '稍等哦~','嘿嘿','百度一下？www.baidu.com','嗯嗯嗯'],
                    }
                },
                chatHint:{},
                chat_main:{},
                chatInput:{},
                chatContain:{},
                btnOpen:{},
                btnClose:{},
                timer:{},
                timerId:0,
                shiftDown:false
            }
        },
        methods:{
            ...mapGetters([
                "questionAnswer"
            ]),
            ...mapActions([
                "getAnswer"
            ]),
            openBody(){
                $('.chat-support-btn').css({'display': 'none'});
                $('.chat-main').css({'display': 'inline-block', 'height': '0'});
                $('.chat-main').animate({'height': '600px'})
            },
            chatDrag(target){
                var offsetX;
                var offsetY;
                target.ondragstart=function(e)
                {
                    e=e||window.event;
                    e.dataTransfer.clearData();
                    offsetX= e.offsetX;
                    offsetY= e.offsetY;
                }
                target.ondrag=function(e)
                {
                    e=e||window.event;
                    var x= e.pageX;
                    var y= e.pageY;
                    if(x==0 && y==0){
                        return; //不处理拖动最后一刻X和Y都为0的情形
                    }
                    x-=offsetX;
                    y-=offsetY;
                    target.style.left=x+'px';
                    target.style.top=y+'px';
                }
            },
            closeChat(){
                $('.chat-main').animate({'height': '0'});
                $('.chat-main').css({'display': 'none'});
                $('.chat-support-btn').css({'display': 'inline-block'});
            },
            createInfo(name,value)
            {
                var chatTime=new Date();
                chatTime=chatTime.toLocaleTimeString();
                var nodeP = this.d.createElement('p'),
                    nodeSpan = this.d.createElement('span')
                var nodeTime=this.d.createElement('p');
                value=value.replace(/(((ht|f)tps?):\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g,function(content){
                    return "<a href='http://"+content+"' class='chat-address' target='view_window' style='color:#6666cc '>"+content+'</a>';;
                });
                nodeP.classList.add('chat-'+name+'-contain');
                nodeSpan.classList.add('chat-'+name+'-text','chat-text');
                nodeTime.classList.add('chat-time');
                nodeSpan.innerHTML =value;
                nodeTime.innerHTML=chatTime;
                nodeP.appendChild(nodeTime);
                nodeP.appendChild(nodeSpan);
                this.chatContain.appendChild(nodeP);
                this.chatContain.scrollTop = this.chatContain.scrollHeight;
            },
            chatHintNull(chatHint){//空输入提示
                const _this=this
                setTimeout(function(){
                    _this.chatHint.fadeIn();
                    clearTimeout(_this.timerId);
                    const inner=_this
                    _this.timer = setTimeout(function() {
                        inner.chatHint.fadeOut();
                    }, 1000);
                }, 10);
                this.timerId = this.timer;
            },
            isEnter(Input,Hint,type,e){
                e = e||window.event;
                if (e.keyCode == 16) {//按住shift键
                    this.shiftDown = true;
                }
                if(e.keyCode==13)
                {

                    if(this.shiftDown==true)
                    {
                        this.shiftDown=false;
                        return true;
                    }
                    else if(this.shiftDown==false&&(Input.value == ''||Input.value=='\n'))
                    {
                        Hint(this.chatHint);
                    }
                    else
                    {
                        e.preventDefault();
                        this.createInfo(type,Input.value);
                        this.submityouText(Input.value);
                        Input.value = null;
                        Input.focus();
                    }
                }
            },
            submityouText(text) {
                console.log("我的问题是",text)
                const _this=this
                this.createInfo('service',"好的，请稍等")
                const answer=this.getAnswer(text).then(resdata=>{
                    if(resdata==""){
                        _this.createInfo('service',"抱歉，这个问题我不知道")
                    }else {
                        var tempAnswer=resdata.split("*")
                        var i;
                        var answer=[]
                        for(i=1;i<tempAnswer.length;i++){
                            if(i!=1){
                                var splitTempAnswer=tempAnswer[i].split("：")
                                if(splitTempAnswer[1]!=""){
                                    // _this.createInfo('service',tempAnswer[i])
                                    answer.push(tempAnswer[i])
                                }
                            }else{
                                answer.push(tempAnswer[1])
                            }
                        }
                        if(answer.length==1){
                            _this.createInfo('service', "抱歉没能找到相关信息")
                        }else{
                            for ( var item of answer){
                                _this.createInfo('service',item)
                            }
                        }

                    }
                })
            },
            handleEmptyEnter(event){
                if(event.keyCode==13){
                    this.chatInput.value=null
                }
            },
            handleInputButtomClick(){
                if(this.chatInput.value!='')
                {
                    this.createInfo('you',this.chatInput.value);
                    this.submityouText(this.chatInput.value);
                    this.chatInput.value = null;
                    this.chatInput.focus();
                }
                else
                {
                    this.chatHintNull(this.chatHint);
                }
            }
        },
        mounted(){
            this.d=document;
            this.openBody();
            this.closeChat();


            this.chatHint=$('#chatHint')
            this.chat_main=this.d.querySelector('.chat-main');
            this.chatInput = this.d.querySelector('#chat_input'),
                this.chatContain = this.d.querySelector('#chat_contain'),
                this.btnOpen = this.d.querySelector('#btn_open'),
                this.btnClose =this.d.querySelector('#btn_close');
            document.ondragover=function(e){
                console.log("Firefox上此处不会执行，Chrome正常");
                e.preventDefault();
            };
            this.chatDrag(this.chat_main);//拖动聊天窗口
            this.chatDrag(this.btnOpen);//拖动头像小图标

            // this.btnOpen.addEventListener('click', function(e) {/*点击头像打开聊天窗口*/
            //     e = e||window.event;
            // })
            this.btnOpen.addEventListener('click',this.openBody)
            this.btnClose.addEventListener('click',this.closeChat)
            this.createInfo('service','您好'); /*发送第一句话*/

            $('.chat-close-button').click(this.closeChat);
            /*按钮特效*/
            var buttons=$('button');
            buttons.each(function(i)
                {
                    $(this).mouseenter(function(){
                        buttons.eq(i).fadeTo('slow',0.8);
                    });
                }
            )
            buttons.each(function(i)
                {
                    $(this).mouseleave(function(){
                        buttons.eq(i).fadeTo('slow',1);
                    });
                }
            )
        }
    }
</script>

<style scoped>
   @import "../assets/chatBox.css";
   html{font-family:"Helvetica Neue",Helvetica,STHeiTi,sans-serif;-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;}
   body{-webkit-overflow-scrolling:touch;margin:0;}
   ul{margin:0;padding:0;list-style:none;outline:none;}
   dl,dd{margin:0;}
   /*a{display:inline-block;margin:0;padding:0;text-decoration:none;background:transparent;outline:none;color:#000;}*/
   a:link,a:visited,a:hover,a:active{text-decoration:none;color:currentColor;}
   /*a,dt,dd{-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;}*/
   img{border:0;}
   p{margin:0;}
   /*input,button,select{margin:0;padding:0;border:0;outline:0;background-color:transparent;}*/
   input,select,textarea,button{
       margin:0;
       padding: 0;
       border:0;
       outline:0;
   }
   .buttons {
       width:62px;
       height:28px;
       border-radius:4px;
       background-color: #9c9c9c;
       margin:5px 5px;
   }

</style>