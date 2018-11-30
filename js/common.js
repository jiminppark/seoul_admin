$(function() {
    page.init();
});

var page = {
    init: function() {
        page.calendar();
        
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