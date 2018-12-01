$(function() {
    page.init();
    month_calendar();
});

var page = {
    init: function() {
        page.calendar();

        //page.year_calendar();
        
        page.popup();
        
        page.style();
    },
    calendar: function() {
        if($(".input_date").length > 0) {
            $.each($(".input_date"), function() {
                var dateOpt = {
                    showOn: "button",
                    dateFormat: "yymmdd"
                };
                if($(this).data("min") === true || $(this).data("min") == "true") {
                    dateOpt.minDate = 0;
                }
                $(this).datepicker(dateOpt);    

                $.datepicker.setDefaults({
                    dateFormat: 'yy-mm-dd',
                    prevText: '이전 달',
                    nextText: '다음 달',
                    monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    showMonthAfterYear: true,
                    yearSuffix: '.',
                    altField: "#alternate",
                    altFormat: "yy-mm-dd"
                });
                
            });
        }

        if($(".input_year").length > 0) {
            $.each($(".input_year"), function() {
                var dateOpt = {
                    showOn: "button",
                    dateFormat: "yymmdd"
                };
                
                $(this).datepicker(dateOpt);    
                
                $.datepicker.setDefaults({
                    dateFormat: 'yy-mm-dd',
                    prevText: '이전 달',
                    nextText: '다음 달',
                    showMonthAfterYear: true,
                    yearSuffix: '',
                    altField: "#alternate",
                    altFormat: "yy-mm-dd"
                });
                
            });
        }
    },

    popup: function() {
        $(".popup_area .btn_close, .popup_area .btn_cancel").on("click", function() {
            self.close();
            return false;
        });
        function popupOpen(url, width, height) {
            window.open(url, "popup", "width=" + width + ",height=" + height + ",scrollbars=no, toolbar=no");
        }
        $(".btn_popup").on("click", function() {
            var getLink = $(this).attr("href");
            var getWidth = $(this).data("width");
            var getHeight = $(this).data("height");
            if($(this).hasClass("btn_preview")) {
                getWidth = Number(getWidth + 2);
                getHeight = Number(getHeight + 97);
            }
            popupOpen(getLink,getWidth,getHeight);
            return false;
        });
        
        //객실선택 팝업
        $(".popup_area.room_select .btn_select").on("click", function() {
            $(this).closest("tr").toggleClass("select");
            return false;
        });
        
        //연수원 날짜별 이용기간 관리
        // $("body").on("click", ".schedule_area .sch_table td:not(.prev)", function() {
            // var getLink = "daily_pouse_mng_list_popup.html";
            // popupOpen(getLink,468,455);
            // return false;
        // }).on("click", ".schedule_area .bbs tr:not(.prev)", function() {
            // var getLink = "daily_pouse_mng_list_popup.html";
            // popupOpen(getLink,468,455);
            // return false;
        // });
    },
    style: function() {
        //파일 선택
        $(".file_upload .input_file").on("change", function() {
            $(this).closest(".file_upload").find(".input_text").val(this.value.split("\\").pop());
        });
        
        //라디오 버튼
        $(".radio_toggle .radio_box .radio").on("change", function() {
            $(this).closest(".radio_toggle").find(".radio_box.active").removeClass("active");
            $(this).closest(".radio_box").addClass("active");
        });
        $(".radio_toggle .radio_box .radio:checked").closest(".radio_box").addClass("active");
        
        //토글 버튼
        // $(".btn_toggle").on("click", function() {
            // $(this).toggleClass("active");
            // return false;
        // });
        
        //폴더 펼침
        $(".folder_list .folder").on("click", function() {
            var getList = $(this).closest("li");
            getList.find(".folder_group").slideToggle(200, function() {
                getList.toggleClass("open");
            });
            return false;
        });
    }
}

function Rradio_OnOff(id){
    if(id == "radio_days"){
        document.all["radio_days"].style.display = '';        
        document.all["radio_month"].style.display = 'none';
        document.all["radio_year"].style.display = 'none';
        $(".ui-datepicker").removeClass("year_datepicker");
    }
    
    else if(id == "radio_month") {
        document.all["radio_days"].style.display = 'none';   
        document.all["radio_month"].style.display = '';
        document.all["radio_year"].style.display = 'none';                  
    }

    else {       
        document.all["radio_days"].style.display = 'none';      
        document.all["radio_month"].style.display = 'none'; 
        document.all["radio_year"].style.display = '';
        $(".ui-datepicker").addClass("year_datepicker");              
    }                           
}

function month_calendar(){
    $("#ImageButton").MonthPicker({
        Button: '<img class="icon" src="img/icon/date.png" />'
    });

    var options = {
        pattern: 'yyyy-mm',
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
    };

    $('.input_month').MonthPicker(options);

    $( ".input_month" ).focus(function() {
        $(this).next().attr('src','img/icon/date_on.png');
    });

    $( ".input_month" ).focusout(function() {
        $(this).next().attr('src','img/icon/date.png');
    });
}