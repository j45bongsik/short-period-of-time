$(function(){

    /* 자동 타이틀 달아주기 */
    $('a, .btn, .eps').each(function(){
        let attr = $(this).text().trim();
        attr = attr.replace(/(\r\n|\n|\r)/gm,""); //줄바꿈 제거
        attr = attr.replace(/\s{2,}/g, ' '); //공백 2칸이상일경우 1칸으로

        if (!$(this).is('[title]')) {
            $(this).attr("title", attr);
        }

        if($('.eps').find('a').length > 0){ //eps 하위에 a 태그가 있을경우 eps에 title 제거
            $('.eps').removeAttr('title');
        }
    });

    /* input 맞춤법 검사 제거 */
    $('input[type="text"]').attr('spellcheck', false);

    /* input disabled 자동 타이틀 */
    $('input[disabled].disabled').each(function(){
        $(this).attr('title', $(this).val());
    });
    

    /* textarea disabled 자동 타이틀 */
    $('textarea[disabled].disabled').each(function(){
        $(this).attr('title', $(this).text());
    });

    // lnb on&off
    $('#header .drawer').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active').siblings('.lnbArea').removeClass('active');
        } else {
            $(this).addClass('active').siblings('.lnbArea').addClass('active');
        }
    })

    // lnb acco
    $('.lnbArea > ul > li.dep01 > a').on('click', function(){
        if ($(this).closest('li').hasClass('active')) {
            // $(this).closest().removeClass('active');
            $(this).siblings('.dep02').stop().slideUp(300).closest('li').removeClass('active');
        } else {
            $(this).closest('li').siblings('li').removeClass('active').find('.dep02').stop().slideUp(300);
            $(this).siblings('.dep02').stop().slideDown(300).closest('li').addClass('active')
        }
        
    })

    // marqee.js
    $('.marquee').marquee({
        direction: 'left',
        duration: 10000,
        gap: 50,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true
    });

    // layerPop on 
    $('.btn.popup').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).siblings('.layerPop').removeClass('active');
        }else {
            $(this).siblings('.layerPop').addClass('active');
        }
    })

    $('.eAsidePop').on('click', function(){
        $('#aside .layerPop').addClass('active');
    })

    // layerPop off
    $('.layerPop .layerHead .btn.close').on('click', function(){
        $(this).closest('.layerPop').removeClass('active');
    })

    // 외부영역 클릭시 layerPop off
    $(document).on({
        'click': function(e){
            if(!$(e.target).closest('.btn.popup, .layerPop .layer, .eAsidePop').length){
                $('.btn.popup, .layerPop').removeClass('active');
            }
        }
    });

    //layerPop Acco
    $('.layerPop .agreeArea .btn.tag').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active').closest('.label').siblings('.cont').removeClass('active');
        } else {
            $(this).addClass('active').closest('.label').siblings('.cont').addClass('active');
        }
    })

    // acco on&off 
    $('.accoCont .label .btn.tag').on('click', function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active').closest('.label').siblings('.cont').removeClass('active');
        } else {
            $('.accoCont .label .btn.tag, .accoCont .cont').removeClass('active');
            $(this).addClass('active').closest('.label').siblings('.cont').addClass('active');
        }
    })

    // tab on&off
    $('.tabList .btn').on('click', function(){
        let tabIdx = $(this).closest('li').index();

        $(this).closest('li').addClass('active').siblings('li').removeClass('active');
        $(this).closest('.inner').siblings('.tabCont').removeClass('active').eq(tabIdx).addClass('active');
    })

});
