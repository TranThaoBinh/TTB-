function fadeIn(){
    return new Promise((resolve) => {
        //create audio
        var audio = new Audio('./PleaseTellMeWhy.mp3');
        audio.load();


        var text = $('.content').text().replace(/^\s+|\s+$/g,'');
        var length = text.length;
        var i = 0;
        var txt;
        var html = [];
        var sp = 4;
        for(;i<length;i+=sp) {
            txt = text.substring(i,i+sp);
            var classes = i === 0 ? 'c animated first-word' : 'c animated';
            html.push('<span class="' + classes + '">' + txt + '</span>');
        }
        $('.content').removeClass('c').html(html.join(''));

        var totalDuration = 0;
        for(i = 0,length = html.length;i<length;i++) {
            !function(i){
                setTimeout(function(){
                    $('.content').find('.animated').eq(i).addClass('fadeIn');
                    $('html, body').animate({
                        scrollTop: $('.content').find('.animated').eq(i).offset().top-100
                    }, 200);
                },i*480);
                totalDuration = i*480;
            }(i);
        }

        audio.play();
        // Resolve the Promise after the fadeIn animation is finished
        setTimeout(() => {
            $('.bg_heart').removeClass('hidden')
            $('.mask').css('display', 'none');
            document.querySelector(".content").onclick = null;
            document.querySelector("#heart").hidden=true
            
            // Fade in the date and time display
            $('.content').hide().html(displayDateTime()).fadeIn(1000);

            // Animate the padding-top to 0
            $('.content').attr('style', 'padding-top: 0 !important; padding-bottom: 0 !important;');

            // Animate the background color to #ff4081
            $('body').css('background-color', '#ff4081');
            resolve();
        }, totalDuration + 480);
    });
   
};

setInterval(()=>{
    if(!$('.bg_heart').hasClass('hidden')){
        displayDateTime();
        $('.content').html(displayDateTime());
    }
   
}, 1000)

function displayDateTime() {
    var now = new Date();
    var date = now.toLocaleDateString('vn-VN');
    var time = now.toLocaleTimeString('vn-VN');
    var day = now.toLocaleDateString('vn-VN', { weekday: 'long' });
    return `
        <div> ${day} </div>
        <div>${date} - ${time}</div>
       
        
    `;
}

document.querySelector(".content").onclick=  ()=>{
    document.querySelector("#heart").hidden=false
    document.querySelector("body").style.backgroundColor="#542246"
    document.querySelector("#heart").hidden=false
    $('.mask').css('display','block')
     fadeIn()
     
}