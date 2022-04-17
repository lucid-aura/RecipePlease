const tabBtn = document.querySelectorAll(".tab");
        const tab = document.querySelectorAll(".tabshow");

        function tabs(panelIndex) {
            tab.forEach(function(node){
                node.style.display = "none";
            });
            tab[panelIndex].style.display = "block";
        }
        tabs(0);

        function updateLoggedUser() {
            $.ajax({
                url : webAddress + "updatePersonalInfo",
                type : 'POST', 
                data : formData, 
                success : function(res) {
                    console.log(res)
                },
                error : function(xhr, status) {
                    alert(xhr + " : " + status);
                }
            });
        }

        function updatePersonalInfo() {
            let formData = $("form[id=personalInfo] :input[value!='']").serialize() ;
            formData+= "&memberId=" + JSON.parse(sessionStorage.getItem("loggedUser")).memberId
            $.ajax({
                url : webAddress + "updatePersonalInfo",
                type : 'POST', 
                data : formData, 
                success : function(res) {
                    console.log(res)
                    sessionStorage.setItem("loggedUser", JSON.stringify(res));
                },
                error : function(xhr, status) {
                    alert(xhr + " : " + status);
                }
            });
            
        }

        function updatePaymentInfo() {
            let formData = $("form[id=paymentInfo] :input[value!='']").serialize() ;
            formData+= "&memberId=" + JSON.parse(sessionStorage.getItem("loggedUser")).memberId
            console.log(formData)
            $.ajax({
                url : webAddress + "updatePaymentInfo",
                type : 'POST', 
                data : formData, 
                success : function(res) {
                    console.log(res)
                    sessionStorage.setItem("loggedUser", JSON.stringify(res));
                },
                error : function(xhr, status) {
                    alert(xhr + " : " + status);
                }
            });
        }

        $( document ).ready(function() {
            let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
            $("#memberNickname").val(loggedUser.memberNickname)
            $("#memberEmail").val(loggedUser.memberEmail)
            $("#memberPhone").val(loggedUser.memberPhone)
            $("#memberCoin").val(loggedUser.memberCoin + "개")
            $("#memberMainAddr").val(loggedUser.memberMainAddr)
            $("#memberDetailAddr").val(loggedUser.memberDetailAddr)
            $("#memberZipcode").val(loggedUser.memberZipcode)
            $("#memberGender").val(loggedUser.memberGender)
            $("#memberName").val(loggedUser.memberName)
            $("#memberGrade").val(loggedUser.memberGrade + " 회원")

        })