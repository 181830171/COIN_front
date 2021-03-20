<template>
    <div id="simpleModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="closeBtn" style="position: relative;right:20px;top:5px">&times;</span>
                <p style="position: relative;left: 40px">弹框头部</p>
            </div>
            <div class="modal-body">
                <p>这是一个弹窗效果</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nemo? Temporibus velit eligendi neque repudiandae quis, autem vero fuga officia enim quas quibusdam consequuntur nam dolores tempore asperiores repellendus distinctio.</p>
            </div>
            <div class="modal-footer">
                <p>弹框底部</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "windowmodual"
    }
</script>

<style scoped>
    .modal{
        display: inline;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0,0);
    }
    .modal-content{
        background-color: #f4f4f4;
        margin: 15% auto;
        width: 45%;
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0,0.2), 0 7px 20px 0 rgba(0, 0, 0,0.2);
        animation-name: modalopen;
        animation-duration: 1s;
        height: 300px;
        font-size: 16px;
    }

    .modal-header{
        background-color: #9c9c9c;
        padding: 2px;
        color: #fff;
        font-size: 20px;
    }
    .closeBtn{
        color: #fff;
        float: right;
        font-size: 30px;
    }
    .closeBtn:hover,.closeBtn:focus{
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
    .modal-body{
        padding:10px 20px;
    }
    .modal-footer{
        color: #fff;
        background-color: #9c9c9c;
        padding: 5px;
        text-align: center;
    }
    @keyframes modalopen{
        from {opacity: 0}
        to {opacity: 1}
    }
</style>