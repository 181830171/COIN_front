<template>
    <div>
        <ul class="all">
            <li class='title' style="float: left">COIN</li>
        </ul>
        <div class="login-box">
            <span class="span-title">COIN登入</span>
            <a-input id="name" class="inputbar" placeholder="请输入用户名"/>
            <a-input-password id="password" class="inputbar" placeholder="请输入密码"/>
            <button class='loginbutton' @click="handleLogin">登录</button>
            <button class='loginbutton' @click="registerFormVisible=true">注册</button>
            <router-view></router-view>
        </div>
        <a-modal
                :visible="registerFormVisible"
                title= "注册"
                okText='注册'
                cancel-text="取消"
                @cancel="registerFormCancleHandler"
                @ok="registerHandler"
        >
            <a-form layout='vertical'>
                <a-form-item label='用户名'>
                    <a-input id="username" placeholder="请输入新用户名"/>
                </a-form-item>
                <a-form-item label='密码'>
                    <a-input-password id="pwd" placeholder="请输入密码"/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "login",
        data(){
            return {registerFormVisible:false}
        },
        methods:{
            ...mapActions([
                'register',
                'login'
            ]),
            registerFormCancleHandler(){
                this.registerFormVisible=false
            },
            registerHandler(){
                const data={username:document.getElementById('username').value,password:document.getElementById('pwd').value}
                console.log(data)
                this.register(data)
                this.registerFormVisible=false

            },
            handleLogin(){
                const data={username:document.getElementById('name').value,password:document.getElementById('password').value}
                const _this=this
                this.login(data).then(function(resdata){
                    console.log(resdata)
                    if(resdata=="成功登录！"){
                        localStorage.setItem("islogin",1)
                        console.log(localStorage.getItem("islogin"))
                        _this.$router.push('/home')
                    }

                })
                //this.$router.push('/home')
            }
        }
    }

</script>

<style scoped>
    .all {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
        height: 7%;
    }
    .inputbar{
        margin:5px;
        padding: 5px;
    }
    li.title{
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 30px;
    }
    .login-box{
        width: 20%;
        margin-left: auto;
        margin-right: auto;
        margin-top:11%;
        padding-top:14px;
    }
    form{
        width: 80%;
        margin-right: auto;
        margin-left:auto;
    }
    .span-title{
        font-size: 30px;
        position: relative;
        left: 25%;
    }
    .loginbutton{
        font-size: 20px;
        width: 100%;
        margin:5px;
        border-radius: 10px;
    }
</style>