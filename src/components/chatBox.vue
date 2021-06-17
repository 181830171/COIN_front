<template>
    <div class="chat-wrapper">
        <div id="btn_open" class="chat-support-btn" draggable="true"><!-- 聊天窗口缩小后的头像图标 -->
            <img src='../assets/logo.png'>
        </div>
        <div class="chat-main" draggable="true">
            <div class="chat-header">
                <i id="btn_close" class="chat-close">></i>
                <div class="chat-service-info">
                    <a class="chat-service-img"></a>
                    <div class="chat-service-title">
                        <p class="chat-service-name">客服1</p>
                        <p class="chat-service-detail">我是您的专属客服</p>
                    </div>
                </div>
            </div>
            <div id="chat_contain" class="chat-contain">
            </div>
            <div class="chat-submit">
                <p id='chatHint' class="chat-hint"><span class="chat-hint-icon">!</span><span class="chat-hint-text">发送内容不能为空</span></p>
                <textarea id="chat_input" class="chat-input-text" autofocus placeholder="请输入您想对我说的话，按Enter键发送（shift+Enter换行）。"></textarea>
                <div class="chat-input-tools">
                    <button class="chat-input-button">发送</button>
                    <button class="chat-close-button">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
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
            openBody(){
                $('.chat-support-btn').css({'display': 'none'});
                $('.chat-main').css({'display': 'inline-block', 'height': '0'});
                $('.chat-main').animate({'height': '600px'})
            },
            chatDrag(target){
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
                var nodeP = d.createElement('p'),
                    nodeSpan = d.createElement('span')
                nodeTime=d.createElement('p');
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
                setTimeout(function(){
                    chatHint.fadeIn();
                    clearTimeout(this.timerId);
                    this.timer = setTimeout(function() {
                        chatHint.fadeOut();
                    }, 1000);
                }, 10);
                this.timerId = timer;
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

                // 模拟后端回复
                var num = Math.random() * 10;
                if (num <= 7) {
                    //因为这里可能大于7所以没有回复
                    this.getServiceText(this.serviceData);
                }
            },
            getServiceText(data) {/*已定义后台消息框*/
                var serviceText = data.robot.chat,
                    i = Math.floor(Math.random() * serviceText.length);
                this.createInfo('service',serviceText[i]);
            }
        },
        mounted(){
            this.d=document;
            this.openBody();
            this.chatHint=$('#chatHint')
            this.chat_main=d.querySelector('.chat-main');
            this.chatInput = d.querySelector('#chat_input'),
                this.chatContain = d.querySelector('#chat_contain'),
                this.btnOpen = d.querySelector('#btn_open'),
                this.btnClose =d.querySelector('#btn_close');
            document.ondragover=function(e){
                console.log("Firefox上此处不会执行，Chrome正常");
                e.preventDefault();
            };
            this.chatDrag(this.chat_main);//拖动聊天窗口
            this.chatDrag(this.btnOpen);//拖动头像小图标

            this.btnOpen.addEventListener('click', function(e) {/*点击头像打开聊天窗口*/
                e = e||window.event;
                this.openBody();
            })
            this.btnClose.addEventListener('click',this.closeChat)
            this.createInfo('service','您好'); /*发送第一句话*/

            this.chatInput.addEventListener('keydown', function(e) {/*输入框按enter*/
                e = e||window.event;
                this.isEnter(this.chatInput,this.chatHintNull,'you',e);

            })
            this.chatInput.addEventListener('keyup',function(e){
                e=e||window
                if(e.keyCode==13){
                    this.chatInput.value=null
                }
            })

            /*为按钮绑定事件*/
            $('.chat-input-button').click(function(){/*消息框发送*/

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
            });
            $('.chat-close-button').click(
                function()
                {
                    if (confirm("不再聊会儿吗？")){
                        window.close();
                    }
                    else{}
                }
            );
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
/*@import '../assets/对话框.css';*/
</style>
