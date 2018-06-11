$(function () {
    //首屏滑入
    (function () {
        var $wrap = $("#wrap"),
            $swp = $wrap.find(".swp");

        $swp.eq(0).animate({
            opacity:1,
            left:0
        },1800);

        $swp.eq(1).animate({
            opacity:1,
            right:0
        },1800);

        $swp.eq(2).animate({
            opacity:1,
            top:70
        },2000);

        $swp.eq(3).animate({
            opacity:1,
            top:610
        },2000);
    })();

//视频弹窗
    (function () {
        var $wrap = $("#wrap"),
            $btn = $wrap.find(".videoBtn img"),
            $video = $wrap.find(".video"),
            $close = $wrap.find(".close");

        $btn.click(function () {
            $video.show();
            $(document.body).addClass("noScroll");
        });

        $close.click(function () {
            $video.hide();
            $(document.body).removeClass("noScroll");
        })
    })();


    // 最新情报弹窗
    (function () {

        var $newinfo = $("#newinfo"),
            $pop = $newinfo.find(".popwindow"),
            $popLi = $pop.find(".content ul li"),
            $infoLi = $newinfo.find(".infoList li"),
            length = $infoLi.length,
            $txt = $pop.find(".content .txt"),
            $popClose = $pop.find(".close"),
            $btn = $pop.find(".btn"),
            txtH = $txt.height(),
            index=0;

        $txt.each(function () {
            var $mainTxt = $(this).find(".mainTxt"),
                $scroll = $(this).find(".scroll"),
                $bar = $(this).find(".bar"),
                mainH = $mainTxt.height(),
                barH = txtH*txtH/mainH,
                topMax = txtH - barH,
                topMin = 0;

            $bar.height(barH);//设置滑块长度

            //点击滑块拖动
            $bar.mousedown(function (e) {
                var sY = e.clientY,
                    sTop = $(this).position().top;

                $(document.body).mousemove(function (e) {
                    var nY = e.clientY,
                        top = sTop + nY - sY;
                    top = Math.max(top,0);
                    top = Math.min(top,topMax);
                    $bar.css("top",top);
                    $mainTxt.css("top",-top*mainH/txtH);
                }).mouseup(function () {
                    $(this).off("mousemove").off("mouseup");
                });
                return false;//阻止默认事件
            })

            //鼠标滚轮事件
            $(this).mousewheel(function (e,d) {
                var top = $bar.position().top;
                if(d<0){
                    //向下  （拉）
                    top += 10;
                }else{
                    //向上  （推）
                    top -= 10;
                }
                top = Math.max(top,0);
                top = Math.min(top,topMax);
                $bar.css("top",top);
                $mainTxt.css("top",-top*mainH/txtH);
                return false;
            });

            //点击滚动条动画
            $scroll.click(function (e) {
                if(e.target === this){
                    var top = $bar.position().top,
                        y = e.clientY - ($(this).offset().top - $(document).scrollTop());
                    if(y < top){
                        top -= 80;
                    }else{
                        top += 80;
                    }
                    top = Math.max(top,0);
                    top = Math.min(top,topMax);
                    $bar.animate({top:top},500);
                    $mainTxt.animate({top:-top*mainH/txtH},500);
                    return false;
                }
            })

        })

        $pop.hide().css("opacity" , 1);
        $popLi.hide();
        //点击弹出全屏窗
        $infoLi.click(function () {
            index = $(this).index();
            // console.log(index.js);
            $(document.body).addClass("noScroll");
            $pop.show();
            $popLi.eq(index).show().siblings().hide();
        })

        //关闭弹窗
        $popClose.click(function () {
            $(document.body).removeClass("noScroll");
            $pop.hide();
        })

        //弹窗层左右按钮
        $btn.click(function () {
            if($(this).index(".content .btn")){
                index++;
                index %= length;
            }else{
                if(--index<0) index = length -1;
            }
            $popLi.eq(index).show().siblings().hide();
        })

    })();


    //游戏特色滚动
    (function () {
        var $game = $("#game"),
            $picLi = $game.find(".pic ul li"),
            $btn = $game.find(".btn"),
            midIndex = 0,
            length = $picLi.length;

        //图片自身点击
        $picLi.click(function () {
            if($(this).index() !== midIndex){
                midIndex = $(this).index();//点击谁谁就变为中间图片
                change();
            }
        })

        //左右按钮点击
        $btn.click(function () {
            console.log($(this).index());
            if($(this).index()){
                //右按钮
                midIndex++;
                if(midIndex >= length)midIndex = 0;
                change();
            }else{
                //左按钮
                midIndex--;
                if(midIndex<0) midIndex = length-1;
                change();
            }
        })

        function change() {
            var lIndex = midIndex - 1,
                rIndex = midIndex + 1;
            if(lIndex < 0)lIndex = length - 1;
            if(rIndex >= length) rIndex = 0;
            $picLi.removeClass("left mid right");
            $picLi.eq(lIndex).addClass("left");
            $picLi.eq(midIndex).addClass("mid");
            $picLi.eq(rIndex).addClass("right");
        }
    })();

    //滚轮延迟显示
    (function () {
        var $newinfo = $("#newinfo"),
            $title = $newinfo.find(".title"),
            $infoListLi = $newinfo.find(".infoList li"),
            $game = $("#game"),
            $title2 = $game.find(".title"),
            $pic = $game.find(".pic"),
            objArr = [];

        init($title,$infoListLi,$title2,$pic);

        $(window).scroll(function () {
            var height = $(window).height() + $(document).scrollTop();

            for(var i=0,length=objArr.length; i<length; i++){
                // var obj = objArr[i];

                if(height >= objArr[i].oddTop ){
                    (function (j) {
                        // var $This = $(objArr[i]);

                        setTimeout(function () {
                            $(objArr[j]).removeClass("hide");
                            // console.log(j);
                        },($(objArr[j]).index()%3)*200);

                        // objArr.slice(i,1);
                    })(i);
                }
            }
        })

        function init() {
            for(var i=0,length = arguments.length; i<length; i++){
                arguments[i].each(function () {
                    this.oddTop = $(this).offset().top;
                    objArr.push(this);
                })
            }

        }

    })();
})
