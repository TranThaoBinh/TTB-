function fadeIn() {
    return new Promise((resolve) => {
        // Tạo một promise để đảm bảo rằng các hiệu ứng chỉ tiếp tục sau khi âm thanh đã được tải và phát

        // Tạo đối tượng âm thanh
        var audio = new Audio('./chill.mp3');
        audio.load(); // Tải âm thanh

        var text = $('.content').text().replace(/^\s+|\s+$/g, ''); // Lấy văn bản từ .content
        var length = text.length;
        var i = 0;
        var txt;
        var html = [];
        var sp = 4; // Số lượng ký tự trong mỗi phần
        for (; i < length; i += sp) {
            txt = text.substring(i, i + sp);
            var classes = i === 0 ? 'c animated first-word' : 'c animated';
            html.push('<span class="' + classes + '">' + txt + '</span>');
        }
        $('.content').removeClass('c').html(html.join(''));

        var totalDuration = 0;
        for (i = 0, length = html.length; i < length; i++) {
            ! function (i) {
                setTimeout(function () {
                    $('.content').find('.animated').eq(i).addClass('fadeIn');
                    $('html, body').animate({
                        scrollTop: $('.content').find('.animated').eq(i).offset().top - 100
                    }, 200);
                }, i * 480);
                totalDuration = i * 480;
            }(i);
        }

        audio.play(); // Phát âm thanh

        // Giải quyết promise sau khi hiệu ứng fadeIn kết thúc
        setTimeout(() => {
            $('.bg_heart').removeClass('hidden');
            $('.mask').css('display', 'none');
            document.querySelector(".content").onclick = null;
            document.querySelector("#heart").hidden = true;

            // Hiển thị ngày và giờ
            $('.content').hide().html(displayDateTime()).fadeIn(1000);

            // Hiệu ứng padding-top thành 0
            $('.content').attr('style', 'padding-top: 0 !important; padding-bottom: 0 !important;');

            // Hiệu ứng màu nền thành #ff4081
            $('body').css('background-color', '#ff4081');
            resolve();
        }, totalDuration + 480);
    });

};

// Cập nhật ngày và giờ sau mỗi giây
setInterval(() => {
    if (!$('.bg_heart').hasClass('hidden')) {
        displayDateTime();
        $('.content').html(displayDateTime());
    }
}, 1000);

// Hiển thị ngày và giờ
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

// Sự kiện khi nhấp chuột vào .content
document.querySelector(".content").onclick = () => {
    document.querySelector("#heart").hidden = false;
    document.querySelector("body").style.backgroundColor = "#542246";
    document.querySelector("#heart").hidden = false;
    $('.mask').css('display', 'block');
    fadeIn();
};
